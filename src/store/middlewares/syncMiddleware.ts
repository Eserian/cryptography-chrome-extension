import { Middleware } from '@reduxjs/toolkit';
import { dispatchActionToBackground } from '../../utils/dispatchActionToBackground';

const syncMiddleware: Middleware = (storeAPI) => (next) => async (action) => {
  if (action.type === 'INIT_SYNC_STORE') {
    await chrome.runtime.sendMessage({ type: 'GET_STATE' }, (response) => {
      if (response && response?.popup) {
        storeAPI.dispatch({ type: 'UPDATE_POPUP_STORE', payload: response.popup });
      }
    });
  } else {
    await dispatchActionToBackground(action);
  }
  const result = next(action);

  return result;
};

export default syncMiddleware;
