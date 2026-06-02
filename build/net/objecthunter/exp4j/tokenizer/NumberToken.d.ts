declare namespace net.objecthunter.exp4j.tokenizer {
    /**
     * Represents a number in the expression.
     */
    class NumberToken extends net.objecthunter.exp4j.tokenizer.Token {
        value: number;
        constructor(value: number);
        constructor(expression: string[], offset: number, len: number);
        /**
         * Get the value of the number.
         */
        getValue(): number;
    }
}
