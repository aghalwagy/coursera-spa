(function() {
  'use strict';

  var app = angular.module('LoopingApp', []);

  app.controller('ShoppingListController', shoppingListController);

  shoppingListController.$inject = ['$scope'];

  function shoppingListController($scope) {

    $scope.shoppingList = [
      {'name': 'Dell XPS 15', 'price': 2000, 'batteryCells': 9},
      {'name': 'Macbook Pro Retina', 'price': 2100, 'batteryCells': 9}];

      $scope.addNew = function () {
        var item = { 'name': $scope.newItemName, 'price' : $scope.newItemPrice, 'batteryCells': $scope.newItemBatteryCells};

        $scope.shoppingList.push(item);
      };
  }

}());
