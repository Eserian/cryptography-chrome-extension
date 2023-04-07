import { AnyAction, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';

// Посылает текущее состояние стора в бэкграунд
const sendStateToBackground = (state: any) => {
  chrome.runtime.sendMessage({ type: 'SYNC_POPUP_STATE', payload: state });
};

export const syncStoreMiddleware: Middleware = (api: MiddlewareAPI) => {
  // Обработчик для синхронизации состояния попапа с состоянием бэкграунда
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'SYNC_BACKGROUND_STATE') {
      api.dispatch({ type: 'SYNC_STORE', payload: message.payload });
    }
  });

  return (next) => (action: AnyAction) => {
    // Вызов следующего middleware в цепочке
    const result = next(action);

    // Отправка текущего состояния в бэкграунд после выполнения действия
    sendStateToBackground(api.getState());

    return result;
  };
};
