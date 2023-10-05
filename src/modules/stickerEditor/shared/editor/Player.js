import {playerConsts} from "../../consts/playerConsts";

export default class Player {
  constructor(canvas) {
    this.canvas = canvas;
    this.playing = false;
    this.videoTiming = 0;
    this.endVideoTiming = playerConsts.maxTiming;
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
      if (this.end) {
        this.end();
      }
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

  onEnd(func) {
    this.end = func;
  }

  download() {
    const chunks = [];
    const stream = this.canvas.captureStream();

    const recorder = new MediaRecorder(stream, {
      mimeType: 'video/webm;codecs=vp9'
    });
    recorder.ondataavailable = (event) => chunks.push(event.data);
    recorder.onstop = () => {
      const blob = new Blob(chunks, {
        type: 'video/webm;codecs="vp9"',
      });

      const a = document.createElement('a');
      a.id = 'download';
      a.download = (new Date()).getTime();
      a.textContent = 'download';
      a.href = URL.createObjectURL(blob);
      a.click();

      const file = new File([blob], "stickernizer-sticker.mebm", {type: 'video/webm;codecs="vp9"'});
      const filesArray = [file];

      if(navigator.canShare && navigator.canShare({ files: filesArray })) {
        navigator.share({
          files: filesArray
        });
      }
    };

    this.stop();
    this.goTo(0);
    this.play();
    recorder.start();
    this.onEnd(function() {
      recorder.stop();
      this.stop();
      this.goTo(0);
      this.onEnd(null);
    });
  }

  addLayer(layer) {
    this.layers = [layer, ...this.layers].reverse();
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

  getLayers() {
    return this.layers.reverse();
  }

  moveLayerToNewOrder(layerOrder, newLayerOrder) {
    const result = Array.from(this.layers);
    const [removed] = result.splice(layerOrder, 1);
    result.splice(newLayerOrder, 0, removed);
    setTimeout(() => {
      this.goTo(this.videoTiming);
    }, 100);

    this.layers = result;
    return this.layers;
  }
}