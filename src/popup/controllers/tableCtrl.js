angular.module('OtlPlusControllers', [])
  .controller('TableCtrl', ['$scope', 'Timesheet', function($scope, Timesheet) {
    Timesheet.inProgress().then(function(timesheet) {
      $scope.timesheet = timesheet;
    });

    $scope.addRow = function() { $scope.timesheet.push(Timesheet.blankRow()); };
  }])
