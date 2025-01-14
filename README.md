# validator
Is a npm package used to validate inputs.

## Install Package:
```cli
  npm i @mitchell-collins/validator
```

## Description
The `validator` is a module that has multiply methods that check a condition and if input doesn't match
condition then a error is thrown with a message outlining the cause of error along with the argument that was provided an incorrect value. 

## Methods
The `validator` has multiply methods these include:
- `checkUndefined` - checks if a variable is undefined
- `checkUndefinedArray` - checks each variable in array if they are undefined
- `checkDataType` - checks if a variable has the requested datatype
- `checkDataTypeArray` - checks each variable in an array if they have the requested datatype
- `checkInstanceType` - checks in an instance is the requested instancetype
- `checkInstanceTypeArray` - checks each instance in an array if are the requested instancetype
- `checkSuperClass` - checks if a instance is a child of the requested super class
- `checkSuperClassArray` - checks each instance in a array if they are the child of the requested super class
- `checkIsArray` - checks if a varaible has the value that is an array
- `checkArrayLength` - checks if the length of an array is equal to a specified target length
- `checkIndexRange` - checks if a provided index is within the range of an array
- `checkArrayElements` - checks if all elements of an array fulfill a specified condition
- `checkObjectStructure` - checks if the structure of an object fulfill the specified structure
- `checkObjectStructureArray` - checks if an array of objects fulfill the specified structure
- `checkIsHttpStatusCode` - checks if a variable has the value of a http status code
- `checkEnumValue` - checks if a variable has the value of one of the constants of a enum

## Explanation
The `checkSuperClass` and `checkSuperClassArray` methods require that you create a attribute that holds the name of the super class which has a getter method: `getSuper`.
You can use `superclass` which defines a super attribute that holds the name of the super class along with getter and setter methods. Which can be accessed here:
- https://github.com/MitchellCollins/SuperClass
- https://www.npmjs.com/package/@mitchell-collins/superclass

## Examples:

### Undefined & DataType Methods
```javascript
    function squareNumber(num) {
      validator.checkUndefined(num, "num");
      validator.checkDataType(num, "num", "number");
      return num * num;
    }
```
```javascript
    function addNumbers(num1, num2) {
      validator.checkUndefinedArray([num1, num2], ["num1", "num2"]);
      validator.checkDataTypeArray([num1, num2], ["num1", "num2"], "number");
      return num1 + num2;
    }
```

### Check Elements Method
```javascript
// creates a callback function to check if a student is at the correct age
const checkAge = (studentAge) => studentAge >= 5 && studentAge <= 18;
 
function enroleStudent(studentNames, studentAges) {
  validator.checkArrayElements(studentAges, "studentAges", checkAge, "Age must be between 5 - 18");
  // ...
}
```

### Object Structure Method
```javascript
// creates constructors
class Hobbie {
  constructor(name) {
    this.name = name;
  }
}

class Money {
  constructor(amount) {
    this.amount = amount;
  }
}
 
function findPerson(person) {
  // checks structure of person object
  validator.checkObjectStructure(person, "person", {
    name: new String,
    age: new Number,
    friends: new Array,
    hair: {
      color: new String
    },
    hobbie: new Hobbie("name"),
    makeMoney: Money
  });
  // ...
}
   
findPerson({
  name: "Jack",
  age: 30,
  friends: ["John", "Ben"],
  hair: {
    color: "black"
  },
  hobbie: new Hobbie("tennis"),
  makeMoney: Money
});
```
