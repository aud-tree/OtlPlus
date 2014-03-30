angular.module('OtlPlus-controllers', [])
  .controller('TableCtrl', ['$scope', 'Timesheet', function($scope, Timesheet) {
    Timesheet.inProgress().then(function(timesheet) {
      $scope.timesheet = timesheet;
    });
  }])
