(function() {
    'use strict';
    var app = angular.module('ControllerAsSyntax', []);

    app.controller('AsSyntaxController', testController)
        .controller('ChildController', childController);

    function testController() {
        var parent = this;
        console.log('Parent: ', parent);
        parent.age = 10;
    }

    childController.$inject = ['$scope'];
    function childController($scope) {
        var child = this;
        console.log('Child: ', child);
        child.gotMilk = true;
        console.log('child.$scope', $scope);

    }


}());
