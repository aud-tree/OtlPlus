angular.module('OtlPlusControllers')
  .controller('RowCtrl', ['$scope', function($scope) {
    $scope.totalHoursInRow = function() {
      return $scope.row.hours.reduce(function(total, hour) {
        return total + parseFloat(hour);
      }, 0);
    };

    $scope.autocomplete = function(index) {

    };
  }]);
