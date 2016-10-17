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
  }

}());
