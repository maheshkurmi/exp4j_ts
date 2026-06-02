/// <reference path="./net/objecthunter/exp4j/ExpressionBuilder.d.ts" />
/// <reference path="./net/objecthunter/exp4j/Expression.d.ts" />
/// <reference path="./net/objecthunter/exp4j/ValidationResult.d.ts" />
/// <reference path="./net/objecthunter/exp4j/function/_Function.d.ts" />
/// <reference path="./net/objecthunter/exp4j/function/Functions.d.ts" />
/// <reference path="./net/objecthunter/exp4j/operator/Operator.d.ts" />
/// <reference path="./net/objecthunter/exp4j/operator/Operators.d.ts" />

declare namespace net.objecthunter.exp4j {
    /**
     * Main entry point for building mathematical expressions
     */
    export { ExpressionBuilder, Expression, ValidationResult };
}

export = net.objecthunter.exp4j;
export as namespace exp4j;
