import { configureStore } from '@reduxjs/toolkit'
import mainReducer from "./slices/main";

export default configureStore({
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['main/addLayer', 'main/initModule'],
        ignoredPaths: ['main.player', 'main.canvas'],
      },
    })
  },
  reducer: {
    main: mainReducer
  }
});