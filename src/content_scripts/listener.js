$(function() {
  var injector = otl.injector();

  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    injector.populateRow(1, [1,1,1,1,1,1,1,1,1,1,1,1]);
  });
});
