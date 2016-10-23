(function() {
    'use strict';


    var app = angular.module('ShoppingListCheckOff', []);

    app.controller('ToBuyController', toBuyCtrl)
        .controller('AlreadyBoughtController', alreadyBoutCtrl)
        .service('ShoppingListCheckOffService', CheckOffService);

    toBuyCtrl.$inject  = ['ShoppingListCheckOffService'];
    function toBuyCtrl(service) {
        var buyCtrl = this;

        buyCtrl.getItems = function() {
            return service.getToBuyItems();
        }

        buyCtrl.removeItem = function(index) {
            service.markAsBought(index);
        }

        buyCtrl.hasAllBeenBought = function () {
            return service.getToBuyItems().length === 0;
        }
    }

    alreadyBoutCtrl.$inject = ['ShoppingListCheckOffService'];
    function alreadyBoutCtrl(service) {
        var boughtCtrl = this;

        boughtCtrl.getItems = function () {
            return service.getAllBoughtItems();
        }

        boughtCtrl.hasAnyThingBeenBought = function() {
            return service.getAllBoughtItems().length > 0;
        }
    }

    function CheckOffService() {
        var svc = this;

        svc.itemsToBuy = [

            {name: 'Cookies', quantity: 10},
            {name: 'Chips', quantity: 20},
            {name: 'Beer', quantity: 50},
            {name: 'Funions', quantity: 90},
            {name: 'Doritos', quantity: 5 }
        ];

        svc.boughtItems = [];

        svc.markAsBought = function(index){
            var bought = svc.itemsToBuy[index];
            svc.boughtItems.push({ quantity: bought.quantity, name: bought.name});
            svc.itemsToBuy.splice(index, 1);
        }

        svc.getToBuyItems = function() {
            return svc.itemsToBuy;
        }

        svc.getAllBoughtItems = function() {
            return svc.boughtItems;
        }
    }

}());
