import { Middleware } from '@reduxjs/toolkit';

const syncMiddleware: Middleware = (storeAPI) => (next) => async (action) => {
  if (action.type === 'INIT_SYNC_STORE') {
    chrome.runtime.sendMessage({ type: 'GET_STATE' }, (response) => {
      if (response && response?.popup) {
        storeAPI.dispatch({ type: 'UPDATE_POPUP_STORE', payload: response.popup });
      }
    });
  }
  const result = next(action);

  chrome.runtime.sendMessage({ type: 'DISPATCH_ACTION', action });

  return result;
};

export default syncMiddleware;
