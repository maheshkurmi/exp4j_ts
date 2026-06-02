/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
namespace net.objecthunter.exp4j {
    /**
     * Create a new ExpressionBuilder instance and initialize it with a given expression string.
     *
     * @param expression the expression to be parsed
     */
    export class ExpressionBuilder {
        /*private*/ expression: string;

        /*private*/ userFunctions: Map<string, net.objecthunter.exp4j.func._Function>;

        /*private*/ userOperators: Map<string, net.objecthunter.exp4j.operator.Operator>;

        /*private*/ variableNames: Set<string>;

        /*private*/ variableNameArray: string[];

        /*private*/ userFunctionNameArray: string[];

        /*private*/ implicitMul: boolean;

        public constructor(expression: string) {
            if (expression == null || expression.trim().length === 0){
                throw new Error("Expression can not be empty");
            }
            this.expression = expression;
            this.userOperators = new Map<string, net.objecthunter.exp4j.operator.Operator>();
            this.userFunctions = new Map<string, net.objecthunter.exp4j.func._Function>();
            this.variableNames = new Set<string>();
            this.variableNameArray = [];
            this.userFunctionNameArray = [];
            this.implicitMul = true;
        }

        /**
         * Add a custom function implementation available for use in the expression.
         */
        public _function(_function: net.objecthunter.exp4j.func._Function): ExpressionBuilder {
            const functionName: string = _function.getName();
            this.userFunctions.set(functionName, _function);
            if (!this.userFunctionNameArray.includes(functionName)) {
                this.userFunctionNameArray.push(functionName);
            }
            return this;
        }

        /**
         * Add multiple custom function implementations available for use in the expression.
         */
        public functions(..._functions: net.objecthunter.exp4j.func._Function[]): ExpressionBuilder {
            for (const f of _functions) {
                this._function(f);
            }
            return this;
        }

        /**
         * Declare variable names used in the expression.
         */
        public variables(...variableNames: string[]): ExpressionBuilder {
            for (const variableName of variableNames) {
                this.addVariableName(variableName);
            }
            return this;
        }

        /**
         * Declare a variable used in the expression.
         */
        public variable(variableName: string): ExpressionBuilder {
            this.addVariableName(variableName);
            return this;
        }

        addVariableName(variableName: string) {
            if (!this.variableNames.has(variableName)){
                this.variableNames.add(variableName);
                this.variableNameArray.push(variableName);
            }
        }

        public implicitMultiplication(enabled: boolean): ExpressionBuilder {
            this.implicitMul = enabled;
            return this;
        }

        addOperator(operator: net.objecthunter.exp4j.operator.Operator) {
            this.checkOperatorSymbol(operator);
            this.userOperators.set(operator.getSymbol(), operator);
        }

        checkOperatorSymbol(op: net.objecthunter.exp4j.operator.Operator) {
            const name: string = op.getSymbol();
            for (const ch of name) {
                if (!net.objecthunter.exp4j.operator.Operator.isAllowedOperatorChar(ch)){
                    throw new Error("The operator symbol '" + name + "' is invalid");
                }
            }
        }

        /**
         * Add multiple custom operators which should be available for use in the expression.
         */
        public operator(...operators: net.objecthunter.exp4j.operator.Operator[]): ExpressionBuilder {
            for (const o of operators) {
                this.addOperator(o);
            }
            return this;
        }

        /**
         * Build the Expression instance using the custom operators and functions set.
         */
        public build(): net.objecthunter.exp4j.Expression {
            if (this.expression.length === 0){
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
                if (net.objecthunter.exp4j.func.Functions.getBuiltinFunction(_var) != null || this.userFunctions.has(_var)){
                    throw new Error("A variable can not have the same name as a function [" + _var + "]");
                }
            }

            return new net.objecthunter.exp4j.Expression(
                net.objecthunter.exp4j.shuntingyard.ShuntingYard.convertToRPN(
                    this.expression,
                    this.userFunctions,
                    this.userOperators,
                    this.variableNames,
                    this.implicitMul
                ),
                this.userFunctionNameArray
            );
        }
    }

}
