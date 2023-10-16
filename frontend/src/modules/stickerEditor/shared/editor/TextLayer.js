import Layer from "./Layer";
import {blankTextSetter} from "../../consts/layerConsts";

export default class TextLayer extends Layer {
  constructor(params) {
    super(params);
    this.props.textProps = { ...blankTextSetter, ...params.textProps };
  }

  render(canvas, videoTiming) {
    const newCanvas = document.createElement('canvas');
    newCanvas.width = canvas.width;
    newCanvas.height = canvas.height;
    const context = newCanvas.getContext('2d');

    if (this._isRenderingTime(videoTiming)) {
      const fontArray = []

      if (this.props.textProps.textDecorations?.length) {
        fontArray.push(...this.props.textProps.textDecorations);
      }

      fontArray.push(`${this.props.textProps.fontSize}px`, this.props.textProps.fontFamily);

      context.save();

      context.font = fontArray.join(' ');
      context.fillStyle = this.props.textProps.color;
      context.textAlign = this.props.textProps.textAlign;
      const metrics = context.measureText(this.props.textProps.text);
      const actualHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
      context.translate(this.props.transformProps.posX, this.props.transformProps.posY - actualHeight / 2);
      context.rotate(this.props.transformProps.rotation * Math.PI / 180);
      context.translate(-this.props.transformProps.posX, -(this.props.transformProps.posY - actualHeight / 2));
      context.scale(this.props.transformProps.scaleX || 1, this.props.transformProps.scaleY || 1);
      context.fillText(this.props.textProps.text, this.props.transformProps.posX, Number(this.props.transformProps.posY));

      if (this.props.textProps.strokeWidth !== 0) {
        context.strokeStyle = this.props.textProps.strokeColor || 'black';
        context.lineWidth = this.props.textProps.strokeWidth;
        context.strokeText(this.props.textProps.text, this.props.transformProps.posX, Number(this.props.transformProps.posY))
      }

      const targetContext = canvas.getContext('2d');
      targetContext.drawImage(
        newCanvas,
        -(canvas.width * (this.props.transformProps.scaleX || 1) - canvas.width),
        -(canvas.height * (this.props.transformProps.scaleX || 1) - canvas.height),
        canvas.width * (this.props.transformProps.scaleX || 1),
        canvas.height * (this.props.transformProps.scaleY || 1)
      );

      context.setTransform(1, 0, 0, 1, 0, 0);
      context.restore()
    }
  }
}