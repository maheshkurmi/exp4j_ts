declare namespace net.objecthunter.exp4j.operator {
    abstract class Operators {
        static INDEX_LOGICAL_OR: number;
        static INDEX_LOGICAL_AND: number;
        static INDEX_EQUAL_TO: number;
        static INDEX_GREATER_THAN: number;
        static INDEX_LESS_THAN: number;
        static INDEX_ADDITION: number;
        static INDEX_SUBTRACTION: number;
        static INDEX_MULTIPLICATION: number;
        static INDEX_DIVISION: number;
        static INDEX_POWER: number;
        static INDEX_MODULO: number;
        static INDEX_UNARY_MINUS: number;
        static INDEX_UNARY_PLUS: number;
        static INDEX_LOGICAL_NOT: number;
        static BUILT_IN_OPERATORS: net.objecthunter.exp4j.operator.Operator[];
        static EPSILON: number;
        static getBuiltinOperator(symbol: string, numArguments: number): net.objecthunter.exp4j.operator.Operator;
        static approxEqual(a: number, b: number): boolean;
    }
}
