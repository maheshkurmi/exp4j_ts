/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
namespace net.objecthunter.exp4j.operator {
    /**
     * Create a new operator for use in expressions
     * 
     * @param {string} symbol           the symbol of the operator
     * @param {number} numberOfOperands the number of operands the operator takes (1 or 2)
     * @param {boolean} leftAssociative  set to true if the operator is left associative, false if it is right associative
     * @param {number} precedence       the precedence value of the operator
     * @class
     */
    export abstract class Operator {
        /**
         * The precedence value for the logical operation |, &
         */
        public static PRECEDENCE_LOGICAL: number = 50;

        /**
         * The precedence value for the comparision operation like >, < and =
         */
        public static PRECEDENCE_COMPARISION: number = 100;

        /**
         * The precedence value for the addition operation
         */
        public static PRECEDENCE_ADDITION: number = 500;

        /**
         * The precedence value for the subtraction operation
         */
        public static PRECEDENCE_SUBTRACTION: number = Operator.PRECEDENCE_ADDITION;

        /**
         * The precedence value for the multiplication operation
         */
        public static PRECEDENCE_MULTIPLICATION: number = 1000;

        /**
         * The precedence value for the division operation
         */
        public static PRECEDENCE_DIVISION: number = Operator.PRECEDENCE_MULTIPLICATION;

        /**
         * The precedence value for the modulo operation
         */
        public static PRECEDENCE_MODULO: number = Operator.PRECEDENCE_DIVISION;

        /**
         * The precedence value for the power operation
         */
        public static PRECEDENCE_POWER: number = 10000;

        /**
         * The precedence value for the unary minus operation
         */
        public static PRECEDENCE_UNARY_MINUS: number = 5000;

        /**
         * The precedence value for the unary plus operation
         */
        public static PRECEDENCE_UNARY_PLUS: number = Operator.PRECEDENCE_UNARY_MINUS;

        /**
         * The precedence value for the logical not !
         */
        public static PRECEDENCE_LOGICAL_NOT: number = 10000;

        /**
         * The set of allowed operator chars
         */
        public static ALLOWED_OPERATOR_CHARS: string[] = ['+', '-', '*', '/', '%', '^', '!', '#', '\u00a7', '$', '&', ';', ':', '~', '<', '>', '|', '=', '\u00f7', '\u221a', '\u221b', '\u2308', '\u230a'];

        /*private*/ numOperands: number;

        /*private*/ leftAssociative: boolean;

        /*private*/ symbol: string;

        /*private*/ precedence: number;

        public constructor(symbol: string, numberOfOperands: number, leftAssociative: boolean, precedence: number) {
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
        public static isAllowedOperatorChar(ch: string): boolean {
            for (const allowed of Operator.ALLOWED_OPERATOR_CHARS) {
                if (ch.charCodeAt(0) === allowed.charCodeAt(0)){
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
        public isLeftAssociative(): boolean {
            return this.leftAssociative;
        }

        /**
         * Check the precedence value for the operator
         * 
         * @return {number} the precedence value
         */
        public getPrecedence(): number {
            return this.precedence;
        }

        /**
         * Apply the operation on the given operands
         * 
         * @param {double[]} args the operands for the operation
         * @return {number} the calculated result of the operation
         */
        public abstract apply(...args: number[]): number;

        /**
         * Get the operator symbol
         * 
         * @return {string} the symbol
         */
        public getSymbol(): string {
            return this.symbol;
        }

        /**
         * Get the number of operands
         * 
         * @return {number} the number of operands
         */
        public getNumOperands(): number {
            return this.numOperands;
        }
    }

}

