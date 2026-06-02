/**
 * exp4j TypeScript Bundle
 * All modules combined in dependency order
 */
/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
var net;
(function (net) {
    var objecthunter;
    (function (objecthunter) {
        var exp4j;
        (function (exp4j) {
            /**
             * Simple double stack using an array as data storage.
             */
            class ArrayStack {
                constructor(initialCapacity = 5) {
                    if (initialCapacity <= 0) {
                        throw new Error("Stack's capacity must be positive");
                    }
                    this.data = new Array(initialCapacity).fill(0);
                    this.idx = -1;
                }
                push(value) {
                    if (this.idx + 1 === this.data.length) {
                        const nextLength = (this.data.length * 1.2 | 0) + 1;
                        const temp = new Array(nextLength).fill(0);
                        for (let i = 0; i < this.data.length; i++) {
                            temp[i] = this.data[i];
                        }
                        this.data = temp;
                    }
                    this.data[++this.idx] = value;
                }
                peek() {
                    if (this.idx === -1) {
                        throw new Error("Stack is empty");
                    }
                    return this.data[this.idx];
                }
                pop() {
                    if (this.idx === -1) {
                        throw new Error("Stack is empty");
                    }
                    return this.data[this.idx--];
                }
                isEmpty() {
                    return this.idx === -1;
                }
                size() {
                    return this.idx + 1;
                }
            }
            exp4j.ArrayStack = ArrayStack;
        })(exp4j = objecthunter.exp4j || (objecthunter.exp4j = {}));
    })(objecthunter = net.objecthunter || (net.objecthunter = {}));
})(net || (net = {}));
//# sourceMappingURL=ArrayStack.js.map/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
var net;
(function (net) {
    var objecthunter;
    (function (objecthunter) {
        var exp4j;
        (function (exp4j) {
            /**
             * Create a new instance
             * @param {boolean} valid Whether the validation of the expression was successful
             * @param {java.lang.String[]} errors The array of errors returned if the validation was unsuccessful
             * @class
             */
            class ValidationResult {
                constructor(valid, errors) {
                    this.valid = valid;
                    this.errors = errors == null ? null : ValidationResult.copy(errors);
                }
                /*private*/ static copy(source) {
                    return source.slice();
                }
                /**
                 * Check if an expression has been validated successfully
                 * @return {boolean} true if the validation was successful, false otherwise
                 */
                isValid() {
                    return this.valid;
                }
                /**
                 * Get the list of errors describing the issues while validating the expression
                 * @return {java.lang.String[]} The array of errors
                 */
                getErrors() {
                    return this.errors == null ? null : ValidationResult.copy(this.errors);
                }
                // Backward-compatible helper for old JSweet call sites.
                static SUCCESS_$LI$() {
                    return ValidationResult.SUCCESS;
                }
            }
            /**
             * A static class representing a successful validation result
             */
            ValidationResult.SUCCESS = new ValidationResult(true, null);
            exp4j.ValidationResult = ValidationResult;
        })(exp4j = objecthunter.exp4j || (objecthunter.exp4j = {}));
    })(objecthunter = net.objecthunter || (net.objecthunter = {}));
})(net || (net = {}));
//# sourceMappingURL=ValidationResult.js.map/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
var net;
(function (net) {
    var objecthunter;
    (function (objecthunter) {
        var exp4j;
        (function (exp4j) {
            var func;
            (function (func) {
                /**
                 * A class representing a Function which can be used in an expression.
                 */
                class _Function {
                    constructor(name, numArguments = 1) {
                        if (numArguments < 0) {
                            throw new Error("The number of function arguments can not be less than 0 for '" + name + "'");
                        }
                        if (!_Function.isValidFunctionName(name)) {
                            throw new Error("The function name '" + name + "' is invalid");
                        }
                        this.name = name;
                        this.numArguments = numArguments;
                    }
                    getName() {
                        return this.name;
                    }
                    getNumArguments() {
                        return this.numArguments;
                    }
                    static isValidFunctionName(name) {
                        if (name == null) {
                            return false;
                        }
                        return name.length > 0;
                    }
                }
                func._Function = _Function;
            })(func = exp4j.func || (exp4j.func = {}));
        })(exp4j = objecthunter.exp4j || (objecthunter.exp4j = {}));
    })(objecthunter = net.objecthunter || (net.objecthunter = {}));
})(net || (net = {}));
//# sourceMappingURL=_Function.js.map/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
var net;
(function (net) {
    var objecthunter;
    (function (objecthunter) {
        var exp4j;
        (function (exp4j) {
            var func;
            (function (func) {
                /**
                 * Class representing the builtin functions available for use in expressions
                 * @class
                 */
                class Functions {
                    /**
                     * Get the builtin function for a given name
                     *
                     * @param {string} name te name of the function
                     * @return {net.objecthunter.exp4j.func._Function} a Function instance
                     */
                    static getBuiltinFunction(name) {
                        switch ((name)) {
                            case "sin":
                                return Functions.BUILT_IN_FUNCTIONS[Functions.INDEX_SIN];
                            case "cos":
                                return Functions.BUILT_IN_FUNCTIONS[Functions.INDEX_COS];
                            case "tan":
                                return Functions.BUILT_IN_FUNCTIONS[Functions.INDEX_TAN];
                            case "cot":
                                return Functions.BUILT_IN_FUNCTIONS[Functions.INDEX_COT];
                            case "asin":
                                return Functions.BUILT_IN_FUNCTIONS[Functions.INDEX_ASIN];
                            case "acos":
                                return Functions.BUILT_IN_FUNCTIONS[Functions.INDEX_ACOS];
                            case "atan":
                                return Functions.BUILT_IN_FUNCTIONS[Functions.INDEX_ATAN];
                            case "sinh":
                                return Functions.BUILT_IN_FUNCTIONS[Functions.INDEX_SINH];
                            case "cosh":
                                return Functions.BUILT_IN_FUNCTIONS[Functions.INDEX_COSH];
                            case "tanh":
                                return Functions.BUILT_IN_FUNCTIONS[Functions.INDEX_TANH];
                            case "abs":
                                return Functions.BUILT_IN_FUNCTIONS[Functions.INDEX_ABS];
                            case "log":
                                return Functions.BUILT_IN_FUNCTIONS[Functions.INDEX_LOG];
                            case "log10":
                                return Functions.BUILT_IN_FUNCTIONS[Functions.INDEX_LOG10];
                            case "log2":
                                return Functions.BUILT_IN_FUNCTIONS[Functions.INDEX_LOG2];
                            case "log1p":
                                return Functions.BUILT_IN_FUNCTIONS[Functions.INDEX_LOG1P];
                            case "ceil":
                                return Functions.BUILT_IN_FUNCTIONS[Functions.INDEX_CEIL];
                            case "floor":
                                return Functions.BUILT_IN_FUNCTIONS[Functions.INDEX_FLOOR];
                            case "sqrt":
                                return Functions.BUILT_IN_FUNCTIONS[Functions.INDEX_SQRT];
                            case "cbrt":
                                return Functions.BUILT_IN_FUNCTIONS[Functions.INDEX_CBRT];
                            case "pow":
                                return Functions.BUILT_IN_FUNCTIONS[Functions.INDEX_POW];
                            case "exp":
                                return Functions.BUILT_IN_FUNCTIONS[Functions.INDEX_EXP];
                            case "expm1":
                                return Functions.BUILT_IN_FUNCTIONS[Functions.INDEX_EXPM1];
                            case "signum":
                                return Functions.BUILT_IN_FUNCTIONS[Functions.INDEX_SGN];
                            case "csc":
                                return Functions.BUILT_IN_FUNCTIONS[Functions.INDEX_CSC];
                            case "sec":
                                return Functions.BUILT_IN_FUNCTIONS[Functions.INDEX_SEC];
                            case "csch":
                                return Functions.BUILT_IN_FUNCTIONS[Functions.INDEX_CSCH];
                            case "sech":
                                return Functions.BUILT_IN_FUNCTIONS[Functions.INDEX_SECH];
                            case "coth":
                                return Functions.BUILT_IN_FUNCTIONS[Functions.INDEX_COTH];
                            case "toradian":
                                return Functions.BUILT_IN_FUNCTIONS[Functions.INDEX_TO_RADIAN];
                            case "todegree":
                                return Functions.BUILT_IN_FUNCTIONS[Functions.INDEX_TO_DEGREE];
                            case "min":
                                return Functions.BUILT_IN_FUNCTIONS[Functions.INDEX_MIN];
                            case "max":
                                return Functions.BUILT_IN_FUNCTIONS[Functions.INDEX_MAX];
                            case "if":
                                return Functions.BUILT_IN_FUNCTIONS[Functions.INDEX_IF];
                            default:
                                return null;
                        }
                    }
                }
                Functions.INDEX_SIN = 0;
                Functions.INDEX_COS = 1;
                Functions.INDEX_TAN = 2;
                Functions.INDEX_CSC = 3;
                Functions.INDEX_SEC = 4;
                Functions.INDEX_COT = 5;
                Functions.INDEX_SINH = 6;
                Functions.INDEX_COSH = 7;
                Functions.INDEX_TANH = 8;
                Functions.INDEX_CSCH = 9;
                Functions.INDEX_SECH = 10;
                Functions.INDEX_COTH = 11;
                Functions.INDEX_ASIN = 12;
                Functions.INDEX_ACOS = 13;
                Functions.INDEX_ATAN = 14;
                Functions.INDEX_SQRT = 15;
                Functions.INDEX_CBRT = 16;
                Functions.INDEX_ABS = 17;
                Functions.INDEX_CEIL = 18;
                Functions.INDEX_FLOOR = 19;
                Functions.INDEX_POW = 20;
                Functions.INDEX_EXP = 21;
                Functions.INDEX_EXPM1 = 22;
                Functions.INDEX_LOG10 = 23;
                Functions.INDEX_LOG2 = 24;
                Functions.INDEX_LOG = 25;
                Functions.INDEX_LOG1P = 26;
                Functions.INDEX_LOGB = 27;
                Functions.INDEX_SGN = 28;
                Functions.INDEX_TO_RADIAN = 29;
                Functions.INDEX_TO_DEGREE = 30;
                Functions.INDEX_MIN = 31;
                Functions.INDEX_MAX = 32;
                Functions.INDEX_IF = 33;
                Functions.BUILT_IN_FUNCTIONS = (() => {
                    const funcs = new Array(34);
                    // Trigonometric functions
                    funcs[Functions.INDEX_SIN] = new class extends func._Function {
                        constructor() { super("sin"); }
                        apply(...args) { return Math.sin(args[0]); }
                    }();
                    funcs[Functions.INDEX_COS] = new class extends func._Function {
                        constructor() { super("cos"); }
                        apply(...args) { return Math.cos(args[0]); }
                    }();
                    funcs[Functions.INDEX_TAN] = new class extends func._Function {
                        constructor() { super("tan"); }
                        apply(...args) { return Math.tan(args[0]); }
                    }();
                    funcs[Functions.INDEX_COT] = new class extends func._Function {
                        constructor() { super("cot"); }
                        apply(...args) { const tan = Math.tan(args[0]); if (tan === 0.0)
                            throw new Error("Division by zero in cotangent!"); return 1.0 / tan; }
                    }();
                    funcs[Functions.INDEX_ASIN] = new class extends func._Function {
                        constructor() { super("asin"); }
                        apply(...args) { return Math.asin(args[0]); }
                    }();
                    funcs[Functions.INDEX_ACOS] = new class extends func._Function {
                        constructor() { super("acos"); }
                        apply(...args) { return Math.acos(args[0]); }
                    }();
                    funcs[Functions.INDEX_ATAN] = new class extends func._Function {
                        constructor() { super("atan"); }
                        apply(...args) { return Math.atan(args[0]); }
                    }();
                    // Hyperbolic functions
                    funcs[Functions.INDEX_SINH] = new class extends func._Function {
                        constructor() { super("sinh"); }
                        apply(...args) { return (Math.exp(args[0]) - Math.exp(-args[0])) / 2; }
                    }();
                    funcs[Functions.INDEX_COSH] = new class extends func._Function {
                        constructor() { super("cosh"); }
                        apply(...args) { return (Math.exp(args[0]) + Math.exp(-args[0])) / 2; }
                    }();
                    funcs[Functions.INDEX_TANH] = new class extends func._Function {
                        constructor() { super("tanh"); }
                        apply(...args) { const ex = Math.exp(args[0]); return (ex - ex) / (ex + ex); }
                    }();
                    // Reciprocal trigonometric functions
                    funcs[Functions.INDEX_CSC] = new class extends func._Function {
                        constructor() { super("csc"); }
                        apply(...args) { const sin = Math.sin(args[0]); if (sin === 0.0)
                            throw new Error("Division by zero in cosecant!"); return 1.0 / sin; }
                    }();
                    funcs[Functions.INDEX_SEC] = new class extends func._Function {
                        constructor() { super("sec"); }
                        apply(...args) { const cos = Math.cos(args[0]); if (cos === 0.0)
                            throw new Error("Division by zero in secant!"); return 1.0 / cos; }
                    }();
                    funcs[Functions.INDEX_CSCH] = new class extends func._Function {
                        constructor() { super("csch"); }
                        apply(...args) { if (args[0] === 0.0)
                            return 0; return 1.0 / ((Math.exp(args[0]) - Math.exp(-args[0])) / 2); }
                    }();
                    funcs[Functions.INDEX_SECH] = new class extends func._Function {
                        constructor() { super("sech"); }
                        apply(...args) { return 1.0 / ((Math.exp(args[0]) + Math.exp(-args[0])) / 2); }
                    }();
                    funcs[Functions.INDEX_COTH] = new class extends func._Function {
                        constructor() { super("coth"); }
                        apply(...args) { return ((Math.exp(args[0]) + Math.exp(-args[0])) / 2) / ((Math.exp(args[0]) - Math.exp(-args[0])) / 2); }
                    }();
                    // Logarithmic functions
                    funcs[Functions.INDEX_LOG] = new class extends func._Function {
                        constructor() { super("log"); }
                        apply(...args) { return Math.log(args[0]); }
                    }();
                    funcs[Functions.INDEX_LOG2] = new class extends func._Function {
                        constructor() { super("log2"); }
                        apply(...args) { return Math.log(args[0]) / Math.log(2.0); }
                    }();
                    funcs[Functions.INDEX_LOG10] = new class extends func._Function {
                        constructor() { super("log10"); }
                        apply(...args) { return Math.log(args[0]) * Math.LOG10E; }
                    }();
                    funcs[Functions.INDEX_LOG1P] = new class extends func._Function {
                        constructor() { super("log1p"); }
                        apply(...args) { return Math.log(args[0] + 1); }
                    }();
                    funcs[Functions.INDEX_LOGB] = new class extends func._Function {
                        constructor() { super("logb", 2); }
                        apply(...args) { return Math.log(args[1]) / Math.log(args[0]); }
                    }();
                    // Basic math functions
                    funcs[Functions.INDEX_ABS] = new class extends func._Function {
                        constructor() { super("abs"); }
                        apply(...args) { return Math.abs(args[0]); }
                    }();
                    funcs[Functions.INDEX_CEIL] = new class extends func._Function {
                        constructor() { super("ceil"); }
                        apply(...args) { return Math.ceil(args[0]); }
                    }();
                    funcs[Functions.INDEX_FLOOR] = new class extends func._Function {
                        constructor() { super("floor"); }
                        apply(...args) { return Math.floor(args[0]); }
                    }();
                    funcs[Functions.INDEX_SQRT] = new class extends func._Function {
                        constructor() { super("sqrt"); }
                        apply(...args) { return Math.sqrt(args[0]); }
                    }();
                    funcs[Functions.INDEX_CBRT] = new class extends func._Function {
                        constructor() { super("cbrt"); }
                        apply(...args) { return Math.pow(args[0], 1 / 3); }
                    }();
                    funcs[Functions.INDEX_POW] = new class extends func._Function {
                        constructor() { super("pow", 2); }
                        apply(...args) { return Math.pow(args[0], args[1]); }
                    }();
                    funcs[Functions.INDEX_EXP] = new class extends func._Function {
                        constructor() { super("exp", 1); }
                        apply(...args) { return Math.exp(args[0]); }
                    }();
                    funcs[Functions.INDEX_EXPM1] = new class extends func._Function {
                        constructor() { super("expm1", 1); }
                        apply(...args) { return Math.exp(args[0]) - 1; }
                    }();
                    funcs[Functions.INDEX_SGN] = new class extends func._Function {
                        constructor() { super("signum", 1); }
                        apply(...args) { return args[0] > 0 ? 1 : args[0] < 0 ? -1 : 0; }
                    }();
                    // Angle conversion
                    funcs[Functions.INDEX_TO_RADIAN] = new class extends func._Function {
                        constructor() { super("toradian"); }
                        apply(...args) { return args[0] * Math.PI / 180; }
                    }();
                    funcs[Functions.INDEX_TO_DEGREE] = new class extends func._Function {
                        constructor() { super("todegree"); }
                        apply(...args) { return args[0] * 180 / Math.PI; }
                    }();
                    // Utility functions
                    funcs[Functions.INDEX_MIN] = new class extends func._Function {
                        constructor() { super("min", 2); }
                        apply(...args) { return Math.min(args[0], args[1]); }
                    }();
                    funcs[Functions.INDEX_MAX] = new class extends func._Function {
                        constructor() { super("max", 2); }
                        apply(...args) { return Math.max(args[0], args[1]); }
                    }();
                    funcs[Functions.INDEX_IF] = new class extends func._Function {
                        constructor() { super("if", 3); }
                        apply(...args) { return args[0] !== 0 ? args[1] : args[2]; }
                    }();
                    return funcs;
                })();
                func.Functions = Functions;
            })(func = exp4j.func || (exp4j.func = {}));
        })(exp4j = objecthunter.exp4j || (objecthunter.exp4j = {}));
    })(objecthunter = net.objecthunter || (net.objecthunter = {}));
})(net || (net = {}));
//# sourceMappingURL=Functions.js.map/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
var net;
(function (net) {
    var objecthunter;
    (function (objecthunter) {
        var exp4j;
        (function (exp4j) {
            var operator;
            (function (operator) {
                /**
                 * Create a new operator for use in expressions
                 *
                 * @param {string} symbol           the symbol of the operator
                 * @param {number} numberOfOperands the number of operands the operator takes (1 or 2)
                 * @param {boolean} leftAssociative  set to true if the operator is left associative, false if it is right associative
                 * @param {number} precedence       the precedence value of the operator
                 * @class
                 */
                class Operator {
                    constructor(symbol, numberOfOperands, leftAssociative, precedence) {
                        this.numOperands = numberOfOperands;
                        this.leftAssociative = leftAssociative;
                        this.symbol = symbol;
                        this.precedence = precedence;
                    }
                    /**
                     * Check if a character is an allowed operator char
                     *
                     * @param {string} ch the char to check
                     * @return {boolean} true if the char is allowed an an operator symbol, false otherwise
                     */
                    static isAllowedOperatorChar(ch) {
                        for (const allowed of Operator.ALLOWED_OPERATOR_CHARS) {
                            if (ch.charCodeAt(0) === allowed.charCodeAt(0)) {
                                return true;
                            }
                        }
                        return false;
                    }
                    /**
                     * Check if the operator is left associative
                     *
                     * @return {boolean} true os the operator is left associative, false otherwise
                     */
                    isLeftAssociative() {
                        return this.leftAssociative;
                    }
                    /**
                     * Check the precedence value for the operator
                     *
                     * @return {number} the precedence value
                     */
                    getPrecedence() {
                        return this.precedence;
                    }
                    /**
                     * Get the operator symbol
                     *
                     * @return {string} the symbol
                     */
                    getSymbol() {
                        return this.symbol;
                    }
                    /**
                     * Get the number of operands
                     *
                     * @return {number} the number of operands
                     */
                    getNumOperands() {
                        return this.numOperands;
                    }
                }
                /**
                 * The precedence value for the logical operation |, &
                 */
                Operator.PRECEDENCE_LOGICAL = 50;
                /**
                 * The precedence value for the comparision operation like >, < and =
                 */
                Operator.PRECEDENCE_COMPARISION = 100;
                /**
                 * The precedence value for the addition operation
                 */
                Operator.PRECEDENCE_ADDITION = 500;
                /**
                 * The precedence value for the subtraction operation
                 */
                Operator.PRECEDENCE_SUBTRACTION = Operator.PRECEDENCE_ADDITION;
                /**
                 * The precedence value for the multiplication operation
                 */
                Operator.PRECEDENCE_MULTIPLICATION = 1000;
                /**
                 * The precedence value for the division operation
                 */
                Operator.PRECEDENCE_DIVISION = Operator.PRECEDENCE_MULTIPLICATION;
                /**
                 * The precedence value for the modulo operation
                 */
                Operator.PRECEDENCE_MODULO = Operator.PRECEDENCE_DIVISION;
                /**
                 * The precedence value for the power operation
                 */
                Operator.PRECEDENCE_POWER = 10000;
                /**
                 * The precedence value for the unary minus operation
                 */
                Operator.PRECEDENCE_UNARY_MINUS = 5000;
                /**
                 * The precedence value for the unary plus operation
                 */
                Operator.PRECEDENCE_UNARY_PLUS = Operator.PRECEDENCE_UNARY_MINUS;
                /**
                 * The precedence value for the logical not !
                 */
                Operator.PRECEDENCE_LOGICAL_NOT = 10000;
                /**
                 * The set of allowed operator chars
                 */
                Operator.ALLOWED_OPERATOR_CHARS = ['+', '-', '*', '/', '%', '^', '!', '#', '\u00a7', '$', '&', ';', ':', '~', '<', '>', '|', '=', '\u00f7', '\u221a', '\u221b', '\u2308', '\u230a'];
                operator.Operator = Operator;
            })(operator = exp4j.operator || (exp4j.operator = {}));
        })(exp4j = objecthunter.exp4j || (objecthunter.exp4j = {}));
    })(objecthunter = net.objecthunter || (net.objecthunter = {}));
})(net || (net = {}));
//# sourceMappingURL=Operator.js.map/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
var net;
(function (net) {
    var objecthunter;
    (function (objecthunter) {
        var exp4j;
        (function (exp4j) {
            var operator;
            (function (operator) {
                class Operators {
                    static getBuiltinOperator(symbol, numArguments) {
                        switch ((symbol).charCodeAt(0)) {
                            case 43 /* '+' */:
                                if (numArguments !== 1) {
                                    return Operators.BUILT_IN_OPERATORS[Operators.INDEX_ADDITION];
                                }
                                return Operators.BUILT_IN_OPERATORS[Operators.INDEX_UNARY_PLUS];
                            case 45 /* '-' */:
                                if (numArguments !== 1) {
                                    return Operators.BUILT_IN_OPERATORS[Operators.INDEX_SUBTRACTION];
                                }
                                return Operators.BUILT_IN_OPERATORS[Operators.INDEX_UNARY_MINUS];
                            case 42 /* '*' */:
                                return Operators.BUILT_IN_OPERATORS[Operators.INDEX_MULTIPLICATION];
                            case 247 /* '\u00f7' */:
                            case 47 /* '/' */:
                                return Operators.BUILT_IN_OPERATORS[Operators.INDEX_DIVISION];
                            case 94 /* '^' */:
                                return Operators.BUILT_IN_OPERATORS[Operators.INDEX_POWER];
                            case 37 /* '%' */:
                                return Operators.BUILT_IN_OPERATORS[Operators.INDEX_MODULO];
                            case 124 /* '|' */:
                                return Operators.BUILT_IN_OPERATORS[Operators.INDEX_LOGICAL_OR];
                            case 38 /* '&' */:
                                return Operators.BUILT_IN_OPERATORS[Operators.INDEX_LOGICAL_AND];
                            case 60 /* '<' */:
                                return Operators.BUILT_IN_OPERATORS[Operators.INDEX_LESS_THAN];
                            case 62 /* '>' */:
                                return Operators.BUILT_IN_OPERATORS[Operators.INDEX_GREATER_THAN];
                            case 61 /* '=' */:
                                return Operators.BUILT_IN_OPERATORS[Operators.INDEX_EQUAL_TO];
                            case 33 /* '!' */:
                                return Operators.BUILT_IN_OPERATORS[Operators.INDEX_LOGICAL_NOT];
                            default:
                                return null;
                        }
                    }
                    /*private*/ static approxEqual(a, b) {
                        return Math.abs(a - b) < Operators.EPSILON;
                    }
                }
                Operators.INDEX_LOGICAL_OR = 0;
                Operators.INDEX_LOGICAL_AND = 1;
                Operators.INDEX_EQUAL_TO = 2;
                Operators.INDEX_GREATER_THAN = 3;
                Operators.INDEX_LESS_THAN = 4;
                Operators.INDEX_ADDITION = 5;
                Operators.INDEX_SUBTRACTION = 6;
                Operators.INDEX_MULTIPLICATION = 7;
                Operators.INDEX_DIVISION = 8;
                Operators.INDEX_POWER = 9;
                Operators.INDEX_MODULO = 10;
                Operators.INDEX_UNARY_MINUS = 11;
                Operators.INDEX_UNARY_PLUS = 12;
                Operators.INDEX_LOGICAL_NOT = 13;
                Operators.BUILT_IN_OPERATORS = (() => {
                    const ops = new Array(14);
                    // Logical operators
                    ops[Operators.INDEX_LOGICAL_OR] = new class extends operator.Operator {
                        constructor() { super("|", 2, true, operator.Operator.PRECEDENCE_LOGICAL); }
                        apply(...args) { return (Operators.approxEqual(args[0], 0) && Operators.approxEqual(args[1], 0)) ? 0 : 1; }
                    }();
                    ops[Operators.INDEX_LOGICAL_AND] = new class extends operator.Operator {
                        constructor() { super("&", 2, true, operator.Operator.PRECEDENCE_LOGICAL); }
                        apply(...args) { return (Operators.approxEqual(args[0], 1) && Operators.approxEqual(args[1], 1)) ? 1 : 0; }
                    }();
                    ops[Operators.INDEX_LOGICAL_NOT] = new class extends operator.Operator {
                        constructor() { super("!", 1, false, operator.Operator.PRECEDENCE_LOGICAL_NOT); }
                        apply(...args) { return args[0] === 0 ? 1 : 0; }
                    }();
                    // Comparison operators
                    ops[Operators.INDEX_EQUAL_TO] = new class extends operator.Operator {
                        constructor() { super("=", 2, true, operator.Operator.PRECEDENCE_COMPARISION); }
                        apply(...args) { return Operators.approxEqual(args[0], args[1]) ? 1 : 0; }
                    }();
                    ops[Operators.INDEX_GREATER_THAN] = new class extends operator.Operator {
                        constructor() { super(">", 2, true, operator.Operator.PRECEDENCE_COMPARISION); }
                        apply(...args) { return args[0] > args[1] ? 1 : 0; }
                    }();
                    ops[Operators.INDEX_LESS_THAN] = new class extends operator.Operator {
                        constructor() { super("<", 2, true, operator.Operator.PRECEDENCE_COMPARISION); }
                        apply(...args) { return args[0] < args[1] ? 1 : 0; }
                    }();
                    // Arithmetic operators
                    ops[Operators.INDEX_ADDITION] = new class extends operator.Operator {
                        constructor() { super("+", 2, true, operator.Operator.PRECEDENCE_ADDITION); }
                        apply(...args) { return args[0] + args[1]; }
                    }();
                    ops[Operators.INDEX_SUBTRACTION] = new class extends operator.Operator {
                        constructor() { super("-", 2, true, operator.Operator.PRECEDENCE_ADDITION); }
                        apply(...args) { return args[0] - args[1]; }
                    }();
                    ops[Operators.INDEX_MULTIPLICATION] = new class extends operator.Operator {
                        constructor() { super("*", 2, true, operator.Operator.PRECEDENCE_MULTIPLICATION); }
                        apply(...args) { return args[0] * args[1]; }
                    }();
                    ops[Operators.INDEX_DIVISION] = new class extends operator.Operator {
                        constructor() { super("/", 2, true, operator.Operator.PRECEDENCE_DIVISION); }
                        apply(...args) { if (args[1] === 0.0)
                            throw new Error("Division by zero!"); return args[0] / args[1]; }
                    }();
                    ops[Operators.INDEX_MODULO] = new class extends operator.Operator {
                        constructor() { super("%", 2, true, operator.Operator.PRECEDENCE_MODULO); }
                        apply(...args) { if (args[1] === 0.0)
                            throw new Error("Division by zero!"); return args[0] % args[1]; }
                    }();
                    ops[Operators.INDEX_POWER] = new class extends operator.Operator {
                        constructor() { super("^", 2, false, operator.Operator.PRECEDENCE_POWER); }
                        apply(...args) { return Math.pow(args[0], args[1]); }
                    }();
                    // Unary operators
                    ops[Operators.INDEX_UNARY_MINUS] = new class extends operator.Operator {
                        constructor() { super("-", 1, false, operator.Operator.PRECEDENCE_UNARY_MINUS); }
                        apply(...args) { return -args[0]; }
                    }();
                    ops[Operators.INDEX_UNARY_PLUS] = new class extends operator.Operator {
                        constructor() { super("+", 1, false, operator.Operator.PRECEDENCE_UNARY_PLUS); }
                        apply(...args) { return args[0]; }
                    }();
                    return ops;
                })();
                Operators.EPSILON = 1.0E-9;
                operator.Operators = Operators;
            })(operator = exp4j.operator || (exp4j.operator = {}));
        })(exp4j = objecthunter.exp4j || (objecthunter.exp4j = {}));
    })(objecthunter = net.objecthunter || (net.objecthunter = {}));
})(net || (net = {}));
//# sourceMappingURL=Operators.js.map/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
var net;
(function (net) {
    var objecthunter;
    (function (objecthunter) {
        var exp4j;
        (function (exp4j) {
            var tokenizer;
            (function (tokenizer) {
                /**
                 * Abstract class for tokens used by exp4j to tokenize expressions
                 * @class
                 */
                class Token {
                    constructor(type) {
                        if (this.type === undefined) {
                            this.type = 0;
                        }
                        this.type = type;
                    }
                    getType() {
                        return this.type;
                    }
                }
                Token.TOKEN_NUMBER = 1;
                Token.TOKEN_OPERATOR = 2;
                Token.TOKEN_FUNCTION = 3;
                Token.TOKEN_PARENTHESES_OPEN = 4;
                Token.TOKEN_PARENTHESES_CLOSE = 5;
                Token.TOKEN_VARIABLE = 6;
                Token.TOKEN_SEPARATOR = 7;
                tokenizer.Token = Token;
            })(tokenizer = exp4j.tokenizer || (exp4j.tokenizer = {}));
        })(exp4j = objecthunter.exp4j || (objecthunter.exp4j = {}));
    })(objecthunter = net.objecthunter || (net.objecthunter = {}));
})(net || (net = {}));
//# sourceMappingURL=Token.js.map/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
var net;
(function (net) {
    var objecthunter;
    (function (objecthunter) {
        var exp4j;
        (function (exp4j) {
            var tokenizer;
            (function (tokenizer) {
                /**
                 * Represents a number in the expression.
                 */
                class NumberToken extends net.objecthunter.exp4j.tokenizer.Token {
                    constructor(valueOrExpression, offset, len) {
                        super(net.objecthunter.exp4j.tokenizer.Token.TOKEN_NUMBER);
                        if (typeof valueOrExpression === "number") {
                            this.value = valueOrExpression;
                            return;
                        }
                        const expression = valueOrExpression;
                        const parsed = parseFloat(expression.join("").substring(offset, offset + len));
                        this.value = parsed;
                    }
                    /**
                     * Get the value of the number.
                     */
                    getValue() {
                        return this.value;
                    }
                }
                tokenizer.NumberToken = NumberToken;
            })(tokenizer = exp4j.tokenizer || (exp4j.tokenizer = {}));
        })(exp4j = objecthunter.exp4j || (objecthunter.exp4j = {}));
    })(objecthunter = net.objecthunter || (net.objecthunter = {}));
})(net || (net = {}));
//# sourceMappingURL=NumberToken.js.map/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
var net;
(function (net) {
    var objecthunter;
    (function (objecthunter) {
        var exp4j;
        (function (exp4j) {
            var tokenizer;
            (function (tokenizer) {
                /**
                 * Create a new instance
                 * @param {string} name the name of the setVariable
                 * @class
                 * @extends net.objecthunter.exp4j.tokenizer.Token
                 */
                class VariableToken extends net.objecthunter.exp4j.tokenizer.Token {
                    constructor(name) {
                        super(net.objecthunter.exp4j.tokenizer.Token.TOKEN_VARIABLE);
                        if (this.name === undefined) {
                            this.name = null;
                        }
                        this.name = name;
                    }
                    /**
                     * Get the name of the setVariable
                     * @return {string} the name
                     */
                    getName() {
                        return this.name;
                    }
                }
                tokenizer.VariableToken = VariableToken;
            })(tokenizer = exp4j.tokenizer || (exp4j.tokenizer = {}));
        })(exp4j = objecthunter.exp4j || (objecthunter.exp4j = {}));
    })(objecthunter = net.objecthunter || (net.objecthunter = {}));
})(net || (net = {}));
//# sourceMappingURL=VariableToken.js.map/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
var net;
(function (net) {
    var objecthunter;
    (function (objecthunter) {
        var exp4j;
        (function (exp4j) {
            var tokenizer;
            (function (tokenizer) {
                class FunctionToken extends net.objecthunter.exp4j.tokenizer.Token {
                    constructor(_function) {
                        super(net.objecthunter.exp4j.tokenizer.Token.TOKEN_FUNCTION);
                        if (this._function === undefined) {
                            this._function = null;
                        }
                        this._function = _function;
                    }
                    getFunction() {
                        return this._function;
                    }
                }
                tokenizer.FunctionToken = FunctionToken;
            })(tokenizer = exp4j.tokenizer || (exp4j.tokenizer = {}));
        })(exp4j = objecthunter.exp4j || (objecthunter.exp4j = {}));
    })(objecthunter = net.objecthunter || (net.objecthunter = {}));
})(net || (net = {}));
//# sourceMappingURL=FunctionToken.js.map/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
var net;
(function (net) {
    var objecthunter;
    (function (objecthunter) {
        var exp4j;
        (function (exp4j) {
            var tokenizer;
            (function (tokenizer) {
                /**
                 * Create a new instance
                 * @param {net.objecthunter.exp4j.operator.Operator} op the operator
                 * @class
                 * @extends net.objecthunter.exp4j.tokenizer.Token
                 */
                class OperatorToken extends net.objecthunter.exp4j.tokenizer.Token {
                    constructor(op) {
                        super(net.objecthunter.exp4j.tokenizer.Token.TOKEN_OPERATOR);
                        if (this.operator === undefined) {
                            this.operator = null;
                        }
                        if (op == null) {
                            throw new Error("Operator is unknown for token.");
                        }
                        this.operator = op;
                    }
                    /**
                     * Get the operator for that token
                     * @return {net.objecthunter.exp4j.operator.Operator} the operator
                     */
                    getOperator() {
                        return this.operator;
                    }
                }
                tokenizer.OperatorToken = OperatorToken;
            })(tokenizer = exp4j.tokenizer || (exp4j.tokenizer = {}));
        })(exp4j = objecthunter.exp4j || (objecthunter.exp4j = {}));
    })(objecthunter = net.objecthunter || (net.objecthunter = {}));
})(net || (net = {}));
//# sourceMappingURL=OperatorToken.js.map/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
var net;
(function (net) {
    var objecthunter;
    (function (objecthunter) {
        var exp4j;
        (function (exp4j) {
            var tokenizer;
            (function (tokenizer) {
                class OpenParenthesesToken extends net.objecthunter.exp4j.tokenizer.Token {
                    constructor() {
                        super(net.objecthunter.exp4j.tokenizer.Token.TOKEN_PARENTHESES_OPEN);
                    }
                }
                tokenizer.OpenParenthesesToken = OpenParenthesesToken;
            })(tokenizer = exp4j.tokenizer || (exp4j.tokenizer = {}));
        })(exp4j = objecthunter.exp4j || (objecthunter.exp4j = {}));
    })(objecthunter = net.objecthunter || (net.objecthunter = {}));
})(net || (net = {}));
//# sourceMappingURL=OpenParenthesesToken.js.map/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
var net;
(function (net) {
    var objecthunter;
    (function (objecthunter) {
        var exp4j;
        (function (exp4j) {
            var tokenizer;
            (function (tokenizer) {
                /**
                 * represents closed parentheses
                 * @extends net.objecthunter.exp4j.tokenizer.Token
                 * @class
                 */
                class CloseParenthesesToken extends net.objecthunter.exp4j.tokenizer.Token {
                    constructor() {
                        super(net.objecthunter.exp4j.tokenizer.Token.TOKEN_PARENTHESES_CLOSE);
                    }
                }
                tokenizer.CloseParenthesesToken = CloseParenthesesToken;
            })(tokenizer = exp4j.tokenizer || (exp4j.tokenizer = {}));
        })(exp4j = objecthunter.exp4j || (objecthunter.exp4j = {}));
    })(objecthunter = net.objecthunter || (net.objecthunter = {}));
})(net || (net = {}));
//# sourceMappingURL=CloseParenthesesToken.js.map/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
var net;
(function (net) {
    var objecthunter;
    (function (objecthunter) {
        var exp4j;
        (function (exp4j) {
            var tokenizer;
            (function (tokenizer) {
                /**
                 * Represents an argument separator in functions i.e: ','
                 * @extends net.objecthunter.exp4j.tokenizer.Token
                 * @class
                 */
                class ArgumentSeparatorToken extends net.objecthunter.exp4j.tokenizer.Token {
                    constructor() {
                        super(net.objecthunter.exp4j.tokenizer.Token.TOKEN_SEPARATOR);
                    }
                }
                tokenizer.ArgumentSeparatorToken = ArgumentSeparatorToken;
            })(tokenizer = exp4j.tokenizer || (exp4j.tokenizer = {}));
        })(exp4j = objecthunter.exp4j || (objecthunter.exp4j = {}));
    })(objecthunter = net.objecthunter || (net.objecthunter = {}));
})(net || (net = {}));
//# sourceMappingURL=ArgumentSeparatorToken.js.map/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
var net;
(function (net) {
    var objecthunter;
    (function (objecthunter) {
        var exp4j;
        (function (exp4j) {
            var tokenizer;
            (function (tokenizer) {
                /**
                 * This exception is being thrown whenever {@link Tokenizer} finds unknown function or variable.
                 *
                 * @author Bartosz Firyn (sarxos)
                 * @param {string} expression
                 * @param {number} position
                 * @param {number} length
                 * @class
                 * @extends Error
                 */
                class UnknownFunctionOrVariableException {
                    constructor(expression, position, length) {
                        Object.setPrototypeOf(this, UnknownFunctionOrVariableException.prototype);
                        if (this.message === undefined) {
                            this.message = null;
                        }
                        if (this.expression === undefined) {
                            this.expression = null;
                        }
                        if (this.__token === undefined) {
                            this.__token = null;
                        }
                        if (this.position === undefined) {
                            this.position = 0;
                        }
                        this.expression = expression;
                        this.__token = UnknownFunctionOrVariableException.token(expression, position, length);
                        this.position = position;
                        this.message = "Unknown function or variable \'" + this.__token + "\' at pos " + position + " in expression \'" + expression + "\'";
                    }
                    /*private*/ static token(expression, position, length) {
                        const len = expression.length;
                        let end = position + length - 1;
                        if (len < end) {
                            end = len;
                        }
                        return expression.substring(position, end);
                    }
                    /**
                     *
                     * @return {string}
                     */
                    getMessage() {
                        return this.message;
                    }
                    /**
                     * @return {string} Expression which contains unknown function or variable
                     */
                    getExpression() {
                        return this.expression;
                    }
                    /**
                     * @return {string} The name of unknown function or variable
                     */
                    getToken() {
                        return this.__token;
                    }
                    /**
                     * @return {number} The position of unknown function or variable
                     */
                    getPosition() {
                        return this.position;
                    }
                }
                /**
                 * Serial version UID.
                 */
                UnknownFunctionOrVariableException.__net_objecthunter_exp4j_tokenizer_UnknownFunctionOrVariableException_serialVersionUID = 1;
                tokenizer.UnknownFunctionOrVariableException = UnknownFunctionOrVariableException;
            })(tokenizer = exp4j.tokenizer || (exp4j.tokenizer = {}));
        })(exp4j = objecthunter.exp4j || (objecthunter.exp4j = {}));
    })(objecthunter = net.objecthunter || (net.objecthunter = {}));
})(net || (net = {}));
//# sourceMappingURL=UnknownFunctionOrVariableException.js.map/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
var net;
(function (net) {
    var objecthunter;
    (function (objecthunter) {
        var exp4j;
        (function (exp4j) {
            var tokenizer;
            (function (tokenizer) {
                class Tokenizer {
                    constructor(expression, userFunctions, userOperators, variableNames, implicitMultiplication = true) {
                        this.pos = 0;
                        this.lastToken = null;
                        this.expression = expression.trim().split('');
                        this.expressionLength = this.expression.length;
                        this.userFunctions = userFunctions;
                        this.userOperators = userOperators;
                        this.variableNames = variableNames;
                        this.implicitMultiplication = implicitMultiplication;
                    }
                    hasNext() {
                        return this.expression.length > this.pos;
                    }
                    nextToken() {
                        let ch = this.expression[this.pos];
                        while (Tokenizer.isWhiteSpace(ch.charCodeAt(0))) {
                            ch = this.expression[++this.pos];
                        }
                        if (Tokenizer.isDigit(ch.charCodeAt(0)) || ch === '.') {
                            if (this.lastToken != null) {
                                const lastType = this.lastToken.getType();
                                if (lastType === net.objecthunter.exp4j.tokenizer.Token.TOKEN_NUMBER) {
                                    throw new Error("Unable to parse char '" + ch + "' (Code:" + ch.charCodeAt(0) + ") at [" + this.pos + "]");
                                }
                                if (this.needsImplicitMultiplication(lastType)) {
                                    this.lastToken = new net.objecthunter.exp4j.tokenizer.OperatorToken(net.objecthunter.exp4j.operator.Operators.getBuiltinOperator('*', 2));
                                    return this.lastToken;
                                }
                            }
                            return this.parseNumberToken(ch);
                        }
                        if (this.isArgumentSeparator(ch)) {
                            return this.parseArgumentSeparatorToken();
                        }
                        if (this.isOpenParentheses(ch)) {
                            if (this.lastToken != null && this.needsImplicitMultiplication(this.lastToken.getType())) {
                                this.lastToken = new net.objecthunter.exp4j.tokenizer.OperatorToken(net.objecthunter.exp4j.operator.Operators.getBuiltinOperator('*', 2));
                                return this.lastToken;
                            }
                            return this.parseParentheses(true);
                        }
                        if (this.isCloseParentheses(ch)) {
                            return this.parseParentheses(false);
                        }
                        if (net.objecthunter.exp4j.operator.Operator.isAllowedOperatorChar(ch)) {
                            return this.parseOperatorToken();
                        }
                        if (Tokenizer.isAlphabetic(ch.charCodeAt(0)) || ch === '_') {
                            if (this.lastToken != null && this.needsImplicitMultiplication(this.lastToken.getType())) {
                                this.lastToken = new net.objecthunter.exp4j.tokenizer.OperatorToken(net.objecthunter.exp4j.operator.Operators.getBuiltinOperator('*', 2));
                                return this.lastToken;
                            }
                            return this.parseFunctionOrVariable();
                        }
                        throw new Error("Unable to parse char '" + ch + "' (Code:" + ch.charCodeAt(0) + ") at [" + this.pos + "]");
                    }
                    /*private*/ needsImplicitMultiplication(lastTokenType) {
                        return this.implicitMultiplication
                            && lastTokenType !== net.objecthunter.exp4j.tokenizer.Token.TOKEN_OPERATOR
                            && lastTokenType !== net.objecthunter.exp4j.tokenizer.Token.TOKEN_PARENTHESES_OPEN
                            && lastTokenType !== net.objecthunter.exp4j.tokenizer.Token.TOKEN_FUNCTION
                            && lastTokenType !== net.objecthunter.exp4j.tokenizer.Token.TOKEN_SEPARATOR;
                    }
                    /*private*/ parseArgumentSeparatorToken() {
                        this.pos++;
                        this.lastToken = new net.objecthunter.exp4j.tokenizer.ArgumentSeparatorToken();
                        return this.lastToken;
                    }
                    /*private*/ isArgumentSeparator(ch) {
                        return ch === ',';
                    }
                    /*private*/ parseParentheses(open) {
                        this.lastToken = open
                            ? new net.objecthunter.exp4j.tokenizer.OpenParenthesesToken()
                            : new net.objecthunter.exp4j.tokenizer.CloseParenthesesToken();
                        this.pos++;
                        return this.lastToken;
                    }
                    /*private*/ isOpenParentheses(ch) {
                        return ch === '(' || ch === '{' || ch === '[';
                    }
                    /*private*/ isCloseParentheses(ch) {
                        return ch === ')' || ch === '}' || ch === ']';
                    }
                    /*private*/ parseFunctionOrVariable() {
                        const offset = this.pos;
                        let len = 1;
                        let lastValidLen = 1;
                        let lastValidToken = null;
                        if (this.isEndOfExpression(offset)) {
                            this.pos++;
                        }
                        let testPos = offset + len - 1;
                        while (!this.isEndOfExpression(testPos) && Tokenizer.isVariableOrFunctionCharacter(this.expression[testPos].charCodeAt(0))) {
                            const name = this.expression.join('').substring(offset, offset + len);
                            if (this.variableNames != null && this.variableNames.has(name)) {
                                lastValidLen = len;
                                lastValidToken = new net.objecthunter.exp4j.tokenizer.VariableToken(name);
                            }
                            else {
                                const f = this.getFunction(name);
                                if (f != null) {
                                    lastValidLen = len;
                                    lastValidToken = new net.objecthunter.exp4j.tokenizer.FunctionToken(f);
                                }
                            }
                            len++;
                            testPos = offset + len - 1;
                        }
                        if (lastValidToken == null) {
                            throw new Error("UnknownFunctionOrVariableException " + String(this.expression) + " at position " + this.pos);
                        }
                        this.pos += lastValidLen;
                        this.lastToken = lastValidToken;
                        return this.lastToken;
                    }
                    /*private*/ getFunction(name) {
                        let f = null;
                        if (this.userFunctions != null) {
                            f = this.userFunctions.get(name);
                        }
                        if (f == null) {
                            f = net.objecthunter.exp4j.func.Functions.getBuiltinFunction(name);
                        }
                        return f;
                    }
                    /*private*/ parseOperatorToken() {
                        const offset = this.pos;
                        let len = 1;
                        let lastValid = null;
                        while (!this.isEndOfExpression(offset + len) && net.objecthunter.exp4j.operator.Operator.isAllowedOperatorChar(this.expression[offset + len])) {
                            len++;
                        }
                        let validLen = 0;
                        for (let candidateLen = len; candidateLen > 0; candidateLen--) {
                            const op = this.getOperator(this.expression.join('').substring(offset, offset + candidateLen));
                            if (op != null) {
                                lastValid = op;
                                validLen = candidateLen;
                                break;
                            }
                        }
                        if (lastValid == null) {
                            throw new Error("Unable to parse operator at [" + offset + "]");
                        }
                        this.pos += validLen;
                        this.lastToken = new net.objecthunter.exp4j.tokenizer.OperatorToken(lastValid);
                        return this.lastToken;
                    }
                    /*private*/ getOperator(symbol) {
                        let op = null;
                        if (this.userOperators != null) {
                            op = this.userOperators.get(symbol);
                        }
                        if (op == null && symbol.length === 1) {
                            let argc = 2;
                            if (this.lastToken == null) {
                                argc = 1;
                            }
                            else {
                                const lastTokenType = this.lastToken.getType();
                                if (lastTokenType === net.objecthunter.exp4j.tokenizer.Token.TOKEN_PARENTHESES_OPEN
                                    || lastTokenType === net.objecthunter.exp4j.tokenizer.Token.TOKEN_SEPARATOR) {
                                    argc = 1;
                                }
                                else if (lastTokenType === net.objecthunter.exp4j.tokenizer.Token.TOKEN_OPERATOR) {
                                    const lastOp = this.lastToken.getOperator();
                                    if (lastOp.getNumOperands() === 2 || (lastOp.getNumOperands() === 1 && !lastOp.isLeftAssociative())) {
                                        argc = 1;
                                    }
                                }
                            }
                            op = net.objecthunter.exp4j.operator.Operators.getBuiltinOperator(symbol.charAt(0), argc);
                        }
                        return op;
                    }
                    /*private*/ parseNumberToken(firstChar) {
                        const offset = this.pos;
                        let len = 1;
                        this.pos++;
                        if (this.isEndOfExpression(offset + len)) {
                            this.lastToken = new net.objecthunter.exp4j.tokenizer.NumberToken(parseFloat(String(firstChar)));
                            return this.lastToken;
                        }
                        while (!this.isEndOfExpression(offset + len)
                            && Tokenizer.isNumeric(this.expression[offset + len], this.expression[offset + len - 1] === 'e' || this.expression[offset + len - 1] === 'E')) {
                            len++;
                            this.pos++;
                        }
                        if (this.expression[offset + len - 1] === 'e' || this.expression[offset + len - 1] === 'E') {
                            len--;
                            this.pos--;
                        }
                        this.lastToken = new net.objecthunter.exp4j.tokenizer.NumberToken(this.expression, offset, len);
                        return this.lastToken;
                    }
                    /*private*/ static isNumeric(ch, lastCharE) {
                        return Tokenizer.isDigit(ch.charCodeAt(0))
                            || ch === '.'
                            || ch === 'e'
                            || ch === 'E'
                            || (lastCharE && (ch === '-' || ch === '+'));
                    }
                    static isAlphabetic(codePoint) {
                        return Tokenizer.isLetter(codePoint);
                    }
                    static isVariableOrFunctionCharacter(codePoint) {
                        return Tokenizer.isLetter(codePoint)
                            || Tokenizer.isDigit(codePoint)
                            || codePoint === '_'.charCodeAt(0)
                            || codePoint === '.'.charCodeAt(0);
                    }
                    /*private*/ isEndOfExpression(offset) {
                        return this.expressionLength <= offset;
                    }
                    /*private*/ static isLetter(c) {
                        return (c >= 97 && c <= 122) || (c >= 65 && c <= 90);
                    }
                    /*private*/ static isWhiteSpace(c) {
                        return c <= 32;
                    }
                    /*private*/ static isDigit(c) {
                        return c >= 48 && c <= 57;
                    }
                }
                tokenizer.Tokenizer = Tokenizer;
            })(tokenizer = exp4j.tokenizer || (exp4j.tokenizer = {}));
        })(exp4j = objecthunter.exp4j || (objecthunter.exp4j = {}));
    })(objecthunter = net.objecthunter || (net.objecthunter = {}));
})(net || (net = {}));
//# sourceMappingURL=Tokenizer.js.map/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
var net;
(function (net) {
    var objecthunter;
    (function (objecthunter) {
        var exp4j;
        (function (exp4j) {
            var shuntingyard;
            (function (shuntingyard) {
                /**
                 * Shunting yard implementation to convert infix to reverse polish notation
                 * @class
                 */
                class ShuntingYard {
                    /**
                     * Convert a Set of tokens from infix to reverse polish notation
                     * @param {string} expression the expression to convert
                     * @param {Map} userFunctions the custom functions used
                     * @param {Map} userOperators the custom operators used
                     * @param {Set} variableNames the variable names used in the expression
                     * @param {boolean} implicitMultiplication set to fasle to turn off implicit multiplication
                     * @return {net.objecthunter.exp4j.tokenizer.Token[]} a {@link net.objecthunter.exp4j.tokenizer.Token} array containing the result
                     */
                    static convertToRPN(expression, userFunctions, userOperators, variableNames, implicitMultiplication) {
                        const stack = new ShuntingYard.TokenStack();
                        const output = new ShuntingYard.TokenList();
                        const tokenizer = new net.objecthunter.exp4j.tokenizer.Tokenizer(expression, userFunctions, userOperators, variableNames, implicitMultiplication);
                        while ((tokenizer.hasNext())) {
                            {
                                const token = tokenizer.nextToken();
                                switch ((token.getType())) {
                                    case net.objecthunter.exp4j.tokenizer.Token.TOKEN_NUMBER:
                                    case net.objecthunter.exp4j.tokenizer.Token.TOKEN_VARIABLE:
                                        output.add(token);
                                        break;
                                    case net.objecthunter.exp4j.tokenizer.Token.TOKEN_FUNCTION:
                                        stack.push(token);
                                        break;
                                    case net.objecthunter.exp4j.tokenizer.Token.TOKEN_SEPARATOR:
                                        while ((!stack.empty() && stack.peek().getType() !== net.objecthunter.exp4j.tokenizer.Token.TOKEN_PARENTHESES_OPEN)) {
                                            {
                                                output.add(stack.pop());
                                            }
                                        }
                                        ;
                                        if (stack.empty() || stack.peek().getType() !== net.objecthunter.exp4j.tokenizer.Token.TOKEN_PARENTHESES_OPEN) {
                                            throw new Error("Misplaced function separator ',' or mismatched parentheses");
                                        }
                                        break;
                                    case net.objecthunter.exp4j.tokenizer.Token.TOKEN_OPERATOR:
                                        while ((!stack.empty() && stack.peek().getType() === net.objecthunter.exp4j.tokenizer.Token.TOKEN_OPERATOR)) {
                                            {
                                                const o1 = token;
                                                const o2 = stack.peek();
                                                if (o1.getOperator().getNumOperands() === 1 && o2.getOperator().getNumOperands() === 2) {
                                                    break;
                                                }
                                                else if ((o1.getOperator().isLeftAssociative() && o1.getOperator().getPrecedence() <= o2.getOperator().getPrecedence()) || (o1.getOperator().getPrecedence() < o2.getOperator().getPrecedence())) {
                                                    output.add(stack.pop());
                                                }
                                                else {
                                                    break;
                                                }
                                            }
                                        }
                                        ;
                                        stack.push(token);
                                        break;
                                    case net.objecthunter.exp4j.tokenizer.Token.TOKEN_PARENTHESES_OPEN:
                                        stack.push(token);
                                        break;
                                    case net.objecthunter.exp4j.tokenizer.Token.TOKEN_PARENTHESES_CLOSE:
                                        while ((stack.peek().getType() !== net.objecthunter.exp4j.tokenizer.Token.TOKEN_PARENTHESES_OPEN)) {
                                            {
                                                output.add(stack.pop());
                                            }
                                        }
                                        ;
                                        stack.pop();
                                        if (!stack.isEmpty() && stack.peek().getType() === net.objecthunter.exp4j.tokenizer.Token.TOKEN_FUNCTION) {
                                            output.add(stack.pop());
                                        }
                                        break;
                                    default:
                                        throw new Error("Unknown Token type encountered. This should not happen");
                                }
                            }
                        }
                        ;
                        while ((!stack.empty())) {
                            {
                                const t = stack.pop();
                                if (t.getType() === net.objecthunter.exp4j.tokenizer.Token.TOKEN_PARENTHESES_CLOSE || t.getType() === net.objecthunter.exp4j.tokenizer.Token.TOKEN_PARENTHESES_OPEN) {
                                    throw new Error("Mismatched parentheses detected. Please check the expression");
                                }
                                else {
                                    output.add(t);
                                }
                            }
                        }
                        ;
                        return output.toArray();
                    }
                }
                shuntingyard.ShuntingYard = ShuntingYard;
                (function (ShuntingYard) {
                    class TokenStack {
                        constructor() {
                            this.data = new Array(16);
                            this.size = 0;
                        }
                        push(token) {
                            if (this.size === this.data.length) {
                                this.grow();
                            }
                            this.data[this.size++] = token;
                        }
                        pop() {
                            return this.data[--this.size];
                        }
                        peek() {
                            return this.data[this.size - 1];
                        }
                        empty() {
                            return this.size === 0;
                        }
                        isEmpty() {
                            return this.size === 0;
                        }
                        grow() {
                            const expanded = new Array(this.data.length * 2);
                            for (let i = 0; i < this.data.length; i++) {
                                {
                                    expanded[i] = this.data[i];
                                }
                                ;
                            }
                            this.data = expanded;
                        }
                    }
                    ShuntingYard.TokenStack = TokenStack;
                    class TokenList {
                        constructor() {
                            this.data = new Array(16);
                            this.size = 0;
                        }
                        add(token) {
                            if (this.size === this.data.length) {
                                this.grow();
                            }
                            this.data[this.size++] = token;
                        }
                        toArray() {
                            const result = new Array(this.size);
                            for (let i = 0; i < this.size; i++) {
                                {
                                    result[i] = this.data[i];
                                }
                                ;
                            }
                            return result;
                        }
                        grow() {
                            const expanded = new Array(this.data.length * 2);
                            for (let i = 0; i < this.data.length; i++) {
                                {
                                    expanded[i] = this.data[i];
                                }
                                ;
                            }
                            this.data = expanded;
                        }
                    }
                    ShuntingYard.TokenList = TokenList;
                })(ShuntingYard = shuntingyard.ShuntingYard || (shuntingyard.ShuntingYard = {}));
            })(shuntingyard = exp4j.shuntingyard || (exp4j.shuntingyard = {}));
        })(exp4j = objecthunter.exp4j || (objecthunter.exp4j = {}));
    })(objecthunter = net.objecthunter || (net.objecthunter = {}));
})(net || (net = {}));
//# sourceMappingURL=ShuntingYard.js.map/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
var net;
(function (net) {
    var objecthunter;
    (function (objecthunter) {
        var exp4j;
        (function (exp4j) {
            /**
             * Creates a new expression that is a copy of the existing one.
             *
             * @param existing the expression to copy
             */
            class Expression {
                constructor(tokensOrExisting, userFunctionNames = null) {
                    if (tokensOrExisting instanceof Expression) {
                        const existing = tokensOrExisting;
                        this.tokens = existing.tokens.slice();
                        this.variables = new Map();
                        this.variableKeys = [];
                        for (const key of existing.variableKeys) {
                            if (!this.variableKeys.includes(key)) {
                                this.variableKeys.push(key);
                            }
                            this.variables.set(key, existing.variables.get(key));
                        }
                        this.userFunctionNames = existing.userFunctionNames == null ? null : existing.userFunctionNames.slice();
                        return;
                    }
                    this.tokens = tokensOrExisting;
                    this.variables = new Map();
                    this.variableKeys = [];
                    this.initDefaultVariables();
                    this.userFunctionNames = userFunctionNames == null ? null : userFunctionNames.slice();
                }
                initDefaultVariables() {
                    this.setVariableInternal("pi", Math.PI);
                    this.setVariableInternal("\u03c0", Math.PI);
                    this.setVariableInternal("\u03c6", 1.61803398874);
                    this.setVariableInternal("e", Math.E);
                    this.setVariableInternal("true", 1.0);
                    this.setVariableInternal("false", 0.0);
                    this.setVariableInternal("null", NaN);
                }
                setVariableInternal(name, value) {
                    this.variables.set(name, value);
                    if (!this.variableKeys.includes(name)) {
                        this.variableKeys.push(name);
                    }
                }
                setVariable(name, value) {
                    this.checkVariableName(name);
                    this.setVariableInternal(name, value);
                    return this;
                }
                checkVariableName(name) {
                    if ((this.userFunctionNames != null && this.containsUserFunctionName(name)) || net.objecthunter.exp4j.func.Functions.getBuiltinFunction(name) != null) {
                        throw new Error("The variable name '" + name + "' is invalid. Since there exists a function with the same name");
                    }
                }
                containsUserFunctionName(name) {
                    if (this.userFunctionNames == null) {
                        return false;
                    }
                    for (const functionName of this.userFunctionNames) {
                        if (functionName != null && functionName === name) {
                            return true;
                        }
                    }
                    return false;
                }
                clearVariables() {
                    this.variables.clear();
                    this.variableKeys = [];
                    return this;
                }
                getVariableNames() {
                    const variables = [];
                    for (const t of this.tokens) {
                        if (t.getType() === net.objecthunter.exp4j.tokenizer.Token.TOKEN_VARIABLE) {
                            const varName = t.getName();
                            if (!variables.includes(varName)) {
                                variables.push(varName);
                            }
                        }
                    }
                    return variables;
                }
                validate(checkVariablesSet = true) {
                    const errors = [];
                    if (checkVariablesSet) {
                        for (const t of this.tokens) {
                            if (t.getType() === net.objecthunter.exp4j.tokenizer.Token.TOKEN_VARIABLE) {
                                const _var = t.getName();
                                if (!this.variables.has(_var)) {
                                    errors.push("The setVariable '" + _var + "' has not been set");
                                }
                            }
                        }
                    }
                    let count = 0;
                    for (const tok of this.tokens) {
                        switch ((tok.getType())) {
                            case net.objecthunter.exp4j.tokenizer.Token.TOKEN_NUMBER:
                            case net.objecthunter.exp4j.tokenizer.Token.TOKEN_VARIABLE:
                                count++;
                                break;
                            case net.objecthunter.exp4j.tokenizer.Token.TOKEN_FUNCTION:
                                const func = tok.getFunction();
                                const argsNum = func.getNumArguments();
                                if (argsNum > count) {
                                    errors.push("Not enough arguments for '" + func.getName() + "'");
                                }
                                if (argsNum > 1) {
                                    count -= argsNum - 1;
                                }
                                else if (argsNum === 0) {
                                    count++;
                                }
                                break;
                            case net.objecthunter.exp4j.tokenizer.Token.TOKEN_OPERATOR:
                                const op = tok.getOperator();
                                if (op.getNumOperands() === 2) {
                                    count--;
                                }
                                break;
                        }
                        if (count < 1) {
                            errors.push("Too many operators");
                            return new net.objecthunter.exp4j.ValidationResult(false, errors);
                        }
                    }
                    if (count > 1) {
                        errors.push("Too many operands");
                    }
                    return errors.length === 0 ? net.objecthunter.exp4j.ValidationResult.SUCCESS : new net.objecthunter.exp4j.ValidationResult(false, errors);
                }
                evaluate() {
                    try {
                        return this.evaluateWithException();
                    }
                    catch (e) {
                        const err = e;
                        console.error(err.message, err);
                        return NaN;
                    }
                }
                evaluateWithException() {
                    const output = new net.objecthunter.exp4j.ArrayStack();
                    for (const t of this.tokens) {
                        if (t.getType() === net.objecthunter.exp4j.tokenizer.Token.TOKEN_NUMBER) {
                            output.push(t.getValue());
                        }
                        else if (t.getType() === net.objecthunter.exp4j.tokenizer.Token.TOKEN_VARIABLE) {
                            const name = t.getName();
                            const value = this.variables.get(name);
                            if (value == null) {
                                throw new Error("No value has been set for the setVariable '" + name + "'.");
                            }
                            output.push(value);
                        }
                        else if (t.getType() === net.objecthunter.exp4j.tokenizer.Token.TOKEN_OPERATOR) {
                            const op = t;
                            if (output.size() < op.getOperator().getNumOperands()) {
                                throw new Error("Invalid number of operands available for '" + op.getOperator().getSymbol() + "' operator");
                            }
                            if (op.getOperator().getNumOperands() === 2) {
                                const rightArg = output.pop();
                                const leftArg = output.pop();
                                output.push(op.getOperator().apply(leftArg, rightArg));
                            }
                            else if (op.getOperator().getNumOperands() === 1) {
                                const arg = output.pop();
                                output.push(op.getOperator().apply(arg));
                            }
                        }
                        else if (t.getType() === net.objecthunter.exp4j.tokenizer.Token.TOKEN_FUNCTION) {
                            const func = t;
                            const numArguments = func.getFunction().getNumArguments();
                            if (output.size() < numArguments) {
                                throw new Error("Invalid number of arguments available for '" + func.getFunction().getName() + "' function");
                            }
                            const args = new Array(numArguments);
                            for (let j = numArguments - 1; j >= 0; j--) {
                                args[j] = output.pop();
                            }
                            output.push(func.getFunction().apply(...args));
                        }
                    }
                    if (output.size() > 1) {
                        throw new Error("Invalid number of items on the output queue. Might be caused by an invalid number of arguments for a function.");
                    }
                    return output.pop();
                }
            }
            exp4j.Expression = Expression;
        })(exp4j = objecthunter.exp4j || (objecthunter.exp4j = {}));
    })(objecthunter = net.objecthunter || (net.objecthunter = {}));
})(net || (net = {}));
//# sourceMappingURL=Expression.js.map/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
var net;
(function (net) {
    var objecthunter;
    (function (objecthunter) {
        var exp4j;
        (function (exp4j) {
            /**
             * Create a new ExpressionBuilder instance and initialize it with a given expression string.
             *
             * @param expression the expression to be parsed
             */
            class ExpressionBuilder {
                constructor(expression) {
                    if (expression == null || expression.trim().length === 0) {
                        throw new Error("Expression can not be empty");
                    }
                    this.expression = expression;
                    this.userOperators = new Map();
                    this.userFunctions = new Map();
                    this.variableNames = new Set();
                    this.variableNameArray = [];
                    this.userFunctionNameArray = [];
                    this.implicitMul = true;
                }
                /**
                 * Add a custom function implementation available for use in the expression.
                 */
                _function(_function) {
                    const functionName = _function.getName();
                    this.userFunctions.set(functionName, _function);
                    if (!this.userFunctionNameArray.includes(functionName)) {
                        this.userFunctionNameArray.push(functionName);
                    }
                    return this;
                }
                /**
                 * Add multiple custom function implementations available for use in the expression.
                 */
                functions(..._functions) {
                    for (const f of _functions) {
                        this._function(f);
                    }
                    return this;
                }
                /**
                 * Declare variable names used in the expression.
                 */
                variables(...variableNames) {
                    for (const variableName of variableNames) {
                        this.addVariableName(variableName);
                    }
                    return this;
                }
                /**
                 * Declare a variable used in the expression.
                 */
                variable(variableName) {
                    this.addVariableName(variableName);
                    return this;
                }
                addVariableName(variableName) {
                    if (!this.variableNames.has(variableName)) {
                        this.variableNames.add(variableName);
                        this.variableNameArray.push(variableName);
                    }
                }
                implicitMultiplication(enabled) {
                    this.implicitMul = enabled;
                    return this;
                }
                addOperator(operator) {
                    this.checkOperatorSymbol(operator);
                    this.userOperators.set(operator.getSymbol(), operator);
                }
                checkOperatorSymbol(op) {
                    const name = op.getSymbol();
                    for (const ch of name) {
                        if (!net.objecthunter.exp4j.operator.Operator.isAllowedOperatorChar(ch)) {
                            throw new Error("The operator symbol '" + name + "' is invalid");
                        }
                    }
                }
                /**
                 * Add multiple custom operators which should be available for use in the expression.
                 */
                operator(...operators) {
                    for (const o of operators) {
                        this.addOperator(o);
                    }
                    return this;
                }
                /**
                 * Build the Expression instance using the custom operators and functions set.
                 */
                build() {
                    if (this.expression.length === 0) {
                        throw new Error("The expression can not be empty");
                    }
                    this.addVariableName("pi");
                    this.addVariableName("\u03c0");
                    this.addVariableName("e");
                    this.addVariableName("\u03c6");
                    this.addVariableName("true");
                    this.addVariableName("false");
                    this.addVariableName("null");
                    for (const _var of this.variableNameArray) {
                        if (net.objecthunter.exp4j.func.Functions.getBuiltinFunction(_var) != null || this.userFunctions.has(_var)) {
                            throw new Error("A variable can not have the same name as a function [" + _var + "]");
                        }
                    }
                    return new net.objecthunter.exp4j.Expression(net.objecthunter.exp4j.shuntingyard.ShuntingYard.convertToRPN(this.expression, this.userFunctions, this.userOperators, this.variableNames, this.implicitMul), this.userFunctionNameArray);
                }
            }
            exp4j.ExpressionBuilder = ExpressionBuilder;
        })(exp4j = objecthunter.exp4j || (objecthunter.exp4j = {}));
    })(objecthunter = net.objecthunter || (net.objecthunter = {}));
})(net || (net = {}));
//# sourceMappingURL=ExpressionBuilder.js.map