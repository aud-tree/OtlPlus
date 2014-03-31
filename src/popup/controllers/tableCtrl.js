angular.module('OtlPlusControllers')
  .controller('TableCtrl', ['$scope', 'Timesheet', 'Types', function($scope, Timesheet, Types) {
    $scope.projects = Types.projects();
    $scope.tasks = Types.tasks();
    chrome.storage.local.get('otl-po', function(data) {
      $scope.po = data['otl-po'] || '';
    });

    Timesheet.inProgress().then(function(timesheet) {
      $scope.timesheet = timesheet;
    });

    $scope.addRow = function() { $scope.timesheet.push(Timesheet.blankRow()); };

    $scope.cache = function() { Timesheet.cache($scope.timesheet); };

    $scope.cachePo = function() { chrome.storage.local.set({'otl-po': $scope.po}); }

    $scope.sendToOTL = function() { Timesheet.sendToOTL($scope.timesheet, $scope.po); };

    $scope.totalHoursForRow = function(index) {
      return $scope.timesheet[index].hours.reduce(function(total, hour) {
        return total + parseFloat(hour);
      }, 0);
    };
  }])
