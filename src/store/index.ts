import { configureStore } from '@reduxjs/toolkit';
import popupReducer from './popupSlice';
import syncMiddleware from './middlewares/syncMiddleware';
import { saveToChromeStorage } from '../utils/stateStorageHelper';

const store = configureStore({
  reducer: {
    popup: popupReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(syncMiddleware),
});

store.subscribe(() => {
  saveToChromeStorage(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
