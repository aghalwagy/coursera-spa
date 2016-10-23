(function() {
    'use strict';

    var app = angular.module('ShoppingList', []);

    app.controller('MutatingController', mutatingController)
        .controller('DisplayingController', displayingController)
        .service('ShoppingListService', ShoppingListService);


    mutatingController.$inject = ['ShoppingListService'];
    function mutatingController(ShoppingListService) {
        var mutator = this;
        mutator.itemName = "";
        mutator.itemQuantity = "";

        mutator.addItem = function () {
            ShoppingListService.addItem(mutator.itemName, mutator.itemQuantity);
        }
    }

    displayingController.$inject = ['ShoppingListService'];
    function displayingController(ShoppingListService) {
        var displayer = this;

        displayer.showList = function () {
            return ShoppingListService.getItems();
        }

        displayer.removeItem = function (index) {
          return ShoppingListService.removeItem(index);
        }

        displayer.removeAll = function () {
            return ShoppingListService.removeAll();
        }

        displayer.showRemoveAll = function () {
            return ShoppingListService.getItems().length > 0;
        }
    }


    function ShoppingListService() {

        var service = this;

        var items = [];

        service.addItem = function (name, quantity) {
            items.push({name: name, quantity: quantity});
        }

        service.getItems = function () {
            return items;
        }

        service.removeItem = function (index) {
          items.splice(index, 1);
        }

        service.removeAll = function () {
            items.splice(0, items.length);
        }
    }

}());
