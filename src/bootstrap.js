chrome.tabs.onUpdated.addListener(showPageAction);

function showPageAction(tabId, changeInfo, tab) {
  if(tab.url.indexOf('ebiz.manheim.com') > -1) {
    chrome.pageAction.show(tabId);
  }
};
