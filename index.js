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
     * @param {*} variable 
     * @param {String} variableName
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
     * @param {Array<*>} variables
     * @param {Array<String>} variableNames 
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
     * @param {*} variable 
     * @param {String} variableName
     * @param {String} dataType 
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
     * @param {Array<*>} variables 
     * @param {Array<String>} variableNames
     * @param {String} dataType 
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
     * @param {InstanceType<*>} instance 
     * @param {String} instanceName
     * @param {String} instanceType 
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
     * @param {Array<InstanceType<*>>} instances 
     * @param {Array<String>} instanceNames
     * @param {String} instanceType 
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
     * @param {InstanceType<*>} instance 
     * @param {String} instanceName
     * @param {String} superClass 
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
     * @param {Array<InstanceType<*>>} instances 
     * @param {Array<String>} instanceNames
     * @param {String} superClass 
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
     * @param {*} array 
     * @param {String} arrayName 
     */
    checkIsArray: function (array, arrayName) {
        if (!Array.isArray(array)) throw new Error(`Must provide an array for '${arrayName}' Argument`);
    },

    /**
     * Used to check if a `array` has the required `targetLength`. If not a error is thrown.
     * 
     * `arrayName` is used to specify which argument was not provided an array that has the required `targetLength`.
     * 
     * @param {*} array 
     * @param {String} arrayName 
     * @param {Int} targetLength 
     */
    checkArrayLength: function (array, arrayName, targetLength) {
        if (array.length !== targetLength) throw new Error(
            `Must provided an array of a length of ${targetLength} for '${arrayName}' Argument`
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
     * @param {Array<*>} array 
     * @param {String} arrayName 
     * @param {CallableFunction} callback 
     * @param {String} condition 
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
     * @param {object} object 
     * @param {String} objectName 
     * @param {object} structure 
     */
    checkObjectStructure: function (object, objectName, structure) {
        // loops through each property of the object
        Object.entries(object).forEach(([key, value]) => {

            // checks if property in object is in the specified strucuture
            if (!structure[key]) throw new Error(
                `'${objectName}' object argument was provided a property '${key}' which violates the required structure`
            );

            // if the datatype must be string then the structureValue holds the value [Function: String]
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
            else if (!Array.isArray(value)) {
                if (Array.isArray(structureValue)) throw new Error(
                    `'${objectName}' object argument must be provided for property '${key}' an array`
                );
            }

            // check if property is a object
            // if so it loops through that object by calling this function
            else if (typeof value === "object" && typeof structureValue === "object") this.checkObjectStructure(
                object[key], `${objectName}.${key}`, structureValue
            );

            // checks if value is a instance or constructor
            else if (value.constructor) {

                // checks if the required value is a constructor and that the provided value isn't the constructor
                if (structureValue.constructor.name === "Function" && value.name !== structureValue.name) throw new Error(
                    `'${objectName}' object argument is required to be provided the value of '${structureValue.name}' constructor`
                );

                // checks if the property value is the correct instance type
                if (structureValue.constructor.name !== value.constructor.name) throw new Error(
                    `
                    '${objectName}.${key}' object argument is required to be provided the value of an instance of the 
                    '${structureValue.constructor.name}' constructor
                    `
                );
            }

            // checks if the value of property is the correct datatype specified in structure
            // to check if it is the correct datatype of get the name of the structureValue and convert it to lower case
            else if (typeof value !== structureValue.name.toLowerCase()) throw new Error(
                `'${objectName}' object argument was provided a datatype of ${typeof value} for property '${key}' which violates the 
                required structure`
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
     * @param {Array<object>} objects 
     * @param {Array<String>} objectNames 
     * @param {object} structure 
     */
    checkObjectStructureArray: function (objects, objectNames, structure) {
        if (objects.length !== objectNames.length) throw new Error("Amount of objects and object names must be equal");
        
        for (let i = 0; i < objects.length; i++) {
            this.checkObjectStructure(objects[i], objectNames[i], structure);
        }
    }
}

export default validator;