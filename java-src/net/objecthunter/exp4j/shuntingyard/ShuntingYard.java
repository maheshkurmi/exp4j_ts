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
package net.objecthunter.exp4j.shuntingyard;

import def.js.Map;
import def.js.Set;

import net.objecthunter.exp4j.function._Function;
import net.objecthunter.exp4j.operator.Operator;
import net.objecthunter.exp4j.tokenizer.OperatorToken;
import net.objecthunter.exp4j.tokenizer.Token;
import net.objecthunter.exp4j.tokenizer.Tokenizer;

/**
 * Shunting yard implementation to convert infix to reverse polish notation
 */
public class ShuntingYard {

    private static final class TokenStack {
        private Token[] data = new Token[16];
        private int size = 0;

        void push(Token token) {
            if (size == data.length) {
                grow();
            }
            data[size++] = token;
        }

        Token pop() {
            return data[--size];
        }

        Token peek() {
            return data[size - 1];
        }

        boolean empty() {
            return size == 0;
        }

        boolean isEmpty() {
            return size == 0;
        }

        private void grow() {
            Token[] expanded = new Token[data.length * 2];
            for (int i = 0; i < data.length; i++) {
                expanded[i] = data[i];
            }
            data = expanded;
        }
    }

    private static final class TokenList {
        private Token[] data = new Token[16];
        private int size = 0;

        void add(Token token) {
            if (size == data.length) {
                grow();
            }
            data[size++] = token;
        }

        Token[] toArray() {
            Token[] result = new Token[size];
            for (int i = 0; i < size; i++) {
                result[i] = data[i];
            }
            return result;
        }

        private void grow() {
            Token[] expanded = new Token[data.length * 2];
            for (int i = 0; i < data.length; i++) {
                expanded[i] = data[i];
            }
            data = expanded;
        }
    }

    /**
     * Convert a Set of tokens from infix to reverse polish notation
     * @param expression the expression to convert
     * @param userFunctions the custom functions used
     * @param userOperators the custom operators used
     * @param variableNames the variable names used in the expression
     * @param implicitMultiplication set to fasle to turn off implicit multiplication
     * @return a {@link net.objecthunter.exp4j.tokenizer.Token} array containing the result
     */
    public static Token[] convertToRPN(final String expression, final Map<String, _Function> userFunctions,
            final Map<String, Operator> userOperators, final Set<String> variableNames, final boolean implicitMultiplication){
        final TokenStack stack = new TokenStack();
        final TokenList output = new TokenList();

        final Tokenizer tokenizer = new Tokenizer(expression, userFunctions, userOperators, variableNames, implicitMultiplication);
        while (tokenizer.hasNext()) {
            Token token = tokenizer.nextToken();
            switch (token.getType()) {
            case Token.TOKEN_NUMBER:
            case Token.TOKEN_VARIABLE:
                output.add(token);
                break;
            case Token.TOKEN_FUNCTION:
                stack.push(token);
                break;
            case Token.TOKEN_SEPARATOR:
                while (!stack.empty() && stack.peek().getType() != Token.TOKEN_PARENTHESES_OPEN) {
                    output.add(stack.pop());
                }
                if (stack.empty() || stack.peek().getType() != Token.TOKEN_PARENTHESES_OPEN) {
                    throw new IllegalArgumentException("Misplaced function separator ',' or mismatched parentheses");
                }
                break;
            case Token.TOKEN_OPERATOR:
                while (!stack.empty() && stack.peek().getType() == Token.TOKEN_OPERATOR) {
                    OperatorToken o1 = (OperatorToken) token;
                    OperatorToken o2 = (OperatorToken) stack.peek();
                    if (o1.getOperator().getNumOperands() == 1 && o2.getOperator().getNumOperands() == 2) {
                        break;
                    } else if ((o1.getOperator().isLeftAssociative() && o1.getOperator().getPrecedence() <= o2.getOperator().getPrecedence())
                            || (o1.getOperator().getPrecedence() < o2.getOperator().getPrecedence())) {
                        output.add(stack.pop());
                    }else {
                        break;
                    }
                }
                stack.push(token);
                break;
            case Token.TOKEN_PARENTHESES_OPEN:
                stack.push(token);
                break;
            case Token.TOKEN_PARENTHESES_CLOSE:
                while (stack.peek().getType() != Token.TOKEN_PARENTHESES_OPEN) {
                    output.add(stack.pop());
                }
                stack.pop();
                if (!stack.isEmpty() && stack.peek().getType() == Token.TOKEN_FUNCTION) {
                    output.add(stack.pop());
                }
                break;
            default:
                throw new IllegalArgumentException("Unknown Token type encountered. This should not happen");
            }
        }
        while (!stack.empty()) {
            Token t = stack.pop();
            if (t.getType() == Token.TOKEN_PARENTHESES_CLOSE || t.getType() == Token.TOKEN_PARENTHESES_OPEN) {
                throw new IllegalArgumentException("Mismatched parentheses detected. Please check the expression");
            } else {
                output.add(t);
            }
        }
        return output.toArray();
    }
}
