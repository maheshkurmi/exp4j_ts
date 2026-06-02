/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
var net;
(function (net) {
    var objecthunter;
    (function (objecthunter) {
        var exp4j;
        (function (exp4j) {
            var tokenizer;
            (function (tokenizer) {
                /**
                 * Represents a number in the expression.
                 */
                class NumberToken extends net.objecthunter.exp4j.tokenizer.Token {
                    constructor(valueOrExpression, offset, len) {
                        super(net.objecthunter.exp4j.tokenizer.Token.TOKEN_NUMBER);
                        if (typeof valueOrExpression === "number") {
                            this.value = valueOrExpression;
                            return;
                        }
                        const expression = valueOrExpression;
                        const parsed = parseFloat(expression.join("").substring(offset, offset + len));
                        this.value = parsed;
                    }
                    /**
                     * Get the value of the number.
                     */
                    getValue() {
                        return this.value;
                    }
                }
                tokenizer.NumberToken = NumberToken;
            })(tokenizer = exp4j.tokenizer || (exp4j.tokenizer = {}));
        })(exp4j = objecthunter.exp4j || (objecthunter.exp4j = {}));
    })(objecthunter = net.objecthunter || (net.objecthunter = {}));
})(net || (net = {}));
//# sourceMappingURL=NumberToken.js.map