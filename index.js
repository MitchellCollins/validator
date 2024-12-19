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
        if (variable === undefined) throw new Error(variableName + " Argument left Undefined");
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
        if (typeof variable !== dataType) throw new Error(`Must provide ${dataType} datatype for ${variableName} Argument`);
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
            Must provide ${instanceType} instancetype for ${instanceName} Argument`
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
            `Must provide instancetype that is a child of ${superClass} Superclass for ${instanceName} Argument`
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
    }
}

export default validator;