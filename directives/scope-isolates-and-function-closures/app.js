(function() {
    'use strict';

    angular.module('DirectivesApp', [])
        .controller('ShoppingListController', ShoppingListController)
        .service('ShoppingListService', ShoppingListService)
        .directive('shoppingList', ShoppingListDirective);

    function ShoppingListDirective() {
        var ddo = {
            templateUrl: 'templates/shoppinglist.html',
            controller: ShoppingListDirectiveController,
            controllerAs: 'list',
            bindToController: true,
            scope: {
                items: '<',
                myTitle: '@title',
                badRemove: '=',
                goodRemove: '&'
            }
        };

        return ddo;
    }

    function ShoppingListDirectiveController() {
        var list = this;
        list.vodkaInList = () => {            
              for (var i = 0; i < list.items.length; i++) {
                if (list.items[i].name.toLowerCase().indexOf('vodka') !== -1) {
                    return true;
                }
            }
            return false;
        };
    }

    ShoppingListController.$inject = ['ShoppingListService'];
    function ShoppingListController(service) {
        var ctrl = this;
        ctrl.itemName = "";
        ctrl.itemQuantity = "";
        ctrl.title = "Checkout those directives y'all";
        ctrl.addItem = () => {
          service.addItem(ctrl.itemName, ctrl.itemQuantity);
        }

        ctrl.items = service.getItems();

        ctrl.removeItem = function (index) {
          console.log('this is:', this);
          service.removeItem(index);
        };
    }

    function ShoppingListService() {
        var svc = this;

        svc.items = [];
        svc.getItems = () => svc.items;

        svc.addItem = (name, quantity) => {
            svc.items.push({
                name: name,
                quantity: quantity
            });
        };

        svc.removeItem = (index) => {
            // console.log('this is: ', this);
            svc.items.splice(index, 1);
        };
    }

}());
