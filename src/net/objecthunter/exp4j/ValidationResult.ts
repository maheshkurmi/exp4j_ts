/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
namespace net.objecthunter.exp4j {
    /**
     * Create a new instance
     * @param {boolean} valid Whether the validation of the expression was successful
     * @param {java.lang.String[]} errors The array of errors returned if the validation was unsuccessful
     * @class
     */
    export class ValidationResult {
        /*private*/ valid: boolean;

        /*private*/ errors: string[] | null;

        public constructor(valid: boolean, errors: string[] | null) {
            this.valid = valid;
            this.errors = errors == null ? null : ValidationResult.copy(errors);
        }

        /*private*/ static copy(source: string[]): string[] {
            return source.slice();
        }

        /**
         * Check if an expression has been validated successfully
         * @return {boolean} true if the validation was successful, false otherwise
         */
        public isValid(): boolean {
            return this.valid;
        }

        /**
         * Get the list of errors describing the issues while validating the expression
         * @return {java.lang.String[]} The array of errors
         */
        public getErrors(): string[] | null {
            return this.errors == null ? null : ValidationResult.copy(this.errors);
        }

        /**
         * A static class representing a successful validation result
         */
        public static SUCCESS: ValidationResult = new ValidationResult(true, null);

        // Backward-compatible helper for old JSweet call sites.
        public static SUCCESS_$LI$(): ValidationResult {
            return ValidationResult.SUCCESS;
        }
    }

}
