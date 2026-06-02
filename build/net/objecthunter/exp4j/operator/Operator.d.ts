declare namespace net.objecthunter.exp4j.operator {
    /**
     * Create a new operator for use in expressions
     *
     * @param {string} symbol           the symbol of the operator
     * @param {number} numberOfOperands the number of operands the operator takes (1 or 2)
     * @param {boolean} leftAssociative  set to true if the operator is left associative, false if it is right associative
     * @param {number} precedence       the precedence value of the operator
     * @class
     */
    abstract class Operator {
        /**
         * The precedence value for the logical operation |, &
         */
        static PRECEDENCE_LOGICAL: number;
        /**
         * The precedence value for the comparision operation like >, < and =
         */
        static PRECEDENCE_COMPARISION: number;
        /**
         * The precedence value for the addition operation
         */
        static PRECEDENCE_ADDITION: number;
        /**
         * The precedence value for the subtraction operation
         */
        static PRECEDENCE_SUBTRACTION: number;
        /**
         * The precedence value for the multiplication operation
         */
        static PRECEDENCE_MULTIPLICATION: number;
        /**
         * The precedence value for the division operation
         */
        static PRECEDENCE_DIVISION: number;
        /**
         * The precedence value for the modulo operation
         */
        static PRECEDENCE_MODULO: number;
        /**
         * The precedence value for the power operation
         */
        static PRECEDENCE_POWER: number;
        /**
         * The precedence value for the unary minus operation
         */
        static PRECEDENCE_UNARY_MINUS: number;
        /**
         * The precedence value for the unary plus operation
         */
        static PRECEDENCE_UNARY_PLUS: number;
        /**
         * The precedence value for the logical not !
         */
        static PRECEDENCE_LOGICAL_NOT: number;
        /**
         * The set of allowed operator chars
         */
        static ALLOWED_OPERATOR_CHARS: string[];
        numOperands: number;
        leftAssociative: boolean;
        symbol: string;
        precedence: number;
        constructor(symbol: string, numberOfOperands: number, leftAssociative: boolean, precedence: number);
        /**
         * Check if a character is an allowed operator char
         *
         * @param {string} ch the char to check
         * @return {boolean} true if the char is allowed an an operator symbol, false otherwise
         */
        static isAllowedOperatorChar(ch: string): boolean;
        /**
         * Check if the operator is left associative
         *
         * @return {boolean} true os the operator is left associative, false otherwise
         */
        isLeftAssociative(): boolean;
        /**
         * Check the precedence value for the operator
         *
         * @return {number} the precedence value
         */
        getPrecedence(): number;
        /**
         * Apply the operation on the given operands
         *
         * @param {double[]} args the operands for the operation
         * @return {number} the calculated result of the operation
         */
        abstract apply(...args: number[]): number;
        /**
         * Get the operator symbol
         *
         * @return {string} the symbol
         */
        getSymbol(): string;
        /**
         * Get the number of operands
         *
         * @return {number} the number of operands
         */
        getNumOperands(): number;
    }
}
