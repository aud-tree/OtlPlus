chrome.webNavigation.onCompleted.addListener(
  function(event) {
    chrome.pageAction.show(event.tabId);
  }, {url: [{hostContains: 'ebiz.manheim.com'}]}
);
