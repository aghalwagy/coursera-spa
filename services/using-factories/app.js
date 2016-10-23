(function() {
    'use strict';

    var app = angular.module('ShoppingList', []);

    app.controller('ShoppingController', ShoppingController)
        .controller('LimitedShoppingController', LimitedShoppingController)
        .factory('ShoppingServiceFactory', ShoppingServiceFactory);

    function ShoppingController() {
        var ctrl = this;
        ctrl.itemName = "";
        ctrl.itemQuantity = "";


        var shoppingService = ShoppingServiceFactory();

        ctrl.addItem = function() {
            return shoppingService.addItem(ctrl.itemName, ctrl.itemQuantity);
        }

        ctrl.getItems = function() {
            return shoppingService.getItems();
        }

        ctrl.removeItem = function(index) {
            return shoppingService.removeItem(index);
        }

        ctrl.removeAll = function() {
            return shoppingService.removeAll();
        }
    }


    function LimitedShoppingController() {

        var ctrl = this;
        ctrl.itemName = "";
        ctrl.itemQuantity = "";
        ctrl.errorMessage = "";

        var shoppingService = ShoppingServiceFactory(3);

        ctrl.addItem = function() {
            try {
                shoppingService.addItem(ctrl.itemName, ctrl.itemQuantity);
            } catch (err) {
                ctrl.errorMessage = err.Messagae;
            }
        }

        ctrl.getItems = function() {
            return shoppingService.getItems();
        }

        ctrl.removeItem = function(index) {
            return shoppingService.removeItem(index);
        }

        ctrl.removeAll = function() {
            return shoppingService.removeAll();
        }

    }

    function ShoppingService(limit) {

        var service = this;

        var items = [];

        service.addItem = function(name, quantity) {

            if (limit === undefined || (limit != undefined && limit < items.length)) {
                items.push({
                    name: name,
                    quantity: quantity
                });
            } else {
                throw new Error('Max limit(' + limit + ') reached.');
            }
        }

        service.getItems = function() {
            return items;
        }

        service.removeItem = function(index) {
            items.splice(index, 1);
        }

        service.removeAll = function() {
            items.splice(0, items.length);
        }
    }

    function ShoppingServiceFactory() {
        var factory = function(limit) {
            return new ShoppingService(limit);
        }
        return factory;
    }

}());
