declare namespace net.objecthunter.exp4j.tokenizer {
    /**
     * Create a new instance
     * @param {net.objecthunter.exp4j.operator.Operator} op the operator
     * @class
     * @extends net.objecthunter.exp4j.tokenizer.Token
     */
    class OperatorToken extends net.objecthunter.exp4j.tokenizer.Token {
        operator: net.objecthunter.exp4j.operator.Operator;
        constructor(op: net.objecthunter.exp4j.operator.Operator);
        /**
         * Get the operator for that token
         * @return {net.objecthunter.exp4j.operator.Operator} the operator
         */
        getOperator(): net.objecthunter.exp4j.operator.Operator;
    }
}
