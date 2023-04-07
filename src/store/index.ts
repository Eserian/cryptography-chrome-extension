import { configureStore } from '@reduxjs/toolkit';
import popupReducer from './popupSlice';
import syncMiddleware from './middlewares/syncMiddleware';

const store = configureStore({
  reducer: {
    popup: popupReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(syncMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
