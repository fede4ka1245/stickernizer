import { createSlice } from '@reduxjs/toolkit'
import Player from "../../shared/editor/Player";
import {throttle} from "lodash";
import {playerConsts} from "../../consts/playerConsts";
import TextLayer from "../../shared/editor/TextLayer";

const initialState = {
  progress: 0,
  isPaused: true,
  isInit: false,
  layerText: new TextLayer({
    posX: 25,
    posY: playerConsts.canvasHeight / 2,
    width: playerConsts.canvasWidth - 50,
    height: playerConsts.canvasHeight - 50,
    fontSize: 65,
    timingStart: 0,
    timingEnd: playerConsts.maxTiming,
    color: 'white',
    text: 'Your new text'
  }),
  canvas: null,
  player: null
};

export const mainSlice = createSlice({
  name: 'text',
  initialState,
  reducers: {
    initTextLayer: (state, action) => {
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

      state.player.addLayer(state.layerText);
    },
    setTextPlayerProgress: (state, action) => {
      state.progress = action.payload;
    },
    changeTextPlayerTiming: (state, action) => {
      state.player.goTo(action.payload * state.player.endVideoTiming / 100);
      state.progress = action.payload;
    },
    toggleIsTextPlayerPaused: (state, action) => {
      state.isPaused = action.payload;

      if (action.payload) {
        state.player.stop();
      } else {
        state.player.play();
      }
    },
    resetText: () => initialState,
  },
})

export const { toggleIsTextPlayerPaused, setTextPlayerProgress, changeTextPlayerTiming, initTextLayer, resetText } = mainSlice.actions

export default mainSlice.reducer