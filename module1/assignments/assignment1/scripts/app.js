(function() {
    'use strict';

    var app = angular.module('LunchCalculatorApp', []);

    app.controller('LunchCalculatorController', LunchCalculatorController);

    LunchCalculatorController.$inject = ['$scope'];

    function isEmptyString(string) {
        return string.trim().length == 0;
    }

    function splitText(text, separator) {
    	if (isEmptyString(text)) return [];

        return text.split(separator).filter(function(e) {
            return !isEmptyString(e);
        });
    }

    function LunchCalculatorController($scope) {
        $scope.lunchText = "";
        $scope.lunchEvaluation = "";
        $scope.colorClass = "";

        $scope.calculateLunch = function() {
        	
        	// split entries and exclude the empty ones
            var entries = splitText($scope.lunchText, ",");
            console.log(entries);
            if (entries.length == 0) {
                $scope.lunchEvaluation = "Please enter data first";
                $scope.colorClass = "red";
                return;
            }            

            $scope.colorClass = "green";
            if (entries.length <= 3) {
                $scope.lunchEvaluation = "Enjoy!";
            } else {
                $scope.lunchEvaluation = "Too Much!";
            }

        };
    };
})();