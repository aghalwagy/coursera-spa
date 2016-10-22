(function() {
    'use strict';

    var app = angular.module("FilteredShoppingList", []);

    app.controller('FilteredController', shoppingController);

    shoppingController.$inject = ["$scope"];

    var shoppingList = ["Dairy - Milk",
        "Dairy - Chesse",
        "Vegetables - Lettuce",
        "Vegetables - Cucumber",
        "Protein - Ham",
        "Protein - Bacon",
        "Protein - Fish",
        "Liquor - Beer",
        "Liquor - Scotch"
    ];


    function shoppingController($scope) {
        $scope.searchPhrase = "";
        $scope.shoppingList = shoppingList;
    }

}());
