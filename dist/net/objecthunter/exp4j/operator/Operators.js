/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
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
//# sourceMappingURL=Operators.js.map