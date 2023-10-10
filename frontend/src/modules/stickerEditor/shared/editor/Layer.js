import {v4 as uuidv4} from "uuid";
import {blankTimingSetter, blankTransformSetter, emptyLayerName} from "../../consts/layerConsts";

export default class Layer {
  constructor(params) {
    this.layerName = params.layerName || emptyLayerName;
    this.transformProps = { ...blankTransformSetter, ...params.transformProps };
    this.timingProps = { ...blankTimingSetter, ...params.timingProps };
    this.id = uuidv4();
  }

  _isRenderingTime(videoTiming) {
    return this.timingProps.timingEnd >= videoTiming && this.timingProps.timingStart <= videoTiming;
  }

  _getObjectInternalTransform({ width, height, canvasWidth, canvasHeight }) {
    if (width > height) {
      return {
        width: canvasWidth,
        height: canvasHeight * (height / width),
        posX: 0,
        posY: (canvasHeight - canvasWidth * (height / width)) / 2
      }
    }

    return {
      height: canvasHeight,
      width: canvasWidth * (width / height),
      posY: 0,
      posX: (canvasWidth - canvasHeight * (width / height)) / 2
    }
  }

  goTo(canvas, videoTiming) {
    this.render(canvas, videoTiming);
  }

  render(canvas, videoTiming) {}
}