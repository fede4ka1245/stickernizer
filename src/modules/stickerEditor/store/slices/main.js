import { createSlice } from '@reduxjs/toolkit'
import {tabs} from "../../consts/tabs";
import Player from "../../shared/editor/Player";
import {throttle} from "lodash";

const initialState = {
  tab: tabs.main,
  progress: 0,
  isPaused: true,
  isInit: false,
  layers: [],
  canvas: null,
  player: null
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    initModule: (state, action) => {
      state.isInit = true;

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
    },
    setProgress: (state, action) => {
      state.progress = action.payload;
    },
    changeTiming: (state, action) => {
      state.player.goTo(action.payload * state.player.endVideoTiming / 100);
      state.progress = action.payload;
    },
    toggleIsPaused: (state, action) => {
      state.isPaused = action.payload;

      if (action.payload) {
        state.player.stop();
      } else {
        state.player.play();
      }
    },
    openTab: (state, action) => {
      state.tab = action.payload;
    },
    download: (state) => {
      state.player.download();
    },
    addLayer: (state, action) => {
      state.player.addLayer(action.payload);
      state.layers = [...state.player.getLayers().map((layer) => JSON.parse(JSON.stringify(layer)))];
    },
    moveLayerToNewOrder: (state, action) => {
      const newLayers = state.player.moveLayerToNewOrder(action.payload.layerOrder, action.payload.newLayerOrder);
      state.layers = newLayers.map((layer) => JSON.parse(JSON.stringify(layer)));
    },
    resetMain: (state) => {
      state.player.stop();
      state.isInit = false;
    }
  },
})

export const { openTab, moveLayerToNewOrder, resetMain, addLayer, toggleIsPaused, setProgress, download, changeTiming, initModule } = mainSlice.actions

export default mainSlice.reducer