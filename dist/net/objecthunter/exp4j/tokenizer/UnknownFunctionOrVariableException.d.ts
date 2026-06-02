declare namespace net.objecthunter.exp4j.tokenizer {
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
    class UnknownFunctionOrVariableException {
        /**
         * Serial version UID.
         */
        static __net_objecthunter_exp4j_tokenizer_UnknownFunctionOrVariableException_serialVersionUID: number;
        message: string;
        expression: string;
        __token: string;
        position: number;
        constructor(expression: string, position: number, length: number);
        static token(expression: string, position: number, length: number): string;
        /**
         *
         * @return {string}
         */
        getMessage(): string;
        /**
         * @return {string} Expression which contains unknown function or variable
         */
        getExpression(): string;
        /**
         * @return {string} The name of unknown function or variable
         */
        getToken(): string;
        /**
         * @return {number} The position of unknown function or variable
         */
        getPosition(): number;
    }
}
