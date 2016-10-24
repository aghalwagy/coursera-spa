(function() {
    'use strict';

    angular.module('DirectivesApp', [])
        .controller('DirectivesController', directivesController)
        .service('ShoppingListService', shoppingListService)
        .directive('listItemDescription', listItemDescription)
        .directive('listItem', listItem)
        .directive('itemAdder', itemAdder);

    function listItemDescription() {
        var ddo = {
            template: '{{ item.quantity }} of {{ item.name }}'
        };
        return ddo;
    }

    function listItem() {
        return {
            templateUrl: 'templates/listItem.html'
        };
    }

    function itemAdder() {
        return {
            templateUrl: 'templates/item-adder.html'
        };
    }

    directivesController.$inject = ['ShoppingListService'];

    function directivesController(service) {
        var ctrl = this;
        ctrl.itemName = "";
        ctrl.itemQuantity = "";

        ctrl.addItem = function() {
            service.addItem(ctrl.itemName, ctrl.itemQuantity);
        };

        ctrl.getItems = function() {
            return service.getItems();
        }
    }

    function shoppingListService() {
        var self = this;
        self.items = [];
        self.addItem = function(name, quantity) {
            console.log(self.items);
            self.items.push({
                name: name,
                quantity: quantity
            });
        };

        self.getItems = function() {
            return self.items;
        };
    }

})();
