import {v4 as uuidv4} from "uuid";
import {blankTimingSetter, blankTransformSetter, emptyLayerName} from "../../consts/layerConsts";

export default class Layer {
  constructor(params) {
    this.props = {};
    this.props.transformProps = { ...blankTransformSetter, ...params.transformProps };
    this.props.timingProps = { ...blankTimingSetter, ...params.timingProps };
    this.id = uuidv4();
    this.layerName = params.layerName || emptyLayerName;
  }

  _isRenderingTime(videoTiming) {
    return this.props?.timingProps?.timingEnd >= videoTiming && this.props?.timingProps?.timingStart <= videoTiming;
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

  getResolvedLayer() {
    return {
      ...this.props,
      id: this.id,
      layerName: this.layerName
    }
  }

  goTo(canvas, videoTiming) {
    this.render(canvas, videoTiming);
  }

  render(canvas, videoTiming) {}
}