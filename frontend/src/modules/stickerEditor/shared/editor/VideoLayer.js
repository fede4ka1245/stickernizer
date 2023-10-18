import Layer from "./Layer";
import {blankVideoSetter} from "../../consts/layerConsts";
import {v4 as uuidv4} from "uuid";

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
    this.video = document.createElement('video');
    this.props = new Proxy(this.props, {
      set: ((target, prop, newValue, receiver) => {
        if (newValue?.src && prop === 'videoProps' && this.video?.src !== newValue?.src) {
          this._setVideo(newValue.src);
        }

        if (prop === 'videoProps') {
          this.video.playbackRate = (newValue.timingEnd - newValue.timingStart) / (this.props.timingProps.timingEnd - this.props.timingProps.timingStart);
        }

        target[prop] = newValue;

        return Reflect.set(...arguments);
      }).bind(this)
    });
    this.props.videoProps = { ...params.videoProps, ...blankVideoSetter }
    this.props.transformProps.posX = 0;
    this.props.transformProps.posY = 0;
  }


  async _setVideo(src) {
    this.video.setAttribute('autoplay', "true");
    this.video.setAttribute('loop', "true");
    this.video.setAttribute('playsinline', "true");
    this.video.muted = true;
    this.video.setAttribute('controls', "true");
    this.video.setAttribute('preload', "true");
    this.video.src = src;
    this.video.pause();

    this._isLoading = true;

    this.video.oncanplaythrough = () => {
      this._isLoading = false;
      this.video.playbackRate = (this.props.videoProps.timingEnd - this.props.videoProps.timingStart) / (this.props.timingProps.timingEnd - this.props.timingProps.timingStart);

      for (const listener of Object.values(this._onLoadVideoListeners)) {
        listener();
      }
      this.video.oncanplaythrough = null;
    }
  }

  getResolvedLayer() {
    return {
      ...this.props,
      id: this.id,
      layerName: this.layerName
    }
  }

  getVideoTiming = (timing) => {
    const videoPart = (timing - this.props.timingProps.timingStart) / (this.props.timingProps.timingEnd - this.props.timingProps.timingStart);

    return (this.props.videoProps.timingStart + (this.props.videoProps.timingEnd - this.props.videoProps.timingStart) * videoPart) / 1000;
  }

  stop = (videoTiming) => {
    this.video.currentTime = this.getVideoTiming(videoTiming);
    this.video.pause();
  }

  play = (videoTiming) => {
    this.video.currentTime = this.getVideoTiming(videoTiming);
    return this.video.play();
  }

  goTo = (videoTiming) => {
    return new Promise(((resolve) => {
      if (!this.video || !this.video?.src || !this.video?.duration) {
        resolve();
      }

      const onSeek = (async () => {
        this.video.removeEventListener('seeked', onSeek);
        resolve();
      }).bind(this);

      this.video.addEventListener('seeked', onSeek);
      this.video.currentTime = this.getVideoTiming(videoTiming);
    }).bind(this))
  }

  render(canvas, videoTiming) {
    if (!this.video?.src || this._isLoading) {
      const onFirstRender = () => {
        this.render(canvas, videoTiming);
        this.removeOnLoadVideoListener(this._onFirstRenderId);
      }

      this._onFirstRenderId = this.addOnLoadVideoListener(onFirstRender.bind(this));
      return;
    }

    if (this._isRenderingTime(videoTiming)) {
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
        this.video,
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