/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
var net;
(function (net) {
    var objecthunter;
    (function (objecthunter) {
        var exp4j;
        (function (exp4j) {
            /**
             * Create a new instance
             * @param {boolean} valid Whether the validation of the expression was successful
             * @param {java.lang.String[]} errors The array of errors returned if the validation was unsuccessful
             * @class
             */
            class ValidationResult {
                constructor(valid, errors) {
                    this.valid = valid;
                    this.errors = errors == null ? null : ValidationResult.copy(errors);
                }
                /*private*/ static copy(source) {
                    return source.slice();
                }
                /**
                 * Check if an expression has been validated successfully
                 * @return {boolean} true if the validation was successful, false otherwise
                 */
                isValid() {
                    return this.valid;
                }
                /**
                 * Get the list of errors describing the issues while validating the expression
                 * @return {java.lang.String[]} The array of errors
                 */
                getErrors() {
                    return this.errors == null ? null : ValidationResult.copy(this.errors);
                }
                // Backward-compatible helper for old JSweet call sites.
                static SUCCESS_$LI$() {
                    return ValidationResult.SUCCESS;
                }
            }
            /**
             * A static class representing a successful validation result
             */
            ValidationResult.SUCCESS = new ValidationResult(true, null);
            exp4j.ValidationResult = ValidationResult;
        })(exp4j = objecthunter.exp4j || (objecthunter.exp4j = {}));
    })(objecthunter = net.objecthunter || (net.objecthunter = {}));
})(net || (net = {}));
//# sourceMappingURL=ValidationResult.js.map