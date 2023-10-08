import { configureStore } from '@reduxjs/toolkit'
import mainReducer from "./slices/main";
import layerReducer from './slices/layer';

export default configureStore({
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['main/addLayer', 'main/initModule', 'layer/initLayer', 'layer/setLayer'],
        ignoredPaths: ['main.player', 'main.canvas', 'layer.canvas', 'layer.layer', 'layer.layer', 'layer.player'],
      },
    })
  },
  reducer: {
    main: mainReducer,
    layer: layerReducer
  }
});