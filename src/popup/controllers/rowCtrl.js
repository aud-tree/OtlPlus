angular.module('OtlPlusControllers')
  .controller('RowCtrl', ['$scope', function($scope) {
    $scope.totalHoursInRow = function() {
      return $scope.row.hours.reduce(function(total, hour) {
        return total + parseFloat(hour);
      }, 0);
    };

    if(undefined === $scope.row.autocompleteEnabled) {
      $scope.row.autocompleteEnabled = true;
    }
    $scope.row.cachedMondayHours = $scope.row.cachedMondayHours || 0;

    $scope.autocomplete = function(index) {
      if(index == 1 && $scope.row.autocompleteEnabled && $scope.row.hours[1] != $scope.row.cachedMondayHours) {
        [2,3,4,5].forEach(function(index, i, arr) {
          $scope.row.hours[index] = $scope.row.hours[1];
        });
        $scope.row.autocompleteEnabled = false;
        $scope.row.cachedMondayHours = $scope.row.hours[1];
        $scope.cache();
      }
    };
  }]);
