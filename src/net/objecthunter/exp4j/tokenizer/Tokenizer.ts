/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
namespace net.objecthunter.exp4j.tokenizer {
    export class Tokenizer {
        /*private*/ expression: string[];

        /*private*/ expressionLength: number;

        /*private*/ userFunctions: Map<string, net.objecthunter.exp4j.func._Function>;

        /*private*/ userOperators: Map<string, net.objecthunter.exp4j.operator.Operator>;

        /*private*/ variableNames: Set<string>;

        /*private*/ implicitMultiplication: boolean;

        /*private*/ pos: number;

        /*private*/ lastToken: net.objecthunter.exp4j.tokenizer.Token | null;

        public constructor(
            expression: string,
            userFunctions: Map<string, net.objecthunter.exp4j.func._Function>,
            userOperators: Map<string, net.objecthunter.exp4j.operator.Operator>,
            variableNames: Set<string>
        );

        public constructor(
            expression: string,
            userFunctions: Map<string, net.objecthunter.exp4j.func._Function>,
            userOperators: Map<string, net.objecthunter.exp4j.operator.Operator>,
            variableNames: Set<string>,
            implicitMultiplication: boolean
        );

        public constructor(
            expression: string,
            userFunctions: Map<string, net.objecthunter.exp4j.func._Function>,
            userOperators: Map<string, net.objecthunter.exp4j.operator.Operator>,
            variableNames: Set<string>,
            implicitMultiplication: boolean = true
        ) {
            this.pos = 0;
            this.lastToken = null;
            this.expression = expression.trim().split('');
            this.expressionLength = this.expression.length;
            this.userFunctions = userFunctions;
            this.userOperators = userOperators;
            this.variableNames = variableNames;
            this.implicitMultiplication = implicitMultiplication;
        }

        public hasNext(): boolean {
            return this.expression.length > this.pos;
        }

        public nextToken(): net.objecthunter.exp4j.tokenizer.Token {
            let ch: string = this.expression[this.pos];
            while (Tokenizer.isWhiteSpace(ch.charCodeAt(0))) {
                ch = this.expression[++this.pos];
            }

            if (Tokenizer.isDigit(ch.charCodeAt(0)) || ch === '.') {
                if (this.lastToken != null) {
                    const lastType = this.lastToken.getType();
                    if (lastType === net.objecthunter.exp4j.tokenizer.Token.TOKEN_NUMBER) {
                        throw new Error("Unable to parse char '" + ch + "' (Code:" + ch.charCodeAt(0) + ") at [" + this.pos + "]");
                    }
                    if (this.needsImplicitMultiplication(lastType)) {
                        this.lastToken = new net.objecthunter.exp4j.tokenizer.OperatorToken(
                            net.objecthunter.exp4j.operator.Operators.getBuiltinOperator('*', 2)
                        );
                        return this.lastToken;
                    }
                }
                return this.parseNumberToken(ch);
            }

            if (this.isArgumentSeparator(ch)) {
                return this.parseArgumentSeparatorToken();
            }

            if (this.isOpenParentheses(ch)) {
                if (this.lastToken != null && this.needsImplicitMultiplication(this.lastToken.getType())) {
                    this.lastToken = new net.objecthunter.exp4j.tokenizer.OperatorToken(
                        net.objecthunter.exp4j.operator.Operators.getBuiltinOperator('*', 2)
                    );
                    return this.lastToken;
                }
                return this.parseParentheses(true);
            }

            if (this.isCloseParentheses(ch)) {
                return this.parseParentheses(false);
            }

            if (net.objecthunter.exp4j.operator.Operator.isAllowedOperatorChar(ch)) {
                return this.parseOperatorToken();
            }

            if (Tokenizer.isAlphabetic(ch.charCodeAt(0)) || ch === '_') {
                if (this.lastToken != null && this.needsImplicitMultiplication(this.lastToken.getType())) {
                    this.lastToken = new net.objecthunter.exp4j.tokenizer.OperatorToken(
                        net.objecthunter.exp4j.operator.Operators.getBuiltinOperator('*', 2)
                    );
                    return this.lastToken;
                }
                return this.parseFunctionOrVariable();
            }

            throw new Error("Unable to parse char '" + ch + "' (Code:" + ch.charCodeAt(0) + ") at [" + this.pos + "]");
        }

        /*private*/ needsImplicitMultiplication(lastTokenType: number): boolean {
            return this.implicitMultiplication
                && lastTokenType !== net.objecthunter.exp4j.tokenizer.Token.TOKEN_OPERATOR
                && lastTokenType !== net.objecthunter.exp4j.tokenizer.Token.TOKEN_PARENTHESES_OPEN
                && lastTokenType !== net.objecthunter.exp4j.tokenizer.Token.TOKEN_FUNCTION
                && lastTokenType !== net.objecthunter.exp4j.tokenizer.Token.TOKEN_SEPARATOR;
        }

        /*private*/ parseArgumentSeparatorToken(): net.objecthunter.exp4j.tokenizer.Token {
            this.pos++;
            this.lastToken = new net.objecthunter.exp4j.tokenizer.ArgumentSeparatorToken();
            return this.lastToken;
        }

        /*private*/ isArgumentSeparator(ch: string): boolean {
            return ch === ',';
        }

        /*private*/ parseParentheses(open: boolean): net.objecthunter.exp4j.tokenizer.Token {
            this.lastToken = open
                ? new net.objecthunter.exp4j.tokenizer.OpenParenthesesToken()
                : new net.objecthunter.exp4j.tokenizer.CloseParenthesesToken();
            this.pos++;
            return this.lastToken;
        }

        /*private*/ isOpenParentheses(ch: string): boolean {
            return ch === '(' || ch === '{' || ch === '[';
        }

        /*private*/ isCloseParentheses(ch: string): boolean {
            return ch === ')' || ch === '}' || ch === ']';
        }

        /*private*/ parseFunctionOrVariable(): net.objecthunter.exp4j.tokenizer.Token {
            const offset: number = this.pos;
            let len: number = 1;
            let lastValidLen: number = 1;
            let lastValidToken: net.objecthunter.exp4j.tokenizer.Token | null = null;

            if (this.isEndOfExpression(offset)) {
                this.pos++;
            }

            let testPos = offset + len - 1;
            while (!this.isEndOfExpression(testPos) && Tokenizer.isVariableOrFunctionCharacter(this.expression[testPos].charCodeAt(0))) {
                const name: string = this.expression.join('').substring(offset, offset + len);
                if (this.variableNames != null && this.variableNames.has(name)) {
                    lastValidLen = len;
                    lastValidToken = new net.objecthunter.exp4j.tokenizer.VariableToken(name);
                } else {
                    const f = this.getFunction(name);
                    if (f != null) {
                        lastValidLen = len;
                        lastValidToken = new net.objecthunter.exp4j.tokenizer.FunctionToken(f);
                    }
                }
                len++;
                testPos = offset + len - 1;
            }

            if (lastValidToken == null) {
                throw new Error("UnknownFunctionOrVariableException " + String(this.expression) + " at position " + this.pos);
            }

            this.pos += lastValidLen;
            this.lastToken = lastValidToken;
            return this.lastToken;
        }

        /*private*/ getFunction(name: string): net.objecthunter.exp4j.func._Function | null {
            let f: net.objecthunter.exp4j.func._Function | undefined | null = null;
            if (this.userFunctions != null) {
                f = this.userFunctions.get(name);
            }
            if (f == null) {
                f = net.objecthunter.exp4j.func.Functions.getBuiltinFunction(name);
            }
            return f;
        }

        /*private*/ parseOperatorToken(): net.objecthunter.exp4j.tokenizer.Token {
            const offset: number = this.pos;
            let len: number = 1;
            let lastValid: net.objecthunter.exp4j.operator.Operator | null = null;

            while (!this.isEndOfExpression(offset + len) && net.objecthunter.exp4j.operator.Operator.isAllowedOperatorChar(this.expression[offset + len])) {
                len++;
            }

            let validLen = 0;
            for (let candidateLen = len; candidateLen > 0; candidateLen--) {
                const op = this.getOperator(this.expression.join('').substring(offset, offset + candidateLen));
                if (op != null) {
                    lastValid = op;
                    validLen = candidateLen;
                    break;
                }
            }

            if (lastValid == null) {
                throw new Error("Unable to parse operator at [" + offset + "]");
            }

            this.pos += validLen;
            this.lastToken = new net.objecthunter.exp4j.tokenizer.OperatorToken(lastValid);
            return this.lastToken;
        }

        /*private*/ getOperator(symbol: string): net.objecthunter.exp4j.operator.Operator | null {
            let op: net.objecthunter.exp4j.operator.Operator | undefined | null = null;
            if (this.userOperators != null) {
                op = this.userOperators.get(symbol);
            }

            if (op == null && symbol.length === 1) {
                let argc = 2;
                if (this.lastToken == null) {
                    argc = 1;
                } else {
                    const lastTokenType = this.lastToken.getType();
                    if (lastTokenType === net.objecthunter.exp4j.tokenizer.Token.TOKEN_PARENTHESES_OPEN
                        || lastTokenType === net.objecthunter.exp4j.tokenizer.Token.TOKEN_SEPARATOR) {
                        argc = 1;
                    } else if (lastTokenType === net.objecthunter.exp4j.tokenizer.Token.TOKEN_OPERATOR) {
                        const lastOp = (<net.objecthunter.exp4j.tokenizer.OperatorToken>this.lastToken).getOperator();
                        if (lastOp.getNumOperands() === 2 || (lastOp.getNumOperands() === 1 && !lastOp.isLeftAssociative())) {
                            argc = 1;
                        }
                    }
                }
                op = net.objecthunter.exp4j.operator.Operators.getBuiltinOperator(symbol.charAt(0), argc);
            }

            return op;
        }

        /*private*/ parseNumberToken(firstChar: string): net.objecthunter.exp4j.tokenizer.Token {
            const offset = this.pos;
            let len = 1;
            this.pos++;

            if (this.isEndOfExpression(offset + len)) {
                this.lastToken = new net.objecthunter.exp4j.tokenizer.NumberToken(parseFloat(String(firstChar)));
                return this.lastToken;
            }

            while (
                !this.isEndOfExpression(offset + len)
                && Tokenizer.isNumeric(
                    this.expression[offset + len],
                    this.expression[offset + len - 1] === 'e' || this.expression[offset + len - 1] === 'E'
                )
            ) {
                len++;
                this.pos++;
            }

            if (this.expression[offset + len - 1] === 'e' || this.expression[offset + len - 1] === 'E') {
                len--;
                this.pos--;
            }

            this.lastToken = new net.objecthunter.exp4j.tokenizer.NumberToken(this.expression, offset, len);
            return this.lastToken;
        }

        /*private*/ static isNumeric(ch: string, lastCharE: boolean): boolean {
            return Tokenizer.isDigit(ch.charCodeAt(0))
                || ch === '.'
                || ch === 'e'
                || ch === 'E'
                || (lastCharE && (ch === '-' || ch === '+'));
        }

        public static isAlphabetic(codePoint: number): boolean {
            return Tokenizer.isLetter(codePoint);
        }

        public static isVariableOrFunctionCharacter(codePoint: number): boolean {
            return Tokenizer.isLetter(codePoint)
                || Tokenizer.isDigit(codePoint)
                || codePoint === '_'.charCodeAt(0)
                || codePoint === '.'.charCodeAt(0);
        }

        /*private*/ isEndOfExpression(offset: number): boolean {
            return this.expressionLength <= offset;
        }

        /*private*/ static isLetter(c: number): boolean {
            return (c >= 97 && c <= 122) || (c >= 65 && c <= 90);
        }

        /*private*/ static isWhiteSpace(c: number): boolean {
            return c <= 32;
        }

        /*private*/ static isDigit(c: number): boolean {
            return c >= 48 && c <= 57;
        }
    }

}
