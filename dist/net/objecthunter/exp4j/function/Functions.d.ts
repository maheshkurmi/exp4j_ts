declare namespace net.objecthunter.exp4j.func {
    /**
     * Class representing the builtin functions available for use in expressions
     * @class
     */
    class Functions {
        static INDEX_SIN: number;
        static INDEX_COS: number;
        static INDEX_TAN: number;
        static INDEX_CSC: number;
        static INDEX_SEC: number;
        static INDEX_COT: number;
        static INDEX_SINH: number;
        static INDEX_COSH: number;
        static INDEX_TANH: number;
        static INDEX_CSCH: number;
        static INDEX_SECH: number;
        static INDEX_COTH: number;
        static INDEX_ASIN: number;
        static INDEX_ACOS: number;
        static INDEX_ATAN: number;
        static INDEX_SQRT: number;
        static INDEX_CBRT: number;
        static INDEX_ABS: number;
        static INDEX_CEIL: number;
        static INDEX_FLOOR: number;
        static INDEX_POW: number;
        static INDEX_EXP: number;
        static INDEX_EXPM1: number;
        static INDEX_LOG10: number;
        static INDEX_LOG2: number;
        static INDEX_LOG: number;
        static INDEX_LOG1P: number;
        static INDEX_LOGB: number;
        static INDEX_SGN: number;
        static INDEX_TO_RADIAN: number;
        static INDEX_TO_DEGREE: number;
        static INDEX_MIN: number;
        static INDEX_MAX: number;
        static INDEX_IF: number;
        static BUILT_IN_FUNCTIONS: net.objecthunter.exp4j.func._Function[];
        /**
         * Get the builtin function for a given name
         *
         * @param {string} name te name of the function
         * @return {net.objecthunter.exp4j.func._Function} a Function instance
         */
        static getBuiltinFunction(name: string): net.objecthunter.exp4j.func._Function;
    }
}
