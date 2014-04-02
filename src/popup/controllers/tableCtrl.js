angular.module('OtlPlusControllers')
  .controller('TableCtrl', ['$scope', 'Timesheet', 'Types', function($scope, Timesheet, Types) {
    var OTL_KEY = 'otl-po';

    chrome.storage.local.get(OTL_KEY, function(data) {
      $scope.po = data[OTL_KEY] || '';
    });

    Types.load().then(function() {
      $scope.projectNames = Types.projectNames();
      $scope.taskNames = function(projectName) { return Types.taskNames(projectName) };
    });

    $scope.init = function() {
      Timesheet.inProgress().then(function(timesheet) {
        $scope.timesheet = timesheet;
      });
    };
    $scope.init();

    $scope.last = function() {
      Timesheet.last().then(function(timesheet) {
        $scope.timesheet = timesheet;
      });
    };

    $scope.addRow = function() { $scope.timesheet.push(Timesheet.blankRow()); };

    $scope.removeRow = function(index) { $scope.timesheet.splice(index, 1); };

    $scope.cache = function() { Timesheet.cache($scope.timesheet); };

    $scope.cachePo = function() {
      object = {};
      object[OTL_KEY] = $scope.po;
      chrome.storage.local.set(object);
    }

    $scope.sendToOTL = function() {
      Timesheet.sendToOTL($scope.timesheet, $scope.po);
      $scope.timesheet = {};
      $scope.init();
    };

  }])
