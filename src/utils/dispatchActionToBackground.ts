export const dispatchActionToBackground = async (action: any): Promise<void> =>  {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ type: 'DISPATCH_ACTION', action }, () => {
      resolve();
    });
  });
}