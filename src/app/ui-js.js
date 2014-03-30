angular.module('OtlPlus', [])
  .controller('TableCtrl', ['$scope', 'Timesheet', function($scope, Timesheet) {
    Timesheet.inProgress().then(function(timesheet) {
      $scope.timesheet = timesheet;
    });
  }])
  .factory('Timesheet', ['$q', function($q) {
    var _blank = [{project: null, task: null}];

    function inProgress() {
      var deferred = $q.defer();
      chrome.storage.local.get('otl-timesheet-cached', function(data) {
        deferred.resolve(data['otl-timesheet-cached'] || _blank);
      });
      return deferred.promise;
    }

    return {
      inProgress: inProgress
    };
  }]);

$("#insert").on("click", function(e) {
  chrome.tabs.query({active: true, currentWindow: true},
  function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {message: 'done'},
    function(response) {
      console.log(response);
    });
  });
});
