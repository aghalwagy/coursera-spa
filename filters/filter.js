function DoubleFactory(){
  return function(input) {
    return input * 2;
  };
}

function UpperCaseFactory(){
  return function(input) {
    input = input || "";
    return input.toUpperCase();
  };
}


function TrimmerFactory() {
  return function(input) {
      input = input || "";
      return input.trim();
  };
}
