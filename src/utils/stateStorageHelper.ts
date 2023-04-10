import { RootState } from "../store";

export const saveToChromeStorage = async (state: RootState) => {
  try {
    await chrome.storage.sync.set({ state });
  } catch (e) {
    console.error(e);
  }
};

export const loadFromChromeStorage = (): Promise<RootState | undefined> => {
  return new Promise((resolve) => {
    chrome.storage.sync.get('state', (result) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        resolve(undefined);
      } else {
        resolve(result.state);
      }
    });
  });
};