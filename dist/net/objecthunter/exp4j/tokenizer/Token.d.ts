declare namespace net.objecthunter.exp4j.tokenizer {
    /**
     * Abstract class for tokens used by exp4j to tokenize expressions
     * @class
     */
    abstract class Token {
        static TOKEN_NUMBER: number;
        static TOKEN_OPERATOR: number;
        static TOKEN_FUNCTION: number;
        static TOKEN_PARENTHESES_OPEN: number;
        static TOKEN_PARENTHESES_CLOSE: number;
        static TOKEN_VARIABLE: number;
        static TOKEN_SEPARATOR: number;
        type: number;
        constructor(type: number);
        getType(): number;
    }
}
