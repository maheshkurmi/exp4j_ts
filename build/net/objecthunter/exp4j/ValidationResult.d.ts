declare namespace net.objecthunter.exp4j {
    /**
     * Create a new instance
     * @param {boolean} valid Whether the validation of the expression was successful
     * @param {java.lang.String[]} errors The array of errors returned if the validation was unsuccessful
     * @class
     */
    class ValidationResult {
        valid: boolean;
        errors: string[] | null;
        constructor(valid: boolean, errors: string[] | null);
        static copy(source: string[]): string[];
        /**
         * Check if an expression has been validated successfully
         * @return {boolean} true if the validation was successful, false otherwise
         */
        isValid(): boolean;
        /**
         * Get the list of errors describing the issues while validating the expression
         * @return {java.lang.String[]} The array of errors
         */
        getErrors(): string[] | null;
        /**
         * A static class representing a successful validation result
         */
        static SUCCESS: ValidationResult;
        static SUCCESS_$LI$(): ValidationResult;
    }
}
