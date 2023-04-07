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
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action): action is PayloadAction<PopupState> => action.type === 'UPDATE_POPUP_STORE',
      (state, action) => {
        return action.payload;
      }
    );
  },
});

export const { setInitialized, setLoggedIn, setEncryptedSecret, setPasswordHash, resetApp } = popupSlice.actions;

export default popupSlice.reducer;
