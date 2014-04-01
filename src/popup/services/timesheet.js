angular.module('OtlPlusServices')
  .factory('Timesheet', ['$q', 'Types', function($q, Types) {
    var CACHE_KEY = 'otl-timesheet-cached'
    function blank() {return [
      {
        projectName: null,
        taskName: null,
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
        return data[CACHE_KEY] || blank();
      });
    }

    function cache(timesheet) {
      var object = {};
      object[CACHE_KEY] = timesheet;
      chrome.storage.local.set(object);
    }

    function blankRow() { return blank()[0]; }

    function formatForOTL(timesheet, po) {
      return timesheet.map(function(row) {
        return [
          Types.projectValue(row.projectName),
          Types.taskValue(row.projectName, row.taskName),
          po,
          row.line,
          row.type,
        ].concat(row.hours);
      });
    }

    function sendToOTL(timesheet, po) {
      chrome.tabs.query({active: true, currentWindow: true},
      function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {timesheet: formatForOTL(timesheet, po)});
      });
    }

    return {
      inProgress: inProgress,
      cache: cache,
      blankRow: blankRow,
      sendToOTL: sendToOTL
    };
  }]);
