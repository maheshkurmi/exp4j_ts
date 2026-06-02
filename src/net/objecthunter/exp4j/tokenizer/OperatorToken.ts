/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
namespace net.objecthunter.exp4j.tokenizer {
    /**
     * Create a new instance
     * @param {net.objecthunter.exp4j.operator.Operator} op the operator
     * @class
     * @extends net.objecthunter.exp4j.tokenizer.Token
     */
    export class OperatorToken extends net.objecthunter.exp4j.tokenizer.Token {
        /*private*/ operator: net.objecthunter.exp4j.operator.Operator;

        public constructor(op: net.objecthunter.exp4j.operator.Operator) {
            super(net.objecthunter.exp4j.tokenizer.Token.TOKEN_OPERATOR);
            if (this.operator === undefined) { this.operator = null; }
            if (op == null){
                throw new Error("Operator is unknown for token.");
            }
            this.operator = op;
        }

        /**
         * Get the operator for that token
         * @return {net.objecthunter.exp4j.operator.Operator} the operator
         */
        public getOperator(): net.objecthunter.exp4j.operator.Operator {
            return this.operator;
        }
    }

}

