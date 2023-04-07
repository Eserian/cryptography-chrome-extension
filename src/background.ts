import store from './store';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'GET_STATE') {
    sendResponse(store.getState());
  } else if (request.type === 'DISPATCH_ACTION') {
    store.dispatch(request.action);
    sendResponse(true);
  }

  return true;
});

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    chrome.tabs.create({ url: chrome.runtime.getURL("index.html") });
  }
});
