export default class Layer {
  constructor({
    posX,
    posY,
    width,
    height,
    timingStart,
    timingEnd
  }) {
    this.timingStart = timingStart;
    this.timingEnd = timingEnd;
    this.width = width;
    this.height = height;
    this.posX = posX;
    this.posY = posY;
  }

  goTo(canvas, videoTiming) {
    this.render(canvas, videoTiming);
  }

  render(canvas, videoTiming) {
    const newCanvas = document.createElement('canvas');
    newCanvas.width = canvas.width;
    newCanvas.height = canvas.height;
    const context = newCanvas.getContext('2d');

    if (this.timingEnd >= videoTiming && this.timingStart <= videoTiming) {
      context.rect(this.posX, this.posY, this.width, this.height);
      context.fill();

      const targetContext = canvas.getContext('2d');
      targetContext.drawImage(newCanvas, 0, 0, canvas.width, canvas.height)
    }
  }
}