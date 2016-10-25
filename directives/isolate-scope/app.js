(function () {
'use strict';

angular.module('DirectivesApp', [])
.controller('ShoppingListController', ShoppingListController)
.controller('LimitedShoppingListController', LimitedShoppingListController)
.factory('ShoppingListFactory', ShoppingListFactory)
.directive('shoppingList', ShoppingList);


function ShoppingList() {
  var ddo = {
    templateUrl: 'templates/listItem.html',
    scope: {
      list: '=myList',
      title: '@title'
    }
  };

  return ddo;
}


// LIST #1 - controller
ShoppingListController.$inject = ['ShoppingListFactory'];
function ShoppingListController(ShoppingListFactory) {
  var list = this;

  // Use factory to create new shopping list service
  var shoppingList = ShoppingListFactory();

  list.items = shoppingList.getItems();
  var origTitle = "Shopping List #1";
  list.title = origTitle + " (" + list.items.length + " items )";

  list.itemName = "";
  list.itemQuantity = "";

  list.addItem = function () {
    shoppingList.addItem(list.itemName, list.itemQuantity);
    list.title = origTitle + " (" + list.items.length + " items )";
  }

  list.removeItem = function (itemIndex) {
    shoppingList.removeItem(itemIndex);
    list.title = origTitle + " (" + list.items.length + " items )";
  };
}


// LIST #2 - controller
LimitedShoppingListController.$inject = ['ShoppingListFactory'];
function LimitedShoppingListController(ShoppingListFactory) {
  var list = this;

  // Use factory to create new shopping list service
  var shoppingList = ShoppingListFactory(3);

  list.items = shoppingList.getItems();

  list.itemName = "";
  list.itemQuantity = "";

  list.addItem = function () {
    try {
      shoppingList.addItem(list.itemName, list.itemQuantity);
    } catch (error) {
      list.errorMessage = error.message;
    }

  }

  list.removeItem = function (itemIndex) {
    shoppingList.removeItem(itemIndex);
  };
}


// If not specified, maxItems assumed unlimited
function ShoppingListService(maxItems) {
  var service = this;

  // List of shopping items
  var items = [];

  service.addItem = function (itemName, quantity) {
    if ((maxItems === undefined) ||
        (maxItems !== undefined) && (items.length < maxItems)) {
      var item = {
        name: itemName,
        quantity: quantity
      };
      items.push(item);
    }
    else {
      throw new Error("Max items (" + maxItems + ") reached.");
    }
  };

  service.removeItem = function (itemIndex) {
    items.splice(itemIndex, 1);
  };

  service.getItems = function () {
    return items;
  };
}


function ShoppingListFactory() {
  var factory = function (maxItems) {
    return new ShoppingListService(maxItems);
  };

  return factory;
}

})();


// (function() {
//     'use strict';
//
//     angular.module('DirectivesApp', [])
//         .controller('ShoppingListController', shoppingListController)
//         .controller('LimitedShoppingListController', limitedShoppingListController)
//         .factory('ShoppingListFactory', shoppingListFactory)
//         .directive('shoppingList', ShoppingList);
//
//
//     function ShoppingList() {
//         var ddo = {
//             restrict: 'E',
//             templateUrl: 'templates/listItem.html',
//             scope: {
//                 title: '@title',
//                 list: '=myList'
//             }
//         };
//
//         return ddo;
//     };
//
//     shoppingListController.$inject = ['ShoppingListFactory'];
//     function shoppingListController(ShoppingListFactory) {
//         var list = this;
//
//         var service = ShoppingListFactory();
//         console.log('Instantiated service is: ', service);
//         list.itemQuantity = "";
//         list.itemName = "";
//
//         list.getTitle = () => {
//             var origTitle = "Shopping List #1";
//             return origTitle + " (" + list.items.length + " items )";
//         };
//
//         list.addItem = () => {
//             service.addItem(list.itemName, list.itemQuantity)
//             list.title = list.getTitle();
//         };
//
//         list.removeItem = (index) => {
//             service.removeItem(index);
//             list.title = list.getTitle();
//         }
//
//         list.items = service.getItems();
//
//         list.title = list.getTitle();
//     }
//
//     limitedShoppingListController.$inject = ['ShoppingListFactory'];
//     function limitedShoppingListController(ShoppingListFactory) {
//       var list = this;
//       var service = ShoppingListFactory(3);
//       console.log(service);
//       list.itemQuantity = "";
//       list.itemName = "";
//
//       list.getTitle = () => {
//           var origTitle = "Shopping List #1";
//           return origTitle + " (" + list.items.length + " items )";
//       };
//
//       list.addItem = () => {
//         try {
//           service.addItem(list.itemName, list.itemQuantity)
//           list.title = list.getTitle();
//         }
//         catch (err){
//           list.errorMessage = err.message;
//         }
//       };
//
//       list.removeItem = (index) => {
//           service.removeItem(index);
//           list.title = list.getTitle();
//       }
//
//       list.items = service.getItems();
//
//       list.title = list.getTitle();
//     }
//
//     function shoppingListService(maxItems) {
//
//         var svc = this;
//         svc.items = [];
//
//         svc.addItem = (name, quantity) => {
//           console.log(maxItems);
//             if (maxItems === undefined ||
//                 (maxItems !== undefined && maxItems > svc.items.length)) {
//                 svc.items.push({
//                     name: name,
//                     quantity: quantity
//                 });
//             }
//             else {
//               throw new Error("Maximum of '(" + maxItems + ")' reached.");
//             }
//         };
//
//         svc.getItems = () => {
//             return svc.items;
//         };
//
//         svc.removeItem = (index) => {
//             svc.items.splice(index, 1);
//         }
//     }
//
//     function shoppingListFactory() {
//         var factory = (max) => {
//           console.log('inside factory: max is: ', max);
//             return new shoppingListService(max);
//         };
//
//         return factory;
//     }
//
// }());
