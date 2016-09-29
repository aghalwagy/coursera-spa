(function() {
	'use strict';
    var app = angular.module('MyFirstApp', []);
    app.controller('MyFirstController', function($scope) {
        $scope.name = "Ahmed";

        $scope.fact = function(s) {

            var start = s;
            for (var i = s - 1; i > 0; i--) {
                start = start * i;
            }

            return start;
        };
    });
})();