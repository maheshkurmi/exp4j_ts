/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
namespace net.objecthunter.exp4j.tokenizer {
    /**
     * Create a new instance
     * @param {string} name the name of the setVariable
     * @class
     * @extends net.objecthunter.exp4j.tokenizer.Token
     */
    export class VariableToken extends net.objecthunter.exp4j.tokenizer.Token {
        /*private*/ name: string;

        /**
         * Get the name of the setVariable
         * @return {string} the name
         */
        public getName(): string {
            return this.name;
        }

        public constructor(name: string) {
            super(net.objecthunter.exp4j.tokenizer.Token.TOKEN_VARIABLE);
            if (this.name === undefined) { this.name = null; }
            this.name = name;
        }
    }

}

