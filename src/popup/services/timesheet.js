angular.module('OtlPlusServices')
  .factory('Timesheet', ['$q', 'Types', function($q, Types) {
    var CACHE_KEY = 'otl-timesheet-cached'
    function blank() {return [
      {
        project: null,
        task: null,
        line: 1,
        type: 'CONTRACT LABOR - OTL',
        hours: [0,0,0,0,0,0,0]
      }
    ]};

    function storageGet(key, callback) {
      var deferred = $q.defer();
      chrome.storage.local.get(key, function(data) {
        deferred.resolve(callback(data));
      });
      return deferred.promise;
    }

    function inProgress() {
      return storageGet(CACHE_KEY, function(data) {
        return Types.matchProjectsAndTasksFor(data[CACHE_KEY]) || blank();
      });
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
