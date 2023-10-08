import { createSlice } from '@reduxjs/toolkit'
import Player from "../../shared/editor/Player";
import {throttle} from "lodash";
import {playerConsts} from "../../consts/playerConsts";
import {emptyLayerName} from "../../consts/layerConsts";

const initialState = {
  layerName: '',
  progress: 0,
  isPaused: true,
  isInit: false,
  canvas: null,
  layer: null,
  player: null
};

export const layerSlice = createSlice({
  name: 'layer',
  initialState,
  reducers: {
    initLayer: (state, action) => {
      state.isInit = true;
      action.payload.canvas.width = playerConsts.canvasWidth;
      action.payload.canvas.height = playerConsts.canvasHeight;

      state.canvas = action.payload.canvas;
      if (!state.player) {
        state.player = new Player(action.payload.canvas);
      } else {
        state.player.canvas = action.payload.canvas;
        state.isPaused = true;
        state.player.goTo(state.player.videoTiming);
      }

      if (action.payload.onProgressChange) {
        state.player.addListener(throttle(action.payload.onProgressChange, 200));
      }

      if (!state.layer) {
        state.layer = action.payload.layer;
        if (!action.payload.layer.layerName) {
          action.payload.layer.layerName = emptyLayerName;
        }
        state.layerName = action.payload.layer.layerName;
      } else {
        state.layerName = state.layer.layerName;
      }
      state.player.addLayer(state.layer);
    },
    setLayer: (state, action) => {
      state.layer = action.payload;
    },
    setLayerPlayerProgress: (state, action) => {
      state.progress = action.payload;
    },
    updateProperties: (state, action) => {
      if (state.layer) {
        state.layer.textProps = action.payload.textProps;
        state.layer.transformProps = action.payload.transformProps;
        state.layer.timingProps = action.payload.timingProps;
        state.player.goTo(state.player.videoTiming);
      }
    },
    changeLayerPlayerTiming: (state, action) => {
      state.player.goTo(action.payload * state.player.endVideoTiming / 100);
      state.progress = action.payload;
    },
    changeLayerName: (state, action) => {
      state.layerName = action.payload;
      state.layer.layerName = action.payload;
    },
    toggleIsLayerPlayerPaused: (state, action) => {
      state.isPaused = action.payload;

      if (action.payload) {
        state.player.stop();
      } else {
        state.player.play();
      }
    },
    resetLayer: () => initialState,
  },
})

export const { toggleIsLayerPlayerPaused, setLayer, changeLayerName, updateProperties, setLayerPlayerProgress, changeLayerPlayerTiming, initLayer, resetLayer } = layerSlice.actions

export default layerSlice.reducer