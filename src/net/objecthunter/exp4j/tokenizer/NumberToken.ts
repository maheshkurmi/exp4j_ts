/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
namespace net.objecthunter.exp4j.tokenizer {
    /**
     * Represents a number in the expression.
     */
    export class NumberToken extends net.objecthunter.exp4j.tokenizer.Token {
        /*private*/ value: number;

        public constructor(value: number);

        public constructor(expression: string[], offset: number, len: number);

        public constructor(valueOrExpression: number | string[], offset?: number, len?: number) {
            super(net.objecthunter.exp4j.tokenizer.Token.TOKEN_NUMBER);
            if (typeof valueOrExpression === "number") {
                this.value = valueOrExpression;
                return;
            }

            const expression = valueOrExpression;
            const parsed = parseFloat(expression.join("").substring(offset!, offset! + len!));
            this.value = parsed;
        }

        /**
         * Get the value of the number.
         */
        public getValue(): number {
            return this.value;
        }
    }

}
