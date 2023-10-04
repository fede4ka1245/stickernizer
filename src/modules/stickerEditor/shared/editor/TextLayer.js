import Layer from "./Layer";

export default class TextLayer extends Layer {
  constructor(params) {
    super(params);
    this.color = params.color || "#ffffff";
    this.fontSize = params.fontSize || "40px";
    this.text = params.text || "Your text";
  }

  render(canvas, videoTiming) {
    const newCanvas = document.createElement('canvas');
    newCanvas.width = canvas.width;
    newCanvas.height = canvas.height;
    const context = newCanvas.getContext('2d');

    if (this.timingEnd >= videoTiming && this.timingStart <= videoTiming) {
      context.font = this.fontSize + " Georgia";
      context.fillStyle = this.color;
      context.fillText(this.text, this.posX, this.posY)

      const targetContext = canvas.getContext('2d');
      targetContext.drawImage(newCanvas, 0, 0, canvas.width, canvas.height)
    }
  }
}