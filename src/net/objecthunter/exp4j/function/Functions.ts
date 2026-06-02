/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
namespace net.objecthunter.exp4j.func {
    /**
     * Class representing the builtin functions available for use in expressions
     * @class
     */
    export class Functions {
        static INDEX_SIN: number = 0;

        static INDEX_COS: number = 1;

        static INDEX_TAN: number = 2;

        static INDEX_CSC: number = 3;

        static INDEX_SEC: number = 4;

        static INDEX_COT: number = 5;

        static INDEX_SINH: number = 6;

        static INDEX_COSH: number = 7;

        static INDEX_TANH: number = 8;

        static INDEX_CSCH: number = 9;

        static INDEX_SECH: number = 10;

        static INDEX_COTH: number = 11;

        static INDEX_ASIN: number = 12;

        static INDEX_ACOS: number = 13;

        static INDEX_ATAN: number = 14;

        static INDEX_SQRT: number = 15;

        static INDEX_CBRT: number = 16;

        static INDEX_ABS: number = 17;

        static INDEX_CEIL: number = 18;

        static INDEX_FLOOR: number = 19;

        static INDEX_POW: number = 20;

        static INDEX_EXP: number = 21;

        static INDEX_EXPM1: number = 22;

        static INDEX_LOG10: number = 23;

        static INDEX_LOG2: number = 24;

        static INDEX_LOG: number = 25;

        static INDEX_LOG1P: number = 26;

        static INDEX_LOGB: number = 27;

        static INDEX_SGN: number = 28;

        static INDEX_TO_RADIAN: number = 29;

        static INDEX_TO_DEGREE: number = 30;

        static INDEX_MIN: number = 31;

        static INDEX_MAX: number = 32;

        static INDEX_IF: number = 33;

        static BUILT_IN_FUNCTIONS: net.objecthunter.exp4j.func._Function[] = (() => {
            const funcs: net.objecthunter.exp4j.func._Function[] = new Array(34);
            
            // Trigonometric functions
            funcs[Functions.INDEX_SIN] = new class extends _Function { constructor() { super("sin"); } apply(...args: number[]) { return Math.sin(args[0]); } }();
            funcs[Functions.INDEX_COS] = new class extends _Function { constructor() { super("cos"); } apply(...args: number[]) { return Math.cos(args[0]); } }();
            funcs[Functions.INDEX_TAN] = new class extends _Function { constructor() { super("tan"); } apply(...args: number[]) { return Math.tan(args[0]); } }();
            funcs[Functions.INDEX_COT] = new class extends _Function { constructor() { super("cot"); } apply(...args: number[]) { const tan = Math.tan(args[0]); if (tan === 0.0) throw new Error("Division by zero in cotangent!"); return 1.0 / tan; } }();
            funcs[Functions.INDEX_ASIN] = new class extends _Function { constructor() { super("asin"); } apply(...args: number[]) { return Math.asin(args[0]); } }();
            funcs[Functions.INDEX_ACOS] = new class extends _Function { constructor() { super("acos"); } apply(...args: number[]) { return Math.acos(args[0]); } }();
            funcs[Functions.INDEX_ATAN] = new class extends _Function { constructor() { super("atan"); } apply(...args: number[]) { return Math.atan(args[0]); } }();
            
            // Hyperbolic functions
            funcs[Functions.INDEX_SINH] = new class extends _Function { constructor() { super("sinh"); } apply(...args: number[]) { return (Math.exp(args[0]) - Math.exp(-args[0])) / 2; } }();
            funcs[Functions.INDEX_COSH] = new class extends _Function { constructor() { super("cosh"); } apply(...args: number[]) { return (Math.exp(args[0]) + Math.exp(-args[0])) / 2; } }();
            funcs[Functions.INDEX_TANH] = new class extends _Function { constructor() { super("tanh"); } apply(...args: number[]) { const ex = Math.exp(args[0]); return (ex - ex) / (ex + ex); } }();
            
            // Reciprocal trigonometric functions
            funcs[Functions.INDEX_CSC] = new class extends _Function { constructor() { super("csc"); } apply(...args: number[]) { const sin = Math.sin(args[0]); if (sin === 0.0) throw new Error("Division by zero in cosecant!"); return 1.0 / sin; } }();
            funcs[Functions.INDEX_SEC] = new class extends _Function { constructor() { super("sec"); } apply(...args: number[]) { const cos = Math.cos(args[0]); if (cos === 0.0) throw new Error("Division by zero in secant!"); return 1.0 / cos; } }();
            funcs[Functions.INDEX_CSCH] = new class extends _Function { constructor() { super("csch"); } apply(...args: number[]) { if (args[0] === 0.0) return 0; return 1.0 / ((Math.exp(args[0]) - Math.exp(-args[0])) / 2); } }();
            funcs[Functions.INDEX_SECH] = new class extends _Function { constructor() { super("sech"); } apply(...args: number[]) { return 1.0 / ((Math.exp(args[0]) + Math.exp(-args[0])) / 2); } }();
            funcs[Functions.INDEX_COTH] = new class extends _Function { constructor() { super("coth"); } apply(...args: number[]) { return ((Math.exp(args[0]) + Math.exp(-args[0])) / 2) / ((Math.exp(args[0]) - Math.exp(-args[0])) / 2); } }();
            
            // Logarithmic functions
            funcs[Functions.INDEX_LOG] = new class extends _Function { constructor() { super("log"); } apply(...args: number[]) { return Math.log(args[0]); } }();
            funcs[Functions.INDEX_LOG2] = new class extends _Function { constructor() { super("log2"); } apply(...args: number[]) { return Math.log(args[0]) / Math.log(2.0); } }();
            funcs[Functions.INDEX_LOG10] = new class extends _Function { constructor() { super("log10"); } apply(...args: number[]) { return Math.log(args[0]) * Math.LOG10E; } }();
            funcs[Functions.INDEX_LOG1P] = new class extends _Function { constructor() { super("log1p"); } apply(...args: number[]) { return Math.log(args[0] + 1); } }();
            funcs[Functions.INDEX_LOGB] = new class extends _Function { constructor() { super("logb", 2); } apply(...args: number[]) { return Math.log(args[1]) / Math.log(args[0]); } }();
            
            // Basic math functions
            funcs[Functions.INDEX_ABS] = new class extends _Function { constructor() { super("abs"); } apply(...args: number[]) { return Math.abs(args[0]); } }();
            funcs[Functions.INDEX_CEIL] = new class extends _Function { constructor() { super("ceil"); } apply(...args: number[]) { return Math.ceil(args[0]); } }();
            funcs[Functions.INDEX_FLOOR] = new class extends _Function { constructor() { super("floor"); } apply(...args: number[]) { return Math.floor(args[0]); } }();
            funcs[Functions.INDEX_SQRT] = new class extends _Function { constructor() { super("sqrt"); } apply(...args: number[]) { return Math.sqrt(args[0]); } }();
            funcs[Functions.INDEX_CBRT] = new class extends _Function { constructor() { super("cbrt"); } apply(...args: number[]) { return Math.pow(args[0], 1/3); } }();
            funcs[Functions.INDEX_POW] = new class extends _Function { constructor() { super("pow", 2); } apply(...args: number[]) { return Math.pow(args[0], args[1]); } }();
            funcs[Functions.INDEX_EXP] = new class extends _Function { constructor() { super("exp", 1); } apply(...args: number[]) { return Math.exp(args[0]); } }();
            funcs[Functions.INDEX_EXPM1] = new class extends _Function { constructor() { super("expm1", 1); } apply(...args: number[]) { return Math.exp(args[0]) - 1; } }();
            funcs[Functions.INDEX_SGN] = new class extends _Function { constructor() { super("signum", 1); } apply(...args: number[]) { return args[0] > 0 ? 1 : args[0] < 0 ? -1 : 0; } }();
            
            // Angle conversion
            funcs[Functions.INDEX_TO_RADIAN] = new class extends _Function { constructor() { super("toradian"); } apply(...args: number[]) { return args[0] * Math.PI / 180; } }();
            funcs[Functions.INDEX_TO_DEGREE] = new class extends _Function { constructor() { super("todegree"); } apply(...args: number[]) { return args[0] * 180 / Math.PI; } }();
            
            // Utility functions
            funcs[Functions.INDEX_MIN] = new class extends _Function { constructor() { super("min", 2); } apply(...args: number[]) { return Math.min(args[0], args[1]); } }();
            funcs[Functions.INDEX_MAX] = new class extends _Function { constructor() { super("max", 2); } apply(...args: number[]) { return Math.max(args[0], args[1]); } }();
            funcs[Functions.INDEX_IF] = new class extends _Function { constructor() { super("if", 3); } apply(...args: number[]) { return args[0] !== 0 ? args[1] : args[2]; } }();
            
            return funcs;
        })();

        /**
         * Get the builtin function for a given name
         * 
         * @param {string} name te name of the function
         * @return {net.objecthunter.exp4j.func._Function} a Function instance
         */
        public static getBuiltinFunction(name: string): net.objecthunter.exp4j.func._Function {
            switch((name)) {
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

}
