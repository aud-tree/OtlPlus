angular.module('OtlPlusServices', [])
  .factory('Timesheet', ['$q', function($q) {
    var CACHE_KEY = 'otl-timesheet-cached'
    function blank() {return [{project: null, task: null}]};

    function inProgress() {
      var deferred = $q.defer();
      chrome.storage.local.get(CACHE_KEY, function(data) {
        deferred.resolve(data[CACHE_KEY] || blank());
      });
      return deferred.promise;
    }

    function cache(timesheet) {
      chrome.storage.local.set(CACHE_KEY, timesheet);
    }

    return {
      inProgress: inProgress,
      cache: cache,
      blankRow: function() {return blank()[0];}
    };
  }]);
