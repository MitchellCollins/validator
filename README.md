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

## Explanation
The `checkSuperClass` and `checkSuperClassArray` methods require that you create a attribute that holds the name of the super class which has a getter method: `getSuper`.
You can use `superclass` which defines a super attribute that holds the name of the super class along with getter and setter methods. Which can be accessed here:
- https://github.com/MitchellCollins/SuperClass
- https://www.npmjs.com/package/@mitchell-collins/superclass

## Examples:
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
