import Layer from "./Layer";
import {blankImageSetter} from "../../consts/layerConsts";

export default class ImageLayer extends Layer {
  constructor(params) {
    super(params);
    this.props.imageProps = { ...blankImageSetter, ...params.imageProps };
    this.props.transformProps.posX = 0;
    this.props.transformProps.posY = 0;

    this.props = new Proxy(this.props, {
      set: ((target, prop, newValue, receiver) => {
        if (prop === 'imageProps' && newValue?.src && this.img?.src !== newValue?.src) {
          this.img = new Image();
          this.img.src = newValue.src;
        } else if (prop === 'imageProps' && newValue?.src && this.img?.src === newValue?.src) {
          return Reflect.set(...arguments);
        }

        target[prop] = newValue;

        return Reflect.set(...arguments);
      }).bind(this)
    })
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