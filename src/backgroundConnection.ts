import { AnyAction } from '@reduxjs/toolkit';

let isBackgroundReady = false;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'BACKGROUND_READY') {
    isBackgroundReady = true;
  }
});

const sendMessageWhenReady = (message: any, callback?: (response: any) => void): void => {
  if (!isBackgroundReady) {
    setTimeout(() => sendMessageWhenReady(message, callback), 100);
  } else {
    chrome.runtime.sendMessage(message, callback);
  }
};

export const dispatchActionToBackground = (action: AnyAction): Promise<any> => {
  return new Promise((resolve, reject) => {
    sendMessageWhenReady({ type: 'POPUP_ACTION', payload: action }, (response) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(response);
      }
    });
  });
};
