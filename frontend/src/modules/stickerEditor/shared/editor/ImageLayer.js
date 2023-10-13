import Layer from "./Layer";
import {blankImageSetter} from "../../consts/layerConsts";
import lodash from "lodash";

export default class ImageLayer extends Layer {
  constructor(params) {
    super(params);
    this.imageProps = { ...blankImageSetter, ...params.imageProps };
    this.transformProps.posX = 0;
    this.transformProps.posY = 0;
  }

  set imageProps(props) {
    if (lodash.isEqual(this.imageProps, props)) {
      return;
    }

    if (props?.src) {
      this.img = new Image();
      this.img.src = props?.src;
    }
  }
  render(canvas, videoTiming) {
    if (!this.img?.complete) {
      if (this.img) {
        this.img.onload = (() => {
          this.render(canvas, videoTiming);
          this.img.onload = null;
        }).bind(this);
      }
      return;
    }

    if (this._isRenderingTime(videoTiming)) {
      const newCanvas = document.createElement('canvas');
      newCanvas.width = this.img.width;
      newCanvas.height = this.img.height;
      const videoInternalTransform = this._getObjectInternalTransform({
        width: this.img.naturalWidth,
        height: this.img.naturalHeight,
        canvasWidth: canvas.width,
        canvasHeight: canvas.height
      });
      const context = newCanvas.getContext('2d');

      context.drawImage(
        this.img,
        0,
        0,
        this.img.naturalWidth,
        this.img.naturalHeight
      );

      const targetContext = canvas.getContext('2d');
      targetContext.drawImage(
        newCanvas,
        videoInternalTransform.posX + this.transformProps.posX - (videoInternalTransform.width * (this.transformProps.scaleX || 1) - videoInternalTransform.width) / 2,
        videoInternalTransform.posY + this.transformProps.posY - (videoInternalTransform.height * (this.transformProps.scaleY || 1) - videoInternalTransform.height) / 2,
        videoInternalTransform.width * (this.transformProps.scaleX || 1),
        videoInternalTransform.height * (this.transformProps.scaleY || 1)
      );

      context.setTransform(1, 0, 0, 1, 0, 0);
      context.restore()
    }
  }
}