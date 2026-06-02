/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
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