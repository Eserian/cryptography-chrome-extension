import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PopupState {
  isInitialized: boolean;
  isLoggedIn: boolean;
  encryptedSecret: string | null;
  passwordHash: string | null;
}

const initialState: PopupState = {
  isInitialized: false,
  isLoggedIn: false,
  encryptedSecret: null,
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
    setEncryptedSecret: (state, action: PayloadAction<string | null>) => {
      state.encryptedSecret = action.payload;
    },
    setPasswordHash: (state, action: PayloadAction<string | null>) => {
      state.passwordHash = action.payload;
    },
    resetApp: (state) => {
      state.isInitialized = false;
      state.isLoggedIn = false;
      state.encryptedSecret = null;
      state.passwordHash = null;
    },
    updateStoreFromBackground: (state, action) => {
      state.isInitialized = action.payload.isInitialized;
      state.encryptedSecret = action.payload.encryptedSecret;
      state.isLoggedIn = action.payload.isLoggedIn;
      state.passwordHash = action.payload.passwordHash;
    },
  },
});

export const { setInitialized, setLoggedIn, setEncryptedSecret, setPasswordHash, resetApp, updateStoreFromBackground } = popupSlice.actions;

export default popupSlice.reducer;
