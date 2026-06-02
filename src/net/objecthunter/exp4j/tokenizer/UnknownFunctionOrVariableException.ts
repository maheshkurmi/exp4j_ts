/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
namespace net.objecthunter.exp4j.tokenizer {
    /**
     * This exception is being thrown whenever {@link Tokenizer} finds unknown function or variable.
     * 
     * @author Bartosz Firyn (sarxos)
     * @param {string} expression
     * @param {number} position
     * @param {number} length
     * @class
     * @extends Error
     */
    export class UnknownFunctionOrVariableException {
        /**
         * Serial version UID.
         */
        static __net_objecthunter_exp4j_tokenizer_UnknownFunctionOrVariableException_serialVersionUID: number = 1;

        /*private*/ message: string;

        /*private*/ expression: string;

        /*private*/ __token: string;

        /*private*/ position: number;

        public constructor(expression: string, position: number, length: number) {
            (<any>Object).setPrototypeOf(this, UnknownFunctionOrVariableException.prototype);
            if (this.message === undefined) { this.message = null; }
            if (this.expression === undefined) { this.expression = null; }
            if (this.__token === undefined) { this.__token = null; }
            if (this.position === undefined) { this.position = 0; }
            this.expression = expression;
            this.__token = UnknownFunctionOrVariableException.token(expression, position, length);
            this.position = position;
            this.message = "Unknown function or variable \'" + this.__token + "\' at pos " + position + " in expression \'" + expression + "\'";
        }

        /*private*/ static token(expression: string, position: number, length: number): string {
            const len: number = expression.length;
            let end: number = position + length - 1;
            if (len < end){
                end = len;
            }
            return expression.substring(position, end);
        }

        /**
         * 
         * @return {string}
         */
        public getMessage(): string {
            return this.message;
        }

        /**
         * @return {string} Expression which contains unknown function or variable
         */
        public getExpression(): string {
            return this.expression;
        }

        /**
         * @return {string} The name of unknown function or variable
         */
        public getToken(): string {
            return this.__token;
        }

        /**
         * @return {number} The position of unknown function or variable
         */
        public getPosition(): number {
            return this.position;
        }
    }

}

