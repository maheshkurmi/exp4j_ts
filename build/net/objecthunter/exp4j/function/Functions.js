/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
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
//# sourceMappingURL=Functions.js.map