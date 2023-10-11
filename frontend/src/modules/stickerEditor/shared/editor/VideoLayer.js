import Layer from "./Layer";
import {blankVideoSetter} from "../../consts/layerConsts";
import {playerConsts} from "../../consts/playerConsts";

export default class VideoLayer extends Layer {
  #videoProps;
  constructor(params) {
    super(params);
    this.videoProps = { ...blankVideoSetter, ...params.videoProps };
  }

  _setVideo(src) {
    this.video = document.createElement('video');
    this.video.setAttribute('autoplay', true);
    this.video.setAttribute('loop', true);
    this.video.setAttribute('playsinline', true);
    this.video.setAttribute('muted', true);
    this.video.setAttribute('controls', true);
    this.video.src = src;
  }

  set videoProps(props) {
    this.#videoProps = props;

    if (!this.video?.src && props?.videoLink || this.video?.src && props?.videoLink && (this.video?.src !== props?.videoLink)) {
      this._setVideo(props.videoLink)
    }
  }

  get videoProps() {
    return this.#videoProps;
  }

  render(canvas, videoTiming) {
    if (!this.video?.src || !this.video.videoWidth) {
      return;
    }

    if (this._isRenderingTime(videoTiming)) {
      const newCanvas = document.createElement('canvas');
      this.video.currentTime = +this.videoProps.timingStart + (+this.videoProps.timingEnd - +this.videoProps.timingStart) * (videoTiming / playerConsts.maxTiming * 100);
      this.video.pause();
      this.video.addEventListener('seeked', (function(ev) {
        newCanvas.width = this.video.videoWidth;
        newCanvas.height = this.video.videoHeight;
        const context = newCanvas.getContext('2d');

        const videoInternalTransform = this._getObjectInternalTransform({
          width: this.video.videoWidth,
          height: this.video.videoHeight,
          canvasWidth: newCanvas.width,
          canvasHeight: newCanvas.height
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
          videoInternalTransform.posX,
          videoInternalTransform.posY,
          videoInternalTransform.width * (this.transformProps.scaleX || 1),
          videoInternalTransform.height * (this.transformProps.scaleY || 1)
        );

        context.setTransform(1, 0, 0, 1, 0, 0);
        context.restore()
      }).bind(this), {
        once: true
      });
    }
  }
}