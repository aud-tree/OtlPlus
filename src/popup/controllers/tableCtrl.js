angular.module('OtlPlusControllers', [])
  .controller('TableCtrl', ['$scope', 'Timesheet', function($scope, Timesheet) {
    $scope.projects = ['a','b','c'];
    $scope.tasks = ['a','b','c'];

    Timesheet.inProgress().then(function(timesheet) {
      $scope.timesheet = timesheet;
    });

    $scope.addRow = function() { $scope.timesheet.push(Timesheet.blankRow()); };

    $scope.cache = function() { Timesheet.cache($scope.timesheet); };
  }])
