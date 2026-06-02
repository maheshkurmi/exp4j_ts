/* 
* Copyright 2014 Frank Asseg
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License. 
*/
package net.objecthunter.exp4j;

/**
 * Contains the validation result for a given {@link Expression}
 */
public class ValidationResult {
    private final boolean valid;
    private final String[] errors;

    /**
     * Create a new instance
     * @param valid Whether the validation of the expression was successful
     * @param errors The array of errors returned if the validation was unsuccessful
     */
    public ValidationResult(boolean valid, String[] errors) {
        this.valid = valid;
        this.errors = errors == null ? null : copy(errors);
    }

    private static String[] copy(String[] source) {
        final String[] out = new String[source.length];
        System.arraycopy(source, 0, out, 0, source.length);
        return out;
    }

    /**
     * Check if an expression has been validated successfully
     * @return true if the validation was successful, false otherwise
     */
    public boolean isValid() {
        return valid;
    }

    /**
     * Get the list of errors describing the issues while validating the expression
     * @return The array of errors
     */
    public String[] getErrors() {
        return errors == null ? null : copy(errors);
    }

    /**
     * A static class representing a successful validation result
     */
    public static final ValidationResult SUCCESS = new ValidationResult(true, (String[]) null);
}
