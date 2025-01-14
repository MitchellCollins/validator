import { StatusCodes } from "http-status-codes-minimal";

/**
 * The `validator` is used to validate inputs.
 * 
 * The `validator` is a module that has multiply methods that check a condition and if input doesn't match
 * condition then a error is thrown with a message outlining cause of error.
 * 
 * The `validator` has multiply methods these include:
 * - `checkUndefined` - checks if a variable is undefined
 * - `checkUndefinedArray` - checks each variable in array if they are undefined
 * - `checkDataType` - checks if a variable has the requested datatype
 * - `checkDataTypeArray` - checks each variable in an array if they have the requested datatype
 * - `checkInstanceType` - checks in an instance is the requested instancetype
 * - `checkInstanceTypeArray` - checks each instance in an array if are the requested instancetype
 * - `checkSuperClass` - checks if a instance is a child of the requested super class
 * - `checkSuperClassArray` - checks each instance in a array if they are the child of the requested super class
 * 
 * Examples:
 * 
 *      function squareNumber(num) {
 *          validator.checkUndefined(num, "num");
 *          validator.checkDataType(num, "num", "number");
 *          return num * num;
 *      }
 * 
 *      function addNumbers(num1, num2) {
 *          validator.checkUndefinedArray([num1, num2], ["num1", "num2"]);
 *          validator.checkDataTypeArray([num1, num2], ["num1", "num2"], "number");
 *          return num1 + num2;
 *      }
 */
const validator = {

    /**
     * Used to check if a `variable` is undefined. If so a error is thrown.
     * 
     * `variableName` is used to specify which argument was left undefined.
     * 
     * @param {*} variable the variable that will be check if undefined
     * @param {String} variableName the name of the `variable`
     */
    checkUndefined: function (variable, variableName) {
        if (variable === undefined) throw new Error(`'${variableName}' Argument left Undefined`);
    },

    /**
     * Used to check if an array of `variables` are undefined. If so a error is thrown.
     * 
     * The `variableNames` array is used to specify which argument was left undefined. Ensure that the variable and variable name 
     * are in the same index in their array.
     * 
     * Example:
     * 
     *      function addNumbers(num1, num2) {
     *          // ensure that variable and variable names are in the same index in their array
     *          validator.checkUndefinedArray([num1, num2], ["num1", "num2"]);
     * 
     *          return num1 + num2;
     *      }
     * 
     * @param {Array<*>} variables an array of variables that will all be check if undefined
     * @param {Array<String>} variableNames an array of the variable names in the `variables` array
     */
    checkUndefinedArray: function (variables, variableNames) {
        if (variables.length !== variableNames.length) throw new Error("Amount of variables and variable names must be equal");

        for (let i = 0; i < variables.length; i++) {
            this.checkUndefined(variables[i], variableNames[i]);
        }
    },

    /**
     * Used to check if the datetype of a `variable` is equal to the specified `dataType`.
     * If not a error is thrown.
     * 
     * `variableName` is used to specify which argument was provided the incorrect datatype.
     * 
     * @param {*} variable the variable that will be check if it has the correct datatype value 
     * @param {String} variableName the name of the `variable`
     * @param {String} dataType the datatype that the `variable` must have
     */
    checkDataType: function (variable, variableName, dataType) {
        if (typeof variable !== dataType) throw new Error(`Must provide ${dataType} datatype for '${variableName}' Argument`);
    },

    /**
     * Used to check if the dataype of an array of `variables` are equal to the specified `datatype`.
     * If not a error is thrown.
     * 
     * The `variableNames` array is used to specify which argument was provided the incorrect datatype. Ensure that the variable and 
     * variable name are in the same index in their array.
     * 
     *  Example:
     * 
     *      function addNumbers(num1, num2) {
     *          // ensure that variable and variable names are in the same index in their array
     *          validator.checkDataTypeArray([num1, num2], ["num1", "num2"], "number");
     * 
     *          return num1 + num2;
     *      }
     * 
     * @param {Array<*>} variables an array of variables that will all be check if they have the correct datatype
     * @param {Array<String>} variableNames an array of variable names for the variables in the `variables` array
     * @param {String} dataType the datatype that the `variables` must have
     */
    checkDataTypeArray: function (variables, variableNames, dataType) {
        if (variables.length !== variableNames.length) throw new Error("Amount of variables and variable names must be equal");

        for (let i = 0; i < variables.length; i++) {
            this.checkDataType(variables[i], variableNames[i], dataType);
        }
    },

    /**
     * Used to check if the instancetype of a `instance` is equal to specified `instanceType`.
     * If not a error is thrown.
     * 
     * `instanceName` is used to specify which argument was provided the incorrect instancetype.
     * 
     * @param {InstanceType<*>} instance the instance that will be check if is the correct instancetype
     * @param {String} instanceName the name of the `instance`
     * @param {String} instanceType the instancetype the `instance` must be
     */
    checkInstanceType: function (instance, instanceName, instanceType) {
        if (instance.constructor.name !== instanceType) throw new Error(`
            Must provide '${instanceType}' instancetype for '${instanceName}' Argument`
        );
    },

    /**
     * Used to check if an instancetype of instances in a `array` are equal to the specified `instanceType`.
     * If not a error is thrown.
     * 
     * The `instanceNames` array is used to specify which argument was provided the incorrect instancetype. Ensure that the instance 
     * and instance name are in the same index in their array.
     * 
     * Example:
     * 
     *      function combineItems(item1, item2) {
     *          validator.checkInstanceTypeArray([item1, item2], ["item1", "item2"], "Item");
     *          // ...
     *      }
     * 
     * @param {Array<InstanceType<*>>} instances an array of instances that will all be check are the correct instancetype
     * @param {Array<String>} instanceNames an array of names for the instances in the `instances` array
     * @param {String} instanceType the instancetype the `instances` must be
     */
    checkInstanceTypeArray: function (instances, instanceNames, instanceType) {
        if (instances.length !== instanceNames.length) throw new Error("Amount of instances and instance names must be equal");

        for (let i = 0; i < instances.length; i++) {
            this.checkInstanceType(instances[i], instanceNames[i], instanceType);
        }
    },

    /**
     * Used to check the super class name of a `instance` is equal to the specified `superClass`.
     * If not a error is thrown.
     * 
     * It does this by calling a getter method: `getSuper`, (which you will have to define in your super classes)
     * to retrieve the name of the super class.
     * 
     * Use npm package `SuperClass` here: https://www.npmjs.com/package/@mitchell-collins/superclass
     * 
     * Which is used to create a super class giving the attrbute super along with getter and setter methods 
     * which holds the name of the super class.
     * 
     * `instanceName` is used to specify which argument was provided the incorrect child instancetype of a super class.
     * 
     * @param {InstanceType<*>} instance a instance that will be check if it is the instance of the correct super class
     * @param {String} instanceName the name of the `instance`
     * @param {String} superClass the super class the `instance` must be an instance of
     */
    checkSuperClass: function (instance, instanceName, superClass) {
        if (instance.getSuper() !== superClass) throw new Error(
            `Must provide instancetype that is a child of '${superClass}' Superclass for '${instanceName}' Argument`
        );
    },

    /**
     * Used to check the super class name of intances in a `array` is equal to the specified `superClass`.
     * If not a error is thrown.
     * 
     * It does this by calling a getter method: `getSuper`, (which you will have to define in your super classes)
     * to retrieve the name of the super class.
     * 
     * Use npm package `SuperClass` here: https://www.npmjs.com/package/@mitchell-collins/superclass
     * 
     * Which is used to create a super class giving the attrbute super along with getter and setter methods 
     * which holds the name of the super class.
     * 
     * The `instanceNames` array is used to specify which argument was provided the incorrect child instancetype of a super class. 
     * Ensure that the instance and instance name are in the same index in their array.
     * 
     * Example:
     * 
     *      function combineItems(item1, item2) {
     *          validator.checkSuperClassArray([item1, item2], ["item1", "item2"], "Item");
     *          // ...
     *      }
     * 
     * @param {Array<InstanceType<*>>} instances an array of instances that will all be check are the instance of the correct super class
     * @param {Array<String>} instanceNames an array of names for the instances in the `instances` array
     * @param {String} superClass the super class the `instances` must be the instance of
     */
    checkSuperClassArray: function (instances, instanceNames, superClass) {
        if (instances.length !== instanceNames.length) throw new Error("Amount of instances and instance names must be equal");

        for (let i = 0; i < instances.length; i++) {
            this.checkSuperClass(instances[i], instanceNames[i], superClass);
        }
    },

    /**
     * Used to check if the value of a variable is an array. If not a error is thrown.
     * 
     * `arrayName` is used to specify which argument was not provided a value of an array.
     * 
     * @param {*} array is a variable that is check if it has the value of an array
     * @param {String} arrayName the name of the `array` that is checked
     */
    checkIsArray: function (array, arrayName) {
        if (!Array.isArray(array)) throw new Error(`Must provide an array for '${arrayName}' Argument`);
    },

    /**
     * Used to check if a `array` has the required `targetLength`. If not a error is thrown.
     * 
     * `arrayName` is used to specify which argument was not provided an array that has the required `targetLength`.
     * 
     * @param {*} array an array that is check fulfills a required length
     * @param {String} arrayName the name of the `array`
     * @param {Int} targetLength the required length the `array` must be
     */
    checkArrayLength: function (array, arrayName, targetLength) {
        if (array.length !== targetLength) throw new Error(
            `Must provided an array of a length of ${targetLength} for '${arrayName}' Argument`
        );
    },

    /**
     * Used to check if a provided `index` is within the range of an `array`. If not a error is thrown.
     * 
     * `arrayName` is used to specify which array the provided `index` is out of range for.
     * 
     * @param {Array<*>} array the array that the `index` must be in range of
     * @param {String} arrayName the name of the `array`
     * @param {Int} index the provided index that must be in the range of `array`
     */
    checkIndexRange: function (array, arrayName, index) {
        if (index < 0 || index > array.length - 1) throw new Error(
            `Index was not in range of ${arrayName} array`
        );
    },

    /**
     * Used to check if every element of an `array` fulfills a `condition`. If not a error is thrown.
     * 
     * `arrayName` is used to specify which argument has an element that doesn't fufill a `condition`.
     * 
     * The `callback` function is used to test if a element fulfills a `condition`, the function must return true or false.
     * 
     * The `condition` is used to specify what the `condition` is that needs to be fulfilled.
     * 
     * Example:
     * 
     *      // creates a callback function to check if a student is at the correct age
     *      const checkAge = (studentAge) => studentAge >= 5 && studentAge <= 18;
     * 
     *      function enroleStudent(studentNames, studentAges) {
     *          validator.checkArrayElements(studentAges, "studentAges", checkAge, "Age must be between 5 - 18");
     *          // ...
     *      }
     * 
     * @param {Array<*>} array an array of elements that will be check if that fulfill a `condition`
     * @param {String} arrayName the name of the `array`
     * @param {Function} callback a callback function that checks if elements fulfill a condition
     * @param {String} condition the condition that the elements in the `array` must fulfill
     */
    checkArrayElements: function (array, arrayName, callback, condition) {
        array.forEach((element, index) => {
            // calls provided callback function passing in each element of an array
            // checks if the element doesn't fulfill a condition that is checked in the callback function
            if (!callback(element)) throw new Error(
                `Element at index ${index} of array argument '${arrayName}' doesn't fulfill condition: ${condition}`
            );
        });
    },

    /**
     * Used to check if a provided `object` fulfills the required `structure`. If not a error is thown.
     * 
     * `objectName` is used to specify which `object` argument didn't fulfill the required `structure`.
     * 
     * `structure` is used to define the required structure of the provided `object`. It determines the required properties and what 
     * datatypes those properties require.
     * 
     * When defining the datatype of a property you will have to get the constructor of that type and set it as a new instance 
     * of that constructor. When defining a string datatype you have to define it as `new String`.
     * 
     * If you want to define the value of a property to be anything then assign the value: "*" to the property on the structure object.
     * 
     * If you want to define the value of a property as a constructor then you can just define it like: `{property}: {constructor}`
     * 
     * The differences of defining the value as a constructor to a instance is when defining an instance you use the new keyword, also 
     * if defining an instance and the constructor required arguments you will have to provided them, the value can be anything as 
     * long as it is the correct datatype.
     * 
     * Example:
     * 
     *      // creates constructors
     *      class Hobbie {
     *          constructor(name) {
     *              this.name = name;
     *          }
     *      }
     * 
     *      class Money {
     *          constructor(amount) {
     *              this.amount = amount;
     *          }
     *      }
     * 
     *      function findPerson(person) {
     *          // checks structure of person object
     *          validator.checkObjectStructure(person, "person", {
     *              name: new String,
     *              age: new Number,
     *              friends: new Array,
     *              hair: {
     *                  color: new String
     *              },
     *              hobbie: new Hobbie("name"),
     *              makeMoney: Money
     *          });
     *          // ...
     *      }
     * 
     *      findPerson(
     *          {
     *              name: "Jack",
     *              age: 30,
     *              friends: ["John", "Ben"],
     *              hair: {
     *                  color: "black"
     *              },
     *              hobbie: new Hobbie("tennis"),
     *              makeMoney: Money
     *          }
     *      );
     * 
     * @param {object} object a object that will be check if it fulfills required `structure`
     * @param {String} objectName the name of the `object`
     * @param {object} structure the structure that the `object` must fulfill
     */
    checkObjectStructure: function (object, objectName, structure) {
        // loops through each property of the object
        Object.entries(object).forEach(([key, value]) => {

            // checks if property in object is in the specified strucuture
            if (!structure[key]) throw new Error(
                `'${objectName}' object argument was provided a property '${key}' which violates the required structure`
            );

            // gets the required value that is set to the property in the structure
            const structureValue = structure[key];
            
            // checks if the value of property can be anything
            if (structureValue === "*") {}

            // checks if property is array and required structure isn't
            else if (Array.isArray(value)) {
                if (!Array.isArray(structureValue)) throw new Error(
                    `'${objectName}' object argument was provided for property '${key}' an array value which violates the required 
                    structure`
                );
            }
            
            // checks if structure required value of an array but property wasn't provided a value of array
            else if (!Array.isArray(value) && Array.isArray(structureValue)) throw new Error(
                `'${objectName}' object argument must be provided for property '${key}' an array`
            );

            // check if property is a object
            // if so loops through that object by calling this function
            else if (typeof value === "object" && typeof structureValue === "object") this.checkObjectStructure(
                object[key], `${objectName}.${key}`, structureValue
            );

            // checks if the required value is a constructor and that the provided value isn't the required constructor
            else if (structureValue.constructor.name === "Function" && value.name !== structureValue.name) throw new Error(
                `'${objectName}' object argument is required to be provided for property '${key}' the value of '${structureValue.name}' constructor`
            );

            // checks if the required value is a instance and if the provided value is the correct instance type
            else if (structureValue.constructor.name !== "Function" && structureValue.constructor.name !== value.constructor.name) throw new Error(
                `'${objectName}' object argument is required to be provided for property '${key}' the value of an instance of the 
                '${structureValue.constructor.name}' constructor`
            );
        });

        // loops through each property of the structure 
        // to find if the object is missing a property that is required
        Object.entries(structure).forEach(([key]) => {
            // checks if object doesn't have required property
            if (!Object.hasOwn(object, key)) throw new Error(`'${objectName}' object argument missing required property '${key}'`);
        });
    },

    /**
     * Used to loop through provided array `objects` to check if objects fulfills the required `structure`. If not a error is thown.
     * 
     * `objectNames` is used to specify which `object` argument didn't fulfill the required `structure`.
     * 
     * `structure` is used to define the required structure of the provided `object`. It determines the required properties and what 
     * datatypes those properties require.
     * 
     * When defining the datatype of a property you will have to get the constructor of that type and set it as a new instance 
     * of that constructor. When defining a string datatype you have to define it as `new String`.
     * 
     * If you want to define the value of a property to be anything then assign the value: "*" to the property on the structure object.
     * 
     * If you want to define the value of a property as a constructor then you can just define it like: `{property}: {constructor}`
     * 
     * The differences of defining the value as a constructor to a instance is when defining an instance you use the new keyword, also 
     * if defining an instance and the constructor required arguments you will have to provided them, the value can be anything as 
     * long as it is the correct datatype.
     * 
     * Example:
     * 
     *      // creates constructors
     *      class Hobbie {
     *          constructor(name) {
     *              this.name = name;
     *          }
     *      }
     * 
     *      class Money {
     *          constructor(amount) {
     *              this.amount = amount;
     *          }
     *      }
     * 
     *      function findPeople(people) {
     *          // checks structure of person object
     *          validator.checkObjectStructureArray(people, "people", {
     *              name: new String,
     *              age: new Number,
     *              friends: new Array,
     *              hair: {
     *                  color: new String
     *              },
     *              hobbie: new Hobbie("name"),
     *              makeMoney: Money
     *          });
     *          // ...
     *      }
     * 
     *      findPeople([
     *          {
     *              name: "Jack",
     *              age: 30,
     *              friends: ["John", "Ben"],
     *              hair: {
     *                  color: "black"
     *              },
     *              hobbie: new Hobbie("tennis"),
     *              makeMoney: Money
     *          },
     *          {
     *              name: "Henry",
     *              age: 42,
     *              friends: ["Steve", "Ken"],
     *              hair: {
     *                  color: "brown"
     *              },
     *              hobbie: new Hobbie("football"),
     *              makeMoney: Money
     *          }
     *      ]);
     * 
     * @param {Array<object>} objects an array of objects that will be check if they fulfill a required `structure`
     * @param {Array<String>} objectNames an array of names for the objects in the `objects` array
     * @param {object} structure the required structure the `objects` must fulfill
     */
    checkObjectStructureArray: function (objects, objectNames, structure) {
        if (objects.length !== objectNames.length) throw new Error("Amount of objects and object names must be equal");
        
        for (let i = 0; i < objects.length; i++) {
            this.checkObjectStructure(objects[i], objectNames[i], structure);
        }
    },

    /**
     * Checks if the value of `variable` is a http status code. If not a error is thrown.
     * 
     * `variableName` is used to define which variable didn't have the value of a http status code.
     * 
     * @param {*} variable the variable that will be check if it has the value of a http status code
     * @param {String} variableName the name of the `variable`
     */
    checkIsHttpStatusCode(variable, variableName) {
        if (!Object.values(StatusCodes).includes(variable)) throw new Error(
            `Must provided value of Http status code for argument '${variableName}'`
        );
    },

    /**
     * Checks if a `variable` has the value of an `enumObject`. If not a error is thrown.
     * 
     * `enumName` and `variableName` are used to define which variable must have a value of which enum.
     * @param {Enumerator} enumObject an enum which the `variable` must have a value of one of its constants
     * @param {String} enumName the name of the `enumObject`
     * @param {*} variable the variable that will be check if it has the value of the `enumObject`
     * @param {String} variableName the name of the `variable`
     */
    checkEnumValue(enumObject, enumName, variable, variableName) {
        if (!Object.values(enumObject).includes(variable)) throw new Error(
            `Must provided a value of enum '${enumName}' for argument '${variableName}'`
        );
    }
}

export default validator;