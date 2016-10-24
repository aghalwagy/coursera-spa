(function() {
    'use strict';
    angular.module('PromisesApp', [])
        .controller('ShoppingListController', shoppingListController)
        .service('ValidationService', validate)
        .service('ShoppingService', shoppingService);

    shoppingListController.$inject = ['ShoppingService'];

    function shoppingListController(shoppingService) {

        var ctrl = this;

        ctrl.itemName = "";
        ctrl.itemQuantity = "";

        ctrl.addItem = function() {
            shoppingService.addItem(ctrl.itemName, ctrl.itemQuantity);            
        }

        ctrl.getItems = function() {
            return shoppingService.getItems();
        }

        ctrl.removeItem = function(index) {
            shoppingService.removeItem(index);
        }
    }

    shoppingService.$inject = ['$q', 'ValidationService']

    function shoppingService($q, validationService) {

        var self = this;
        self.items = [];

        /**
         * [addItem description]
         * @param {strign} name     the name of the item to be added
         * @param {number} quantity the quantity of the item to be added
         */
        self.addItem = function(name, quantity) {
            var validateName = validationService.validateName(name);
            var validateQuantity = validationService.validateQuantity(quantity);

            $q.all([validateName, validateQuantity])
                .then(function() {
                    self.items.push({name: name, quantity: quantity});
                })
                .catch(function(error) {
                    console.log(error.message);
                });
        }

        self.removeItem = function(index) {
            self.items.splice(index, 1);
        }

        self.getItems = function() {
            return self.items;
        }
    }

    validate.$inject = ['$q', '$timeout'];

    function validate($q, $timeout) {
        var self = this;

        self.validateName = function(name) {
            var deferred = $q.defer();

            var result = {
                message: ""
            };

            $timeout(function() {
                if (name.toLowerCase().indexOf('cookie') === -1) {
                    deferred.resolve(result);
                } else {
                    result.message = "Can not have cookies!";
                    deferred.reject(result);
                }
            }, 3000);

            return deferred.promise;
        };

        self.validateQuantity = function(quantity) {

            var deferred = $q.defer();
            var result = {
                message: ""
            };

            $timeout(function() {
                if (quantity < 4) {
                    deferred.resolve(result);
                } else {
                    result.message = "Too much.";
                    deferred.reject(result);
                }
            }, 1000);

            return deferred.promise;
        }
    }

}());
