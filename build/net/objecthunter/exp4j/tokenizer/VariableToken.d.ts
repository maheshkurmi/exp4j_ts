declare namespace net.objecthunter.exp4j.tokenizer {
    /**
     * Create a new instance
     * @param {string} name the name of the setVariable
     * @class
     * @extends net.objecthunter.exp4j.tokenizer.Token
     */
    class VariableToken extends net.objecthunter.exp4j.tokenizer.Token {
        name: string;
        /**
         * Get the name of the setVariable
         * @return {string} the name
         */
        getName(): string;
        constructor(name: string);
    }
}
