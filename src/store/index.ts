import { configureStore } from '@reduxjs/toolkit';
import popupReducer from './popupSlice';

const store = configureStore({
  reducer: {
    popup: popupReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
