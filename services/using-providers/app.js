(function() {
    'use strict';

    var app = angular.module('ShoppingList', [])
        .controller('ShoppingController', shoppingController)
        .provider('ShoppingService', ShoppingServiceProvider)
        .config(Config);

    Config.$inject = ['ShoppingServiceProvider'];

    function Config(provider) {
        // this applies globally for each instance created of ShoppingService
        provider.defaults.max = 2;
    }

    shoppingController.$inject = ['ShoppingService'];

    function shoppingController(service) {
        var ctrl = this;

        ctrl.name = "";
        ctrl.quantity = "";
        ctrl.errorMessage = "";

        ctrl.getItems = function() {
            return service.getItems();
        }

        ctrl.addItem = function() {
            try {
                service.addItem(ctrl.name, ctrl.quantity);
            } catch (err) {
                ctrl.errorMessage = err.message;
            }
        }

        ctrl.removeItem = function(index) {
            return service.removeItem(index);
        }

        ctrl.removeAll = function() {
            return service.removeAll();
        }
    }

    function ShoppingService(limit) {

        var service = this;

        var items = [];

        service.addItem = function(name, quantity) {
            console.log(items);
            if (limit === undefined || (limit != undefined && limit > items.length)) {
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

    function ShoppingServiceProvider() {
        var provider = this;

        provider.defaults = {
            max: 4
        };

        provider.$get = function() {
            var shoppingList = new ShoppingService(provider.defaults.max);

            return shoppingList;
        }
    }

}());
