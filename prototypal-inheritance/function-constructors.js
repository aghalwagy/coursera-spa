(function() {
    'use strict';

    // Notice the naming convention? That's right? Function constructors are
    // preferred to be Pascaled. Services as a hint to future readers of the
    // code base that this function is meant to be newed up.
    function Dog(name)  {
        this.name = name;

        console.log(this);
    }

    // this creates an ojbect using the Dog function constructor
    var dog = new Dog('Max');

    console.log('typeof(dog)', typeof(dog)); // object
    console.log('typeof(Dog)', typeof(Dog)); // function

    // when calling Dog() without the *new* keyword,
    // *this* inside the fuction will point to the global scope (window in a browser)

    // note: when use use script no automatic resolution to the global scope happens
    // so the line this.name=name in the Dog function will throw error, because *this*
    // will be undefined


    Dog('Max');
}());
