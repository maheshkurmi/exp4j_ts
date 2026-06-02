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
package net.objecthunter.exp4j.tokenizer;

import def.js.Map;
import def.js.Set;

import net.objecthunter.exp4j.function._Function;
import net.objecthunter.exp4j.function.Functions;
import net.objecthunter.exp4j.operator.Operator;
import net.objecthunter.exp4j.operator.Operators;
import utilities.ClassUtils;

public class Tokenizer {

    private final char[] expression;

    private final int expressionLength;

    private final Map<String, _Function> userFunctions;

    private final Map<String, Operator> userOperators;

    private final Set<String> variableNames;

    private final boolean implicitMultiplication;

    private int pos = 0;

    private Token lastToken;


    public Tokenizer(String expression, final Map<String, _Function> userFunctions,
            final Map<String, Operator> userOperators, final Set<String> variableNames, final boolean implicitMultiplication) {
        this.expression = expression.trim().toCharArray();
        this.expressionLength = this.expression.length;
        this.userFunctions = userFunctions;
        this.userOperators = userOperators;
        this.variableNames = variableNames;
        this.implicitMultiplication = implicitMultiplication;
    }

    public Tokenizer(String expression, final Map<String, _Function> userFunctions,
                     final Map<String, Operator> userOperators, final Set<String> variableNames) {
        this.expression = expression.trim().toCharArray();
        this.expressionLength = this.expression.length;
        this.userFunctions = userFunctions;
        this.userOperators = userOperators;
        this.variableNames = variableNames;
        this.implicitMultiplication = true;
    }

    public boolean hasNext() {
        return this.expression.length > pos;
    }

    public Token nextToken(){
        char ch = expression[pos];
        while (isWhiteSpace(ch)) {//Character.isWhitespace(ch)) {
            ch = expression[++pos];
        }
        if (isDigit(ch) || ch == '.') {
            if (lastToken != null) {
                if (lastToken.getType() == Token.TOKEN_NUMBER) {
                    throw new IllegalArgumentException("Unable to parse char '" + ch + "' (Code:" + (int) ch + ") at [" + pos + "]");
                } else if (implicitMultiplication && (lastToken.getType() != Token.TOKEN_OPERATOR
                        && lastToken.getType() != Token.TOKEN_PARENTHESES_OPEN
                        && lastToken.getType() != Token.TOKEN_FUNCTION
                        && lastToken.getType() != Token.TOKEN_SEPARATOR)) {
                    // insert an implicit multiplication token
                    lastToken = new OperatorToken(Operators.getBuiltinOperator('*', 2));
                    return lastToken;
                }
            }
            return parseNumberToken(ch);
        } else if (isArgumentSeparator(ch)) {
            return parseArgumentSeparatorToken(ch);
        } else if (isOpenParentheses(ch)) {
            if (lastToken != null && implicitMultiplication &&
                    (lastToken.getType() != Token.TOKEN_OPERATOR
                            && lastToken.getType() != Token.TOKEN_PARENTHESES_OPEN
                            && lastToken.getType() != Token.TOKEN_FUNCTION
                            && lastToken.getType() != Token.TOKEN_SEPARATOR)) {
                // insert an implicit multiplication token
                lastToken = new OperatorToken(Operators.getBuiltinOperator('*', 2));
                return lastToken;
            }
            return parseParentheses(true);
        } else if (isCloseParentheses(ch)) {
            return parseParentheses(false);
        } else if (Operator.isAllowedOperatorChar(ch)) {
        	 //System.out.println("search opearator name "+ch);
            return parseOperatorToken(ch);
        } else if (isAlphabetic(ch) || ch == '_') {
            // parse the name which can be a setVariable or a function
            if (lastToken != null && implicitMultiplication &&
                    (lastToken.getType() != Token.TOKEN_OPERATOR
                            && lastToken.getType() != Token.TOKEN_PARENTHESES_OPEN
                            && lastToken.getType() != Token.TOKEN_FUNCTION
                            && lastToken.getType() != Token.TOKEN_SEPARATOR)) {
                // insert an implicit multiplication token
                lastToken = new OperatorToken(Operators.getBuiltinOperator('*', 2));
                return lastToken;
            }
            return parseFunctionOrVariable();

        }
        throw new IllegalArgumentException("Unable to parse char '" + ch + "' (Code:" + (int) ch + ") at [" + pos + "]");
    }

    private Token parseArgumentSeparatorToken(char ch) {
        this.pos++;
        this.lastToken = new ArgumentSeparatorToken();
        return lastToken;
    }

    private boolean isArgumentSeparator(char ch) {
        return ch == ',';
    }

    private Token parseParentheses(final boolean open) {
        if (open) {
            this.lastToken = new OpenParenthesesToken();
        } else {
            this.lastToken = new CloseParenthesesToken();
        }
        this.pos++;
        return lastToken;
    }

    private boolean isOpenParentheses(char ch) {
        return ch == '(' || ch == '{' || ch == '[';
    }

    private boolean isCloseParentheses(char ch) {
        return ch == ')' || ch == '}' || ch == ']';
    }

    private Token parseFunctionOrVariable() {
        final int offset = this.pos;
        int testPos;
        int lastValidLen = 1;
        Token lastValidToken = null;
        int len = 1;
        if (isEndOfExpression(offset)) {
            this.pos++;
        }
        testPos = offset + len - 1;
        while (!isEndOfExpression(testPos) &&
                isVariableOrFunctionCharacter(expression[testPos])) {
            String name = new String(expression, offset, len);
           // System.out.println("search var name "+name);
            if (variableNames != null && variableNames.has(name)) {
                lastValidLen = len;
                lastValidToken = new VariableToken(name);
                //System.out.println("found var name "+name);
            } else {
                final _Function f = getFunction(name);
                if (f != null) {
                    lastValidLen = len;
                    lastValidToken = new FunctionToken(f);
                }
                //System.out.println("found function name "+f);
            }
            len++;
            testPos = offset + len - 1;
        }
        if (lastValidToken == null) {
            throw new IllegalArgumentException("UnknownFunctionOrVariableException "+ expression + " at position "+ pos);
        }
        pos += lastValidLen;
        lastToken = lastValidToken;
        return lastToken;
    }

    private _Function getFunction(String name) {
        _Function f = null;
        if (this.userFunctions != null) {
            f = this.userFunctions.get(name);
        }
        if (f == null) {
            f = Functions.getBuiltinFunction(name);
        }
        return f;
    }

    private Token parseOperatorToken(char firstChar) {
        final int offset = this.pos;
        int len = 1;
        Operator lastValid = null;

        while (!isEndOfExpression(offset + len)  && Operator.isAllowedOperatorChar(expression[offset + len])) {
            len++;
        }

        int validLen = 0;
        for (int candidateLen = len; candidateLen > 0; candidateLen--) {
            Operator op = this.getOperator(new String(expression, offset, candidateLen));
            if (op != null) {
                lastValid = op;
                validLen = candidateLen;
                break;
            }
        }

        if (lastValid == null) {
            throw new IllegalArgumentException("Unable to parse operator at [" + offset + "]");
        }

       // System.out.println("found operator name " + new String(expression, offset, validLen));
        pos += validLen;
        lastToken = new OperatorToken(lastValid);
        return lastToken;
    }

    private Operator getOperator(String symbol) {
        Operator op = null;
        if (this.userOperators != null) {
            op = this.userOperators.get(symbol);
        }
        if (op == null && symbol.length() == 1) {
            int argc = 2;
            if (lastToken == null) {
                argc = 1;
            } else {
                int lastTokenType = lastToken.getType();
                if (lastTokenType == Token.TOKEN_PARENTHESES_OPEN || lastTokenType == Token.TOKEN_SEPARATOR) {
                    argc = 1;
                } else if (lastTokenType == Token.TOKEN_OPERATOR) {
                    final Operator lastOp = ((OperatorToken) lastToken).getOperator();
                    if (lastOp.getNumOperands() == 2 || (lastOp.getNumOperands() == 1 && !lastOp.isLeftAssociative())) {
                        argc = 1;
                    }
                }

            }
            op = Operators.getBuiltinOperator(symbol.charAt(0), argc);
        }
        return op;
    }

    private Token parseNumberToken(final char firstChar) {
        final int offset = this.pos;
        int len = 1;
        this.pos++;
        if (isEndOfExpression(offset + len)) {
            lastToken = new NumberToken(ClassUtils.parseDouble(String.valueOf(firstChar)));
            return lastToken;
        }
        while (!isEndOfExpression(offset + len) &&
                isNumeric(expression[offset + len], expression[offset + len - 1] == 'e' ||
                        expression[offset + len - 1] == 'E')) {
            len++;
            this.pos++;
        }
        // check if the e is at the end
        if (expression[offset + len - 1] == 'e' || expression[offset + len - 1] == 'E') {
            // since the e is at the end it's not part of the number and a rollback is necessary
            len--;
            pos--;
        }
        lastToken = new NumberToken(expression, offset, len);
        return lastToken;
    }

    private static boolean isNumeric(char ch, boolean lastCharE) {
        return isDigit(ch) || ch == '.' || ch == 'e' || ch == 'E' ||
                (lastCharE && (ch == '-' || ch == '+'));
    }

    public static boolean isAlphabetic(int codePoint) {
        return  isLetter(codePoint);
    }

    public static boolean isVariableOrFunctionCharacter(int codePoint) {
        return 
        		isLetter(codePoint) ||
                isDigit(codePoint) ||
                codePoint == '_' ||
                codePoint == '.';
    }

    private  boolean isEndOfExpression(int offset) {
        return this.expressionLength <= offset;
    }
    
    
    private static  boolean isLetter(int c) {
    	return (c >= 97 && c <= 122) ||
           (c >= 65 && c <=  90) ;
    	   
    }
    
    private static  boolean isWhiteSpace(int c) {
    	return (c <=32);
    	   
    }
    
    private static boolean isDigit(int c) {
    	return c>=48 && c<=57;
    }
}
