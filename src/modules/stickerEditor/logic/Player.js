export default class Player {
  constructor(canvas) {
    this.canvas = canvas;
    this.playing = false;
    this.videoTiming = 0;
    this.endVideoTiming = 3000;
    this.listeners = {};
    this.layers = [];
    window.requestAnimationFrame(this.update.bind(this));
  }

  stop() {
    this.playing = false;
  }

  play() {
    this.playing = true;
  }

  goTo(videoTiming) {
    const context = this.canvas.getContext('2d');
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (const layer of this.layers) {
      layer.render(this.canvas, videoTiming);
    }

    this.videoTiming = videoTiming;
    this.timeStart = this.time - this.videoTiming;
  }

  update(time) {
    this.time = time;
    if (this.playing === false) {
      window.requestAnimationFrame(this.update.bind(this));
      if (this.timeStart) {
        this.timeStart = time - this.videoTiming;
      }
      return;
    }

    if (!this.timeStart) {
      this.timeStart = time;
    }

    this.videoTiming = time - this.timeStart;

    if (this.videoTiming >= this.endVideoTiming) {
      this.goTo(0);
    }

    const context = this.canvas.getContext('2d');
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (const layer of this.layers) {
      layer.render(this.canvas, this.videoTiming);
    }

    for (const listener of Object.values(this.listeners)) {
      listener({
        videoTiming: this.videoTiming,
        endVideoTiming: this.endVideoTiming
      });
    }
    window.requestAnimationFrame(this.update.bind(this));
  }

  addLayer(layer) {
    this.layers = [layer, ...this.layers];
    this.goTo(this.videoTiming);
  }

  addListener(func) {
    const id = Date.now();
    this.listeners[id] = func;

    return id;
  }

  removeListener(id) {
    delete this.listeners[id];
  }
}