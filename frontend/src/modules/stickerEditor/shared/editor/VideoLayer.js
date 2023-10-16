import Layer from "./Layer";
import {blankVideoSetter} from "../../consts/layerConsts";
import {v4 as uuidv4} from "uuid";
import MP4Box from 'mp4box';

class MP4FileSink {
  #setStatus = null;
  #file = null;
  #offset = 0;

  constructor(file, setStatus) {
    this.#file = file;
    this.#setStatus = setStatus;
  }

  write(chunk) {
    // MP4Box.js requires buffers to be ArrayBuffers, but we have a Uint8Array.
    const buffer = new ArrayBuffer(chunk.byteLength);
    new Uint8Array(buffer).set(chunk);

    // Inform MP4Box where in the file this chunk is from.
    buffer.fileStart = this.#offset;
    this.#offset += buffer.byteLength;

    // Append chunk.
    this.#setStatus("fetch", (this.#offset / (1024 ** 2)).toFixed(1) + " MiB");
    this.#file.appendBuffer(buffer);
  }

  close() {
    this.#setStatus("fetch", "Done");
    this.#file.flush();
  }
}

// Demuxes the first video track of an MP4 file using MP4Box, calling
// `onConfig()` and `onChunk()` with appropriate WebCodecs objects.
class MP4Demuxer {
  #onConfig = null;
  #onChunk = null;
  #setStatus = null;
  #file = null;

  constructor(uri, {onConfig, onChunk, setStatus}) {
    this.#onConfig = onConfig;
    this.#onChunk = onChunk;
    this.#setStatus = setStatus;

    // Configure an MP4Box File for demuxing.
    this.#file = MP4Box.createFile();
    this.#file.onError = error => setStatus("demux", error);
    this.#file.onReady = this.#onReady.bind(this);
    this.#file.onSamples = this.#onSamples.bind(this);

    // Fetch the file and pipe the data through.
    const fileSink = new MP4FileSink(this.#file, setStatus);
    fetch(uri).then(response => {
      // highWaterMark should be large enough for smooth streaming, but lower is
      // better for memory usage.
      response.body.pipeTo(new WritableStream(fileSink, { highWaterMark: 100 }));
    });
  }

  // Get the appropriate `description` for a specific track. Assumes that the
  // track is H.264, H.265, VP8, VP9, or AV1.
  #description(track) {
    const trak = this.#file.getTrackById(track.id);
    for (const entry of trak.mdia.minf.stbl.stsd.entries) {
      const box = entry.avcC || entry.hvcC || entry.vpcC || entry.av1C;
      if (box) {
        const stream = new MP4Box.DataStream(undefined, 0, MP4Box.DataStream.BIG_ENDIAN);
        box.write(stream);
        return new Uint8Array(stream.buffer, 8);  // Remove the box header.
      }
    }
    throw new Error("avcC, hvcC, vpcC, or av1C box not found");
  }

  #onReady(info) {
    this.#setStatus("demux", "Ready");
    const track = info.videoTracks[0];

    // Generate and emit an appropriate VideoDecoderConfig.
    this.#onConfig({
      // Browser doesn't support parsing full vp8 codec (eg: `vp08.00.41.08`),
      // they only support `vp8`.
      codec: track.codec.startsWith('vp08') ? 'vp8' : track.codec,
      codedHeight: track.video.height,
      codedWidth: track.video.width,
      description: this.#description(track),
    });

    // Start demuxing.
    this.#file.setExtractionOptions(track.id);
    this.#file.start();
  }

  #onSamples(track_id, ref, samples) {
    // Generate and emit an EncodedVideoChunk for each demuxed sample.
    for (const sample of samples) {
      this.#onChunk(new window.EncodedVideoChunk({
        type: sample.is_sync ? "key" : "delta",
        timestamp: 1e6 * sample.cts / sample.timescale,
        duration: 1e6 * sample.duration / sample.timescale,
        data: sample.data
      }));
    }
  }
}

export default class VideoLayer extends Layer {
  _onLoadVideoListeners = {};

  addOnLoadVideoListener(func) {
    const id = uuidv4();

    this._onLoadVideoListeners[id] = func;

    return id;
  }

  removeOnLoadVideoListener(id) {
    delete this._onLoadVideoListeners[id];
  }

  constructor(params) {
    super(params);
    this._frames = [];
    this.props = new Proxy(this.props, {
      set: ((target, prop, newValue, receiver) => {
        if (newValue?.src && prop === 'videoProps' && this.video?.src !== newValue?.src) {
          this._setVideo(newValue.src);
        }

        target[prop] = newValue;

        return Reflect.set(...arguments);
      }).bind(this)
    });
    this.props.videoProps = { ...params.videoProps, ...blankVideoSetter }
    this.props.transformProps.posX = 0;
    this.props.transformProps.posY = 0;
  }

  async _getFrames(src) {
    const frames = [];

    return new Promise((resolve) => {
      const decoder = new window.VideoDecoder({
        output: ((frame) => {
          const canvas = document.createElement('canvas');
          canvas.width = frame.displayWidth;
          canvas.height = frame.displayHeight;
          const context = canvas.getContext("2d");
          context.drawImage(frame, 0, 0);
          frames.push(canvas);
          frame.close();
        }).bind(this),
        error(e) {
          console.warn(e);
        }
      });

      decoder.ondequeue = () => {
        if (decoder.decodeQueueSize === 0) {
          resolve(frames)
        }
      }

      const demuxer = new MP4Demuxer(src, {
        onConfig(config) {
          decoder.configure(config);
        },
        onChunk(chunk) {
          decoder.decode(chunk)
        },
        setStatus: (type, message) => {
          console.log(type, message);
        }
      });
    })
  }


  async _setVideo(src) {
    this._frames = [];
    this.video = document.createElement('video');
    this.video.setAttribute('autoplay', true);
    this.video.setAttribute('loop', true);
    this.video.setAttribute('playsinline', true);
    this.video.setAttribute('muted', true);
    this.video.setAttribute('controls', true);
    this.video.src = src;

    this._isLoading = true;
    this._frames = await this._getFrames(this.video.src);
    this._isLoading = false;

    for (const listener of Object.values(this._onLoadVideoListeners)) {
      listener();
    }
  }

  _seek(time) {
    return new Promise(((resolve) => {
      const onSeek = (() => {
        const newCanvas = document.createElement('canvas');
        newCanvas.width = this.video.videoWidth;
        newCanvas.height = this.video.videoHeight;
        const context = newCanvas.getContext('2d');
        context.drawImage(
          this.video,
          0,
          0,
          this.video.videoWidth,
          this.video.videoHeight
        );

        this.video.removeEventListener('seeked', onSeek);
        resolve(context.getImageData(0, 0, this.video.videoWidth, this.video.videoHeight));
      }).bind(this);

      this.video.addEventListener('seeked', onSeek);
      this.video.pause();
      this.video.currentTime = time;
    }).bind(this))
  }

  _getTargetFrame = (videoTiming) => {
    const frameStart = Math.floor(this.props.videoProps.timingStart / (this.video.duration * 1000) * this._frames.length);
    const frameEnd = Math.floor(this.props.videoProps.timingEnd / (this.video.duration * 1000) * this._frames.length);

    const videoPart = (videoTiming - this.props.timingProps.timingStart) / (this.props.timingProps.timingEnd - this.props.timingProps.timingStart);

    return Math.round(frameStart + (frameEnd - frameStart) * videoPart);
  }

  getResolvedLayer() {
    return {
      ...this.props,
      id: this.id,
      layerName: this.layerName
    }
  }

  render(canvas, videoTiming) {
    const onFirstRender = () => {
      this.render(canvas, videoTiming);
      this.removeOnLoadVideoListener(this._onFirstRenderId);
    }

    this._onFirstRenderId = this.addOnLoadVideoListener(onFirstRender.bind(this));

    if (!this.video?.src || this._isLoading) {
      return;
    }

    const targetFrame = this._frames[this._getTargetFrame(videoTiming)];

    if (this._isRenderingTime(videoTiming) && targetFrame) {
      const newCanvas = document.createElement('canvas');
      newCanvas.width = this.video.videoWidth;
      newCanvas.height = this.video.videoHeight;
      const context = newCanvas.getContext('2d');

      const videoInternalTransform = this._getObjectInternalTransform({
        width: this.video.videoWidth,
        height: this.video.videoHeight,
        canvasWidth: canvas.width,
        canvasHeight: canvas.height
      });

      context.drawImage(
        targetFrame,
        0,
        0,
        this.video.videoWidth,
        this.video.videoHeight
      );

      const targetContext = canvas.getContext('2d');
      targetContext.drawImage(
        newCanvas,
        videoInternalTransform.posX + this.props.transformProps.posX - (videoInternalTransform.width * (this.props.transformProps.scaleX || 1) - videoInternalTransform.width) / 2,
        videoInternalTransform.posY + this.props.transformProps.posY - (videoInternalTransform.height * (this.props.transformProps.scaleY || 1) - videoInternalTransform.height) / 2,
        videoInternalTransform.width * (this.props.transformProps.scaleX || 1),
        videoInternalTransform.height * (this.props.transformProps.scaleY || 1)
      );

      context.setTransform(1, 0, 0, 1, 0, 0);
      context.restore()
    }
  }
}