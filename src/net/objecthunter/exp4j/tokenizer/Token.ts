/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
namespace net.objecthunter.exp4j.tokenizer {
    /**
     * Abstract class for tokens used by exp4j to tokenize expressions
     * @class
     */
    export abstract class Token {
        public static TOKEN_NUMBER: number = 1;

        public static TOKEN_OPERATOR: number = 2;

        public static TOKEN_FUNCTION: number = 3;

        public static TOKEN_PARENTHESES_OPEN: number = 4;

        public static TOKEN_PARENTHESES_CLOSE: number = 5;

        public static TOKEN_VARIABLE: number = 6;

        public static TOKEN_SEPARATOR: number = 7;

        type: number;

        constructor(type: number) {
            if (this.type === undefined) { this.type = 0; }
            this.type = type;
        }

        public getType(): number {
            return this.type;
        }
    }

}

