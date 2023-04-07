export const getStateFromBackground = async (): Promise<any> => {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ type: 'GET_STATE' }, (response) => {
      resolve(response);
    });
  });
}

export const dispatchActionToBackground = async (action: any): Promise<void> => {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ type: 'DISPATCH_ACTION', action }, () => {
      resolve();
    });
  });
}
