(function() {
  'use strict';

  angular.module('DirectivesApp', [])
  .controller('ShoppingListController', shoppingListController)
  .directive('shoppingList', ShoppingList)
  .service('ShoppingListService', shoppingListService);

  function ShoppingList() {
    var ddo = {
      restrict: 'E',
      templateUrl: 'templates/listItem.html',
      scope: {
        title : '@title',
        list : '=myList'
      }
    };

    return ddo;
  };

  shoppingListController.$inject = ['ShoppingListService'];
  function shoppingListController(service) {
    var list = this;

    list.itemQuantity = "";
    list.itemName = "";

    list.getTitle = () => {
       var origTitle = "Shopping List #1";
       return origTitle + " (" + list.items.length + " items )";
    };

    list.addItem = function () {
      service.addItem(list.itemName, list.itemQuantity)
      list.title = list.getTitle();
    };

    list.removeItem = function (index) {
      service.removeItem(index);
      list.title = list.getTitle();
    }

    list.items = service.getItems();

    list.title = list.getTitle();
  }

  function shoppingListService() {
    var svc = this;
    svc.items = [];

    svc.addItem = function (name, quantity) {
      svc.items.push({name: name, quantity: quantity});
    };

    svc.getItems = function () {
      return svc.items;
    };

    svc.removeItem = function (index) {
      svc.items.splice(index, 1);
    }
  }


}());
