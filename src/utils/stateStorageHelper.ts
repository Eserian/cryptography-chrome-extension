import store from '../store';

export const saveStateToStorage = async () => {
  const { isInitialized, passwordHash, encryptedSecret, isLoggedIn } = store.getState().popup;
  await chrome.storage.local.set({
    isInitialized,
    passwordHash,
    encryptedSecret,
    isLoggedIn
  });
};

export const loadStateFromStorage = async () => {
  return new Promise<{ isInitialized: boolean; passwordHash: string, encryptedSecret: string, isLoggedIn: boolean } | null>((resolve) => {
    chrome.storage.local.get(['isInitialized', 'passwordHash', 'encryptedSecret'], (result) => {
      resolve({
        isInitialized: result.isInitialized ?? false,
        passwordHash: result.passwordHash ?? null,
        encryptedSecret: result.encryptedSecret ?? null,
        isLoggedIn: result.isLoggedIn ?? false,
      });
      chrome.storage.local.clear();
    });
  });
};