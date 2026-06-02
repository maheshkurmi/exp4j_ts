declare namespace net.objecthunter.exp4j.shuntingyard {
    /**
     * Shunting yard implementation to convert infix to reverse polish notation
     * @class
     */
    class ShuntingYard {
        /**
         * Convert a Set of tokens from infix to reverse polish notation
         * @param {string} expression the expression to convert
         * @param {Map} userFunctions the custom functions used
         * @param {Map} userOperators the custom operators used
         * @param {Set} variableNames the variable names used in the expression
         * @param {boolean} implicitMultiplication set to fasle to turn off implicit multiplication
         * @return {net.objecthunter.exp4j.tokenizer.Token[]} a {@link net.objecthunter.exp4j.tokenizer.Token} array containing the result
         */
        static convertToRPN(expression: string, userFunctions: Map<string, net.objecthunter.exp4j.func._Function>, userOperators: Map<string, net.objecthunter.exp4j.operator.Operator>, variableNames: Set<string>, implicitMultiplication: boolean): net.objecthunter.exp4j.tokenizer.Token[];
    }
    namespace ShuntingYard {
        class TokenStack {
            data: net.objecthunter.exp4j.tokenizer.Token[];
            size: number;
            push(token: net.objecthunter.exp4j.tokenizer.Token): void;
            pop(): net.objecthunter.exp4j.tokenizer.Token;
            peek(): net.objecthunter.exp4j.tokenizer.Token;
            empty(): boolean;
            isEmpty(): boolean;
            grow(): void;
            constructor();
        }
        class TokenList {
            data: net.objecthunter.exp4j.tokenizer.Token[];
            size: number;
            add(token: net.objecthunter.exp4j.tokenizer.Token): void;
            toArray(): net.objecthunter.exp4j.tokenizer.Token[];
            grow(): void;
            constructor();
        }
    }
}
