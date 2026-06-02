/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
var net;
(function (net) {
    var objecthunter;
    (function (objecthunter) {
        var exp4j;
        (function (exp4j) {
            var operator;
            (function (operator) {
                /**
                 * Create a new operator for use in expressions
                 *
                 * @param {string} symbol           the symbol of the operator
                 * @param {number} numberOfOperands the number of operands the operator takes (1 or 2)
                 * @param {boolean} leftAssociative  set to true if the operator is left associative, false if it is right associative
                 * @param {number} precedence       the precedence value of the operator
                 * @class
                 */
                class Operator {
                    constructor(symbol, numberOfOperands, leftAssociative, precedence) {
                        this.numOperands = numberOfOperands;
                        this.leftAssociative = leftAssociative;
                        this.symbol = symbol;
                        this.precedence = precedence;
                    }
                    /**
                     * Check if a character is an allowed operator char
                     *
                     * @param {string} ch the char to check
                     * @return {boolean} true if the char is allowed an an operator symbol, false otherwise
                     */
                    static isAllowedOperatorChar(ch) {
                        for (const allowed of Operator.ALLOWED_OPERATOR_CHARS) {
                            if (ch.charCodeAt(0) === allowed.charCodeAt(0)) {
                                return true;
                            }
                        }
                        return false;
                    }
                    /**
                     * Check if the operator is left associative
                     *
                     * @return {boolean} true os the operator is left associative, false otherwise
                     */
                    isLeftAssociative() {
                        return this.leftAssociative;
                    }
                    /**
                     * Check the precedence value for the operator
                     *
                     * @return {number} the precedence value
                     */
                    getPrecedence() {
                        return this.precedence;
                    }
                    /**
                     * Get the operator symbol
                     *
                     * @return {string} the symbol
                     */
                    getSymbol() {
                        return this.symbol;
                    }
                    /**
                     * Get the number of operands
                     *
                     * @return {number} the number of operands
                     */
                    getNumOperands() {
                        return this.numOperands;
                    }
                }
                /**
                 * The precedence value for the logical operation |, &
                 */
                Operator.PRECEDENCE_LOGICAL = 50;
                /**
                 * The precedence value for the comparision operation like >, < and =
                 */
                Operator.PRECEDENCE_COMPARISION = 100;
                /**
                 * The precedence value for the addition operation
                 */
                Operator.PRECEDENCE_ADDITION = 500;
                /**
                 * The precedence value for the subtraction operation
                 */
                Operator.PRECEDENCE_SUBTRACTION = Operator.PRECEDENCE_ADDITION;
                /**
                 * The precedence value for the multiplication operation
                 */
                Operator.PRECEDENCE_MULTIPLICATION = 1000;
                /**
                 * The precedence value for the division operation
                 */
                Operator.PRECEDENCE_DIVISION = Operator.PRECEDENCE_MULTIPLICATION;
                /**
                 * The precedence value for the modulo operation
                 */
                Operator.PRECEDENCE_MODULO = Operator.PRECEDENCE_DIVISION;
                /**
                 * The precedence value for the power operation
                 */
                Operator.PRECEDENCE_POWER = 10000;
                /**
                 * The precedence value for the unary minus operation
                 */
                Operator.PRECEDENCE_UNARY_MINUS = 5000;
                /**
                 * The precedence value for the unary plus operation
                 */
                Operator.PRECEDENCE_UNARY_PLUS = Operator.PRECEDENCE_UNARY_MINUS;
                /**
                 * The precedence value for the logical not !
                 */
                Operator.PRECEDENCE_LOGICAL_NOT = 10000;
                /**
                 * The set of allowed operator chars
                 */
                Operator.ALLOWED_OPERATOR_CHARS = ['+', '-', '*', '/', '%', '^', '!', '#', '\u00a7', '$', '&', ';', ':', '~', '<', '>', '|', '=', '\u00f7', '\u221a', '\u221b', '\u2308', '\u230a'];
                operator.Operator = Operator;
            })(operator = exp4j.operator || (exp4j.operator = {}));
        })(exp4j = objecthunter.exp4j || (objecthunter.exp4j = {}));
    })(objecthunter = net.objecthunter || (net.objecthunter = {}));
})(net || (net = {}));
//# sourceMappingURL=Operator.js.map