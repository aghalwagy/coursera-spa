(function() {
  'use strict';
  var app = angular.module('DigestApplyApp', []);

  app.controller('WatchersController', watchersController);

  watchersController.$inject = ['$scope'];

  function watchersController($scope) {
    $scope.counter = 0;

    $scope.incrementCounter = function () {
      console.log('Counter incremented.');
      $scope.counter++;
    };

    // uses a time out to delay the execution for one second
    $scope.incrementDelayed = function () {

      // the function passed to setTimeout will be processed on an event queue
      // different than the one used by angular; so the dirty checking process might not work
      // simply nobody told angular to run its digest cycle.
      setTimeout(function () {
        console.log('Counter incrementDelayed');
        $scope.counter++;
      }, 1000);
    };

    $scope.incrementDelayedWithDigest = function () {
      setTimeout(function () {
        console.log('Counter incrementDelayed .. $digest will be called');
        $scope.counter++;

        // here we specifically tell angular to run its digest cycle
        $scope.$digest();
      }, 1000);
    };
  }

}());
