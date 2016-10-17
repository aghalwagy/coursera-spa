(function() {
  var app = angular.module('WatchersApp', []);

  app.controller('WatchersCounterCtrl', watchersCountrCtrl);

  watchersCountrCtrl.$inject = ['$scope'];

  function watchersCountrCtrl($scope) {
    console.log($scope);

    $scope.counter = 0;

    $scope.increment = function() {
      $scope.counter += 1;
    };

    /* this is setting a watch manually
     * Antoher way to do this would be via the use of ng-model or a string
     * interpolation expression in html (eg. {{expression}})
    */
    $scope.$watch('counter', function(newVal, oldVal) {
      console.log("old value: ", oldVal);
      console.log("new value: ", newVal);
    }) ;
  }
})();
