# validator
Is a npm package used to validate inputs.

Install Package:
```cli
  npm i {package name}
```

The `validator` is used to validate inputs.

The `validator` is a module that has multiply methods that check a condition and if input doesn't match
condition then a error is thrown with a message outlining cause of error. 

The `validator` has multiply methods these include:
- `checkUndefined` - checks if a variable is undefined
- `checkUndefinedArray` - checks each variable in array if they are undefined
- `checkDataType` - checks if a variable has the requested datatype
- `checkDataTypeArray` - checks each variable in an array if they have the requested datatype
- `checkInstanceType` - checks in an instance is the requested instancetype
- `checkInstanceTypeArray` - checks each instance in an array if are the requested instancetype
- `checkSuperClass` - checks if a instance is a child of the requested super class
- `checkSuperClassArray` - checks each instance in a array if they are the child of the requested super class

The `checkSuperClass` and `checkSuperClassArray` methods require that you create a attribute that holds the name of the super class which has a getter method: `getSuper`.
You can use {super class package} which defines a super attribute that holds the name of the super class along with getter and setter methods. Which can be accessed here:
- {super class repo url}
- {super class package url}

Examples:
```javascript
    function squareNumber(number) {
      validator.checkUndefined(number);
      validator.checkDataType(number, "number");
      return number * number;
    }
```
```javascript
    function addNumbers(num1, num2) {
      validator.checkUndefinedArray([num1, num2]);
      validator.checkDataTypeArray([num1, num2], "number");
      return num1 + num2;
    }
```
