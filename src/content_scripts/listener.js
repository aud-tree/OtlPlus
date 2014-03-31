$(function() {
  var injector = otl.injector();

  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    injector.populateTable(request.timesheet);
  });
});
