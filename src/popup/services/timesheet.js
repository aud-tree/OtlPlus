angular.module('OtlPlusServices')
  .factory('Timesheet', ['$q', 'Types', function($q, Types) {
    var CACHE_KEY = 'otl-timesheet-cached'
    function blank() {return [{project: null, task: null, hours: [0,0,0,0,0,0,0]}]};

    function inProgress() {
      var deferred = $q.defer();
      chrome.storage.local.get(CACHE_KEY, function(data) {
        deferred.resolve(Types.matchProjectsAndTasksFor(data[CACHE_KEY]) || blank());
      });
      return deferred.promise;
    }

    function cache(timesheet) {
      var object = {};
      object[CACHE_KEY] = timesheet;
      chrome.storage.local.set(object);
    }

    function blankRow() { return blank()[0]; }

    return {
      inProgress: inProgress,
      cache: cache,
      blankRow: blankRow
    };
  }]);
