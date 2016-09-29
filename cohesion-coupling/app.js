var student = {
	name: "",
	type: "Student"
};

document.addEventListener('DOMContentLoaded', onDomContentLoaded);

function onDomContentLoaded(){
	var name = document.getElementById('name');
	name.addEventListener('keyup', onNameKeyUp);
}

function onNameKeyUp(){
	calculateAscii();
}

function calculateAscii(){

	// low cohesion is apparent here; this function is named calculateAscii,
	// so it should be only responsible for calculating ascii --not fetching the
	// value of the string to calculate from the dom element, nor setting the
	// result to another dom element's text.
	var val = document.getElementById('name').value;
	var total = 0;
	for (var i =0; i < val.length; i++) {
		total += val.charCodeAt(i);
	}

	document.getElementById('output').innerText = total;
}