(function() {
  'use strict';

  angular.module('DirectivesApp', [])
  .controller('ShoppingListController', ShoppingListController)
  .directive('shoppingList', ShoppingListDirective)
  .service('ShoppingListService', ShoppingListService);

  function ShoppingListDirective() {
      var ddo = {
        templateUrl: 'templates/shoppinglist.html',
        controller: ShoppingListDirectiveController,
        controllerAs: 'list',
        bindToController: true,
        scope: {
          title: '@title',
          items: '<' /* on-way binding to the list */
        }
      };

      return ddo;
    }

    function ShoppingListDirectiveController() {
      var list = this;
      list.vodkaInList = () => {
        for(var i = 0; i < list.items.length; i++){
          if (list.items[i].name.toLowerCase().indexOf('vodka') !== -1){
            return true;
          }
        }
        return false;
      };
    }

    ShoppingListController.$inject = ['ShoppingListService']
    function ShoppingListController(service) {
      var list = this;
      list.itemName = "";
      list.itemQuantity  = "";
      list.items = service.getItems();
      list.addItem = () => {service.addItem(list.itemName, list.itemQuantity);};
    }

    function ShoppingListService() {
      var svc = this;
      svc.items = [];

      svc.getItems = () => { return svc.items; };

      svc.addItem = (name, quantity)  => {
        svc.items.push({
          name: name,
          quantity: quantity
        });
      };
    }

}());
