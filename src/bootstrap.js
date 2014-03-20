chrome.webNavigation.onCompleted.addListener(
  function(e) {
    chrome.pageAction.show(e.tabId);
  }, {url: [{hostContains: 'ebiz.manheim.com'}]}
);
