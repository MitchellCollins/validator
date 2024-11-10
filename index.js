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
 *      function squareNumber(number) {
 *          validator.checkUndefined(number);
 *          validator.checkDataType(number, "number");
 *          return number * number;
 *      }
 * 
 *      function addNumbers(num1, num2) {
 *          validator.checkUndefinedArray([num1, num2]);
 *          validator.checkDataTypeArray([num1, num2], "number");
 *          return num1 + num2;
 *      }
 */
const validator = {

    /**
     * Used to check if a `variable` is undefined. If so a error is thrown.
     * @param {*} variable 
     */
    checkUndefined: function (variable) {
        if (variable === undefined) throw new Error("Argument left undefined");
    },

    /**
     * Used to check variables in an `array` if they are undefined. If so a error is thrown.
     * @param {Array<*>} array 
     */
    checkUndefinedArray: function (array) {
        array.forEach((element) => {
            this.checkUndefined(element);
        });
    },

    /**
     * Used to check if the datetype of a `variable` is equal to the specified `dataType`.
     * If not a error is thrown.
     * @param {*} variable 
     * @param {String} dataType 
     */
    checkDataType: function (variable, dataType) {
        if (typeof variable !== dataType) throw new Error("Incorrect DataType for Argument");
    },

    /**
     * Used to check if the dataype of variables in a `array` are equal to the specified `datatype`.
     * If not a error is thrown.
     * @param {Array<*>} array 
     * @param {String} dataType 
     */
    checkDataTypeArray: function (array, dataType) {
        array.forEach((element) => {
            this.checkDataType(element, dataType);
        });
    },

    /**
     * Used to check if the instancetype of a `instance` is equal to specified `instanceType`.
     * If not a error is thrown.
     * @param {InstanceType<*>} instance 
     * @param {String} instanceType 
     */
    checkInstanceType: function (instance, instanceType) {
        if (instance.constructor.name !== instanceType) throw new Error("Incorrect InstanceType for Argument");
    },

    /**
     * Used to check if an instancetype of instances in a `array` are equal to the specified `instanceType`.
     * If not a error is thrown.
     * @param {Array<InstanceType<*>>} array 
     * @param {String} instanceType 
     */
    checkInstanceTypeArray: function (array, instanceType) {
        array.forEach((element) => {
            this.checkInstanceType(element, instanceType);
        });
    },

    /**
     * Used to check the super class name of a `instance` is equal to the specified `superClass`.
     * If not a error is thrown.
     * 
     * It does this by calling a getter method: `getSuper`, (which you will have to define in your super classes)
     * to retrieve the name of the super class.
     * 
     * Use npm package `SuperClass` here: {insert npm link}
     * 
     * Which is used to create a super class giving the attrbute super along with getter and setter methods 
     * which holds the name of the super class.
     * @param {InstanceType<*>} instance 
     * @param {String} superClass 
     */
    checkSuperClass: function (instance, superClass) {
        if (instance.getSuper() !== superClass) throw new Error(
            "Instance is a Child of the Incorrect Super Class for Argument"
        );
    },

    /**
     * Used to check the super class name of intances in a `array` is equal to the specified `superClass`.
     * If not a error is thrown.
     * 
     * It does this by calling a getter method: `getSuper`, (which you will have to define in your super classes)
     * to retrieve the name of the super class.
     * 
     * Use npm package `SuperClass` here: {insert npm link}
     * 
     * Which is used to create a super class giving the attrbute super along with getter and setter methods 
     * which holds the name of the super class.
     * @param {Array<InstanceType<*>>} array 
     * @param {String} superClass 
     */
    checkSuperClassArray: function (array, superClass) {
        array.forEach((element) => {
            this.checkSuperClass(element, superClass);
        });
    }
}

export default validator;