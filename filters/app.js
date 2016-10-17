(function() {
  'use strict';

  var app = angular.module('CustomFiltersApp', []);
  app.filter('mydouble', DoubleFactory);
  app.filter('myuppercase', UpperCaseFactory);
  app.filter('mytrimmer', TrimmerFactory);

  app.controller('CustomFilterController', customFilterController);

  customFilterController.$inject = ['$scope', 'mydoubleFilter', 'myuppercaseFilter', 'mytrimmerFilter'];
  function customFilterController($scope, mydoubleFilter, myuppercaseFilter, mytrimmerFilter){
    $scope.salary = 0.0;
    $scope.doubleSalary = mydoubleFilter($scope.salary);

    $scope.doublIt = function() {
      return mydoubleFilter($scope.salary);
    }

    $scope.trimMe = function(input) {
      return mytrimmerFilter(input);
    }
  }


})();
