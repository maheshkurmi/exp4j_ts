declare namespace net.objecthunter.exp4j {
    /**
     * Create a new ExpressionBuilder instance and initialize it with a given expression string.
     *
     * @param expression the expression to be parsed
     */
    class ExpressionBuilder {
        expression: string;
        userFunctions: Map<string, net.objecthunter.exp4j.func._Function>;
        userOperators: Map<string, net.objecthunter.exp4j.operator.Operator>;
        variableNames: Set<string>;
        variableNameArray: string[];
        userFunctionNameArray: string[];
        implicitMul: boolean;
        constructor(expression: string);
        /**
         * Add a custom function implementation available for use in the expression.
         */
        _function(_function: net.objecthunter.exp4j.func._Function): ExpressionBuilder;
        /**
         * Add multiple custom function implementations available for use in the expression.
         */
        functions(..._functions: net.objecthunter.exp4j.func._Function[]): ExpressionBuilder;
        /**
         * Declare variable names used in the expression.
         */
        variables(...variableNames: string[]): ExpressionBuilder;
        /**
         * Declare a variable used in the expression.
         */
        variable(variableName: string): ExpressionBuilder;
        addVariableName(variableName: string): void;
        implicitMultiplication(enabled: boolean): ExpressionBuilder;
        addOperator(operator: net.objecthunter.exp4j.operator.Operator): void;
        checkOperatorSymbol(op: net.objecthunter.exp4j.operator.Operator): void;
        /**
         * Add multiple custom operators which should be available for use in the expression.
         */
        operator(...operators: net.objecthunter.exp4j.operator.Operator[]): ExpressionBuilder;
        /**
         * Build the Expression instance using the custom operators and functions set.
         */
        build(): net.objecthunter.exp4j.Expression;
    }
}
