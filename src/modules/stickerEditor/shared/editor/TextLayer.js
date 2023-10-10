import Layer from "./Layer";
import {blankTextSetter} from "../../consts/layerConsts";

export default class TextLayer extends Layer {
  constructor(params) {
    super(params);
    this.textProps = { ...blankTextSetter, ...params.textProps };
  }

  render(canvas, videoTiming) {
    const newCanvas = document.createElement('canvas');
    newCanvas.width = canvas.width;
    newCanvas.height = canvas.height;
    const context = newCanvas.getContext('2d');

    if (this._isRenderingTime(videoTiming)) {
      const fontArray = []

      if (this.textProps.textDecorations?.length) {
        fontArray.push(...this.textProps.textDecorations);
      }

      fontArray.push(`${this.textProps.fontSize}px`, this.textProps.fontFamily);

      context.save()

      context.font = fontArray.join(' ');
      context.fillStyle = this.textProps.color;
      context.textAlign = this.textProps.textAlign;
      const metrics = context.measureText(this.textProps.text);
      const actualHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
      context.translate(this.transformProps.posX, this.transformProps.posY - actualHeight / 2);
      context.rotate(this.transformProps.rotation * Math.PI / 180);
      context.translate(-this.transformProps.posX, -(this.transformProps.posY - actualHeight / 2));
      context.scale(this.transformProps.scaleX || 1, this.transformProps.scaleY || 1);
      context.fillText(this.textProps.text, this.transformProps.posX, Number(this.transformProps.posY));

      if (this.textProps.strokeWidth !== 0) {
        context.strokeStyle = this.textProps.strokeColor || 'black';
        context.lineWidth = this.textProps.strokeWidth;
        context.strokeText(this.textProps.text, this.transformProps.posX, Number(this.transformProps.posY))
      }

      const targetContext = canvas.getContext('2d');
      targetContext.drawImage(
        newCanvas,
        -(canvas.width * (this.transformProps.scaleX || 1) - canvas.width),
        -(canvas.height * (this.transformProps.scaleX || 1) - canvas.height),
        canvas.width * (this.transformProps.scaleX || 1),
        canvas.height * (this.transformProps.scaleY || 1)
      );

      context.setTransform(1, 0, 0, 1, 0, 0);
      context.restore()
    }
  }
}