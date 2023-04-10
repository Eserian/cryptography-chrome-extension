import { AnyAction } from "@reduxjs/toolkit";

export const dispatchActionToBackground = async (action: AnyAction): Promise<void> =>  {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ type: 'DISPATCH_ACTION', action }, () => {
      resolve();
    });
  });
}