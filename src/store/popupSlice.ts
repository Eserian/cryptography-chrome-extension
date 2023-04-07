import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PopupState {
  isInitialized: boolean;
  isLoggedIn: boolean;
  secret: string | null;
  passwordHash: string | null;
}

const initialState: PopupState = {
  isInitialized: false,
  isLoggedIn: false,
  secret: null,
  passwordHash: null,
};

const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    setInitialized: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload;
    },
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setSecret: (state, action: PayloadAction<string | null>) => {
      state.secret = action.payload;
    },
    setPasswordHash: (state, action: PayloadAction<string | null>) => {
      state.passwordHash = action.payload;
    },
    resetApp: (state) => {
      state.isInitialized = false;
      state.isLoggedIn = false;
      state.secret = null;
      state.passwordHash = null;
    },
  },
});

export const { setInitialized, setLoggedIn, setSecret, setPasswordHash, resetApp } = popupSlice.actions;

export default popupSlice.reducer;
