(function() {
    //'use strict';

    var employee = {
        firstName: "John",
        lastName: "Doe",
        salary: 200.5,
        hired: true,
        position: {
            level: 3,
            payGrade: 'X'
        },
        previousPositions: [{
            level: 1,
            payGrade: 'Z'
        }, {
            level: 2,
            payGrade: 'Y'
        }]
    };

    var sub = Object.create(employee);

    sub.getPosition = function() {
        console.log('this inside sub.getPosition', this);
        this.position = { level: 8, payGrade: 'B'};
        return this.position;
    };

    var coverup = sub.getPosition();

    console.log('will sub.position overwrite parent', sub.position);


    // this creates a new firstName property of sub that masks
    // the parent's firstName property
    sub.firstName = "Ahmed";

    // this however, doesn't create a new object, it changes the parent's object.
    // todo: read more about reference and value types in javascript
    sub.position.level = 4;

    // this creates a new object, position, that shadows the parents object
    sub.position = {level: 5, payGrade: 'V'};

    // this adds to the parent's position array
    sub.previousPositions.push({ level: 7, payGrade: 'T'});

    // this creates a new array that shadows parent's
    sub.previousPositions = [];

    console.log(employee);
    console.log(sub);
}());
