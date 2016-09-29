(function() {
    var fact = function(i) {
        if (i < 2) return i;

        return i * (fact(i - 1));
    };

    var factLoop = function(s) {
    	var start = s;
    	for (var i = s - 1; i > 0 ; i--) {
    		start = start * i;
    	}

    	return start;
    };

    console.log(factLoop(5));
})();