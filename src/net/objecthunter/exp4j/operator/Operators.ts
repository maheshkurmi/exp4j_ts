/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
namespace net.objecthunter.exp4j.operator {
    export abstract class Operators {
        static INDEX_LOGICAL_OR: number = 0;

        static INDEX_LOGICAL_AND: number = 1;

        static INDEX_EQUAL_TO: number = 2;

        static INDEX_GREATER_THAN: number = 3;

        static INDEX_LESS_THAN: number = 4;

        static INDEX_ADDITION: number = 5;

        static INDEX_SUBTRACTION: number = 6;

        static INDEX_MULTIPLICATION: number = 7;

        static INDEX_DIVISION: number = 8;

        static INDEX_POWER: number = 9;

        static INDEX_MODULO: number = 10;

        static INDEX_UNARY_MINUS: number = 11;

        static INDEX_UNARY_PLUS: number = 12;

        static INDEX_LOGICAL_NOT: number = 13;

        static BUILT_IN_OPERATORS: net.objecthunter.exp4j.operator.Operator[] = (() => {
            const ops: net.objecthunter.exp4j.operator.Operator[] = new Array(14);
            
            // Logical operators
            ops[Operators.INDEX_LOGICAL_OR] = new class extends Operator { constructor() { super("|", 2, true, Operator.PRECEDENCE_LOGICAL); } apply(...args: number[]) { return (Operators.approxEqual(args[0], 0) && Operators.approxEqual(args[1], 0)) ? 0 : 1; } }();
            ops[Operators.INDEX_LOGICAL_AND] = new class extends Operator { constructor() { super("&", 2, true, Operator.PRECEDENCE_LOGICAL); } apply(...args: number[]) { return (Operators.approxEqual(args[0], 1) && Operators.approxEqual(args[1], 1)) ? 1 : 0; } }();
            ops[Operators.INDEX_LOGICAL_NOT] = new class extends Operator { constructor() { super("!", 1, false, Operator.PRECEDENCE_LOGICAL_NOT); } apply(...args: number[]) { return args[0] === 0 ? 1 : 0; } }();
            
            // Comparison operators
            ops[Operators.INDEX_EQUAL_TO] = new class extends Operator { constructor() { super("=", 2, true, Operator.PRECEDENCE_COMPARISION); } apply(...args: number[]) { return Operators.approxEqual(args[0], args[1]) ? 1 : 0; } }();
            ops[Operators.INDEX_GREATER_THAN] = new class extends Operator { constructor() { super(">", 2, true, Operator.PRECEDENCE_COMPARISION); } apply(...args: number[]) { return args[0] > args[1] ? 1 : 0; } }();
            ops[Operators.INDEX_LESS_THAN] = new class extends Operator { constructor() { super("<", 2, true, Operator.PRECEDENCE_COMPARISION); } apply(...args: number[]) { return args[0] < args[1] ? 1 : 0; } }();
            
            // Arithmetic operators
            ops[Operators.INDEX_ADDITION] = new class extends Operator { constructor() { super("+", 2, true, Operator.PRECEDENCE_ADDITION); } apply(...args: number[]) { return args[0] + args[1]; } }();
            ops[Operators.INDEX_SUBTRACTION] = new class extends Operator { constructor() { super("-", 2, true, Operator.PRECEDENCE_ADDITION); } apply(...args: number[]) { return args[0] - args[1]; } }();
            ops[Operators.INDEX_MULTIPLICATION] = new class extends Operator { constructor() { super("*", 2, true, Operator.PRECEDENCE_MULTIPLICATION); } apply(...args: number[]) { return args[0] * args[1]; } }();
            ops[Operators.INDEX_DIVISION] = new class extends Operator { constructor() { super("/", 2, true, Operator.PRECEDENCE_DIVISION); } apply(...args: number[]) { if (args[1] === 0.0) throw new Error("Division by zero!"); return args[0] / args[1]; } }();
            ops[Operators.INDEX_MODULO] = new class extends Operator { constructor() { super("%", 2, true, Operator.PRECEDENCE_MODULO); } apply(...args: number[]) { if (args[1] === 0.0) throw new Error("Division by zero!"); return args[0] % args[1]; } }();
            ops[Operators.INDEX_POWER] = new class extends Operator { constructor() { super("^", 2, false, Operator.PRECEDENCE_POWER); } apply(...args: number[]) { return Math.pow(args[0], args[1]); } }();
            
            // Unary operators
            ops[Operators.INDEX_UNARY_MINUS] = new class extends Operator { constructor() { super("-", 1, false, Operator.PRECEDENCE_UNARY_MINUS); } apply(...args: number[]) { return -args[0]; } }();
            ops[Operators.INDEX_UNARY_PLUS] = new class extends Operator { constructor() { super("+", 1, false, Operator.PRECEDENCE_UNARY_PLUS); } apply(...args: number[]) { return args[0]; } }();
            
            return ops;
        })();

        static EPSILON: number = 1.0E-9;

        public static getBuiltinOperator(symbol: string, numArguments: number): net.objecthunter.exp4j.operator.Operator {
            switch((symbol).charCodeAt(0)) {
            case 43 /* '+' */:
                if (numArguments !== 1){
                    return Operators.BUILT_IN_OPERATORS[Operators.INDEX_ADDITION];
                }
                return Operators.BUILT_IN_OPERATORS[Operators.INDEX_UNARY_PLUS];
            case 45 /* '-' */:
                if (numArguments !== 1){
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

        /*private*/ static approxEqual(a: number, b: number): boolean {
            return Math.abs(a - b) < Operators.EPSILON;
        }
    }

}
