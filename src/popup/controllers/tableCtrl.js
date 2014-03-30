angular.module('OtlPlusControllers')
  .controller('TableCtrl', ['$scope', 'Timesheet', 'Types', function($scope, Timesheet, Types) {
    $scope.projects = Types.projects();
    $scope.tasks = Types.tasks();

    Timesheet.inProgress().then(function(timesheet) {
      $scope.timesheet = timesheet;
    });

    $scope.addRow = function() { $scope.timesheet.push(Timesheet.blankRow()); };

    $scope.cache = function() { Timesheet.cache($scope.timesheet); };
  }])
