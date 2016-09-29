(function() {
	'use strict';

	var app = angular.module("NameCalculator", []);

	app.controller('nameCalculatorController', function($scope) {
		$scope.name = "";
		$scope.asciiValue = 0;

		$scope.displayNumeric = function() {
			$scope.asciiValue = getAsciiValue($scope.name);
		};
	});

	function getAsciiValue(string) {
		var totalValue = 0;
		for (var i = 0; i < string.length; i++){
			totalValue += string.charCodeAt(i);
		}

		return totalValue;
	}
})();