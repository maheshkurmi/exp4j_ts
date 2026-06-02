declare namespace net.objecthunter.exp4j.tokenizer {
    class Tokenizer {
        expression: string[];
        expressionLength: number;
        userFunctions: Map<string, net.objecthunter.exp4j.func._Function>;
        userOperators: Map<string, net.objecthunter.exp4j.operator.Operator>;
        variableNames: Set<string>;
        implicitMultiplication: boolean;
        pos: number;
        lastToken: net.objecthunter.exp4j.tokenizer.Token | null;
        constructor(expression: string, userFunctions: Map<string, net.objecthunter.exp4j.func._Function>, userOperators: Map<string, net.objecthunter.exp4j.operator.Operator>, variableNames: Set<string>);
        constructor(expression: string, userFunctions: Map<string, net.objecthunter.exp4j.func._Function>, userOperators: Map<string, net.objecthunter.exp4j.operator.Operator>, variableNames: Set<string>, implicitMultiplication: boolean);
        hasNext(): boolean;
        nextToken(): net.objecthunter.exp4j.tokenizer.Token;
        needsImplicitMultiplication(lastTokenType: number): boolean;
        parseArgumentSeparatorToken(): net.objecthunter.exp4j.tokenizer.Token;
        isArgumentSeparator(ch: string): boolean;
        parseParentheses(open: boolean): net.objecthunter.exp4j.tokenizer.Token;
        isOpenParentheses(ch: string): boolean;
        isCloseParentheses(ch: string): boolean;
        parseFunctionOrVariable(): net.objecthunter.exp4j.tokenizer.Token;
        getFunction(name: string): net.objecthunter.exp4j.func._Function | null;
        parseOperatorToken(): net.objecthunter.exp4j.tokenizer.Token;
        getOperator(symbol: string): net.objecthunter.exp4j.operator.Operator | null;
        parseNumberToken(firstChar: string): net.objecthunter.exp4j.tokenizer.Token;
        static isNumeric(ch: string, lastCharE: boolean): boolean;
        static isAlphabetic(codePoint: number): boolean;
        static isVariableOrFunctionCharacter(codePoint: number): boolean;
        isEndOfExpression(offset: number): boolean;
        static isLetter(c: number): boolean;
        static isWhiteSpace(c: number): boolean;
        static isDigit(c: number): boolean;
    }
}
