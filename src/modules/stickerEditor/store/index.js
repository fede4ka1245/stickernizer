import { configureStore } from '@reduxjs/toolkit'
import mainReducer from "./slices/main";
import textReducer from './slices/text';

export default configureStore({
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['main/addLayer', 'main/initModule', 'text/initTextLayer'],
        ignoredPaths: ['main.player', 'main.canvas', 'textLayer.canvas', 'textLayer.layerText', 'textLayer.player'],
      },
    })
  },
  reducer: {
    main: mainReducer,
    textLayer: textReducer
  }
});