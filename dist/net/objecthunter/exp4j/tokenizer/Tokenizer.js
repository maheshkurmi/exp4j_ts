/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
var net;
(function (net) {
    var objecthunter;
    (function (objecthunter) {
        var exp4j;
        (function (exp4j) {
            var tokenizer;
            (function (tokenizer) {
                class Tokenizer {
                    constructor(expression, userFunctions, userOperators, variableNames, implicitMultiplication = true) {
                        this.pos = 0;
                        this.lastToken = null;
                        this.expression = expression.trim().split('');
                        this.expressionLength = this.expression.length;
                        this.userFunctions = userFunctions;
                        this.userOperators = userOperators;
                        this.variableNames = variableNames;
                        this.implicitMultiplication = implicitMultiplication;
                    }
                    hasNext() {
                        return this.expression.length > this.pos;
                    }
                    nextToken() {
                        let ch = this.expression[this.pos];
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
                                    this.lastToken = new net.objecthunter.exp4j.tokenizer.OperatorToken(net.objecthunter.exp4j.operator.Operators.getBuiltinOperator('*', 2));
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
                                this.lastToken = new net.objecthunter.exp4j.tokenizer.OperatorToken(net.objecthunter.exp4j.operator.Operators.getBuiltinOperator('*', 2));
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
                                this.lastToken = new net.objecthunter.exp4j.tokenizer.OperatorToken(net.objecthunter.exp4j.operator.Operators.getBuiltinOperator('*', 2));
                                return this.lastToken;
                            }
                            return this.parseFunctionOrVariable();
                        }
                        throw new Error("Unable to parse char '" + ch + "' (Code:" + ch.charCodeAt(0) + ") at [" + this.pos + "]");
                    }
                    /*private*/ needsImplicitMultiplication(lastTokenType) {
                        return this.implicitMultiplication
                            && lastTokenType !== net.objecthunter.exp4j.tokenizer.Token.TOKEN_OPERATOR
                            && lastTokenType !== net.objecthunter.exp4j.tokenizer.Token.TOKEN_PARENTHESES_OPEN
                            && lastTokenType !== net.objecthunter.exp4j.tokenizer.Token.TOKEN_FUNCTION
                            && lastTokenType !== net.objecthunter.exp4j.tokenizer.Token.TOKEN_SEPARATOR;
                    }
                    /*private*/ parseArgumentSeparatorToken() {
                        this.pos++;
                        this.lastToken = new net.objecthunter.exp4j.tokenizer.ArgumentSeparatorToken();
                        return this.lastToken;
                    }
                    /*private*/ isArgumentSeparator(ch) {
                        return ch === ',';
                    }
                    /*private*/ parseParentheses(open) {
                        this.lastToken = open
                            ? new net.objecthunter.exp4j.tokenizer.OpenParenthesesToken()
                            : new net.objecthunter.exp4j.tokenizer.CloseParenthesesToken();
                        this.pos++;
                        return this.lastToken;
                    }
                    /*private*/ isOpenParentheses(ch) {
                        return ch === '(' || ch === '{' || ch === '[';
                    }
                    /*private*/ isCloseParentheses(ch) {
                        return ch === ')' || ch === '}' || ch === ']';
                    }
                    /*private*/ parseFunctionOrVariable() {
                        const offset = this.pos;
                        let len = 1;
                        let lastValidLen = 1;
                        let lastValidToken = null;
                        if (this.isEndOfExpression(offset)) {
                            this.pos++;
                        }
                        let testPos = offset + len - 1;
                        while (!this.isEndOfExpression(testPos) && Tokenizer.isVariableOrFunctionCharacter(this.expression[testPos].charCodeAt(0))) {
                            const name = this.expression.join('').substring(offset, offset + len);
                            if (this.variableNames != null && this.variableNames.has(name)) {
                                lastValidLen = len;
                                lastValidToken = new net.objecthunter.exp4j.tokenizer.VariableToken(name);
                            }
                            else {
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
                    /*private*/ getFunction(name) {
                        let f = null;
                        if (this.userFunctions != null) {
                            f = this.userFunctions.get(name);
                        }
                        if (f == null) {
                            f = net.objecthunter.exp4j.func.Functions.getBuiltinFunction(name);
                        }
                        return f;
                    }
                    /*private*/ parseOperatorToken() {
                        const offset = this.pos;
                        let len = 1;
                        let lastValid = null;
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
                    /*private*/ getOperator(symbol) {
                        let op = null;
                        if (this.userOperators != null) {
                            op = this.userOperators.get(symbol);
                        }
                        if (op == null && symbol.length === 1) {
                            let argc = 2;
                            if (this.lastToken == null) {
                                argc = 1;
                            }
                            else {
                                const lastTokenType = this.lastToken.getType();
                                if (lastTokenType === net.objecthunter.exp4j.tokenizer.Token.TOKEN_PARENTHESES_OPEN
                                    || lastTokenType === net.objecthunter.exp4j.tokenizer.Token.TOKEN_SEPARATOR) {
                                    argc = 1;
                                }
                                else if (lastTokenType === net.objecthunter.exp4j.tokenizer.Token.TOKEN_OPERATOR) {
                                    const lastOp = this.lastToken.getOperator();
                                    if (lastOp.getNumOperands() === 2 || (lastOp.getNumOperands() === 1 && !lastOp.isLeftAssociative())) {
                                        argc = 1;
                                    }
                                }
                            }
                            op = net.objecthunter.exp4j.operator.Operators.getBuiltinOperator(symbol.charAt(0), argc);
                        }
                        return op;
                    }
                    /*private*/ parseNumberToken(firstChar) {
                        const offset = this.pos;
                        let len = 1;
                        this.pos++;
                        if (this.isEndOfExpression(offset + len)) {
                            this.lastToken = new net.objecthunter.exp4j.tokenizer.NumberToken(parseFloat(String(firstChar)));
                            return this.lastToken;
                        }
                        while (!this.isEndOfExpression(offset + len)
                            && Tokenizer.isNumeric(this.expression[offset + len], this.expression[offset + len - 1] === 'e' || this.expression[offset + len - 1] === 'E')) {
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
                    /*private*/ static isNumeric(ch, lastCharE) {
                        return Tokenizer.isDigit(ch.charCodeAt(0))
                            || ch === '.'
                            || ch === 'e'
                            || ch === 'E'
                            || (lastCharE && (ch === '-' || ch === '+'));
                    }
                    static isAlphabetic(codePoint) {
                        return Tokenizer.isLetter(codePoint);
                    }
                    static isVariableOrFunctionCharacter(codePoint) {
                        return Tokenizer.isLetter(codePoint)
                            || Tokenizer.isDigit(codePoint)
                            || codePoint === '_'.charCodeAt(0)
                            || codePoint === '.'.charCodeAt(0);
                    }
                    /*private*/ isEndOfExpression(offset) {
                        return this.expressionLength <= offset;
                    }
                    /*private*/ static isLetter(c) {
                        return (c >= 97 && c <= 122) || (c >= 65 && c <= 90);
                    }
                    /*private*/ static isWhiteSpace(c) {
                        return c <= 32;
                    }
                    /*private*/ static isDigit(c) {
                        return c >= 48 && c <= 57;
                    }
                }
                tokenizer.Tokenizer = Tokenizer;
            })(tokenizer = exp4j.tokenizer || (exp4j.tokenizer = {}));
        })(exp4j = objecthunter.exp4j || (objecthunter.exp4j = {}));
    })(objecthunter = net.objecthunter || (net.objecthunter = {}));
})(net || (net = {}));
//# sourceMappingURL=Tokenizer.js.map