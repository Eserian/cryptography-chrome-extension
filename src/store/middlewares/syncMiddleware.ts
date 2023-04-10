import { Middleware } from '@reduxjs/toolkit';
import { dispatchActionToBackground } from '../../utils/dispatchActionToBackground';
import { updateStoreFromBackground } from '../popupSlice';

const syncMiddleware: Middleware = (storeAPI) => (next) => async (action) => {
  const result = next(action);

  if (action.type === 'INIT_SYNC_STORE') {
    const loadedState = action.payload;
    await chrome.runtime.sendMessage({ type: 'GET_STATE' }, (response) => {
      if (response && response?.popup) {
        if (loadedState && loadedState.popup) {
          storeAPI.dispatch(updateStoreFromBackground({ ...loadedState.popup, isLoggedIn: response.popup.isLoggedIn }));
        } else {
          storeAPI.dispatch(updateStoreFromBackground(response.popup));
        }
      }
    });
  } else {
    await dispatchActionToBackground(action);
  }
  
  return result;
};

export default syncMiddleware;
