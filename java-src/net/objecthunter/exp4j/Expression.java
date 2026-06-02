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

import def.js.Map;
import net.objecthunter.exp4j.function._Function;
import net.objecthunter.exp4j.function.Functions;
import net.objecthunter.exp4j.operator.Operator;
import net.objecthunter.exp4j.tokenizer.*;

public class Expression {

    private static final class StringArray {
        private String[] items = new String[8];
        private int size;

        void addIfAbsent(String value) {
            for (int i = 0; i < size; i++) {
                if (items[i].equals(value)) {
                    return;
                }
            }
            if (size == items.length) {
                String[] expanded = new String[items.length * 2];
                for (int i = 0; i < items.length; i++) {
                    expanded[i] = items[i];
                }
                items = expanded;
            }
            items[size++] = value;
        }

        String[] toArray() {
            String[] out = new String[size];
            for (int i = 0; i < size; i++) {
                out[i] = items[i];
            }
            return out;
        }

        void clear() {
            size = 0;
        }
    }

    private static final class ValidationErrors {
        private String[] items = new String[4];
        private int size;

        void add(String error) {
            if (size == items.length) {
                final String[] expanded = new String[items.length * 2];
                System.arraycopy(items, 0, expanded, 0, items.length);
                items = expanded;
            }
            items[size++] = error;
        }

        boolean isEmpty() {
            return size == 0;
        }

        String[] toArray() {
            final String[] out = new String[size];
            System.arraycopy(items, 0, out, 0, size);
            return out;
        }
    }

    private final Token[] tokens;

    private final Map<String, Double> variables;

    private final StringArray variableKeys;

    private final String[] userFunctionNames;

    /**
     * Creates a new expression that is a copy of the existing one.
     *
     * @param existing the expression to copy
     */
    public Expression(final Expression existing) {
        this.tokens = new Token[existing.tokens.length];
        System.arraycopy(existing.tokens, 0, this.tokens, 0, existing.tokens.length);
        this.variables = new Map<>();
        this.variableKeys = new StringArray();
        for (String key : existing.variableKeys.toArray()) {
            this.variableKeys.addIfAbsent(key);
            this.variables.set(key, existing.variables.get(key));
        }
        if (existing.userFunctionNames == null) {
            this.userFunctionNames = null;
        } else {
            this.userFunctionNames = new String[existing.userFunctionNames.length];
            System.arraycopy(existing.userFunctionNames, 0, this.userFunctionNames, 0, existing.userFunctionNames.length);
        }
    }

    Expression(final Token[] tokens) {
        this.tokens = tokens;
        this.variables = new Map<>();
        this.variableKeys = new StringArray();
        initDefaultVariables();
        this.userFunctionNames = null;
    }

    Expression(final Token[] tokens, String[] userFunctionNames) {
        this.tokens = tokens;
        this.variables = new Map<>();
        this.variableKeys = new StringArray();
        initDefaultVariables();
        if (userFunctionNames == null) {
            this.userFunctionNames = null;
        } else {
            this.userFunctionNames = new String[userFunctionNames.length];
            System.arraycopy(userFunctionNames, 0, this.userFunctionNames, 0, userFunctionNames.length);
        }
    }

    private void initDefaultVariables() {
        setVariableInternal("pi", Math.PI);
        setVariableInternal("π", Math.PI);
        setVariableInternal("φ", 1.61803398874d);
        setVariableInternal("e", Math.E);
        setVariableInternal("true", 1.0);
        setVariableInternal("false", 0.0);
        setVariableInternal("null", Double.NaN);
    }

    private void setVariableInternal(String name, double value) {
        this.variables.set(name, value);
        this.variableKeys.addIfAbsent(name);
    }

    public Expression setVariable(final String name, final double value) {
        this.checkVariableName(name);
        this.setVariableInternal(name, value);
        return this;
    }

    private void checkVariableName(String name) {
        if ((this.userFunctionNames != null && containsUserFunctionName(name)) || Functions.getBuiltinFunction(name) != null) {
            throw new IllegalArgumentException("The variable name '" + name + "' is invalid. Since there exists a function with the same name");
        }
    }

    private boolean containsUserFunctionName(String name) {
        for (String functionName : this.userFunctionNames) {
            if (functionName != null && functionName.equals(name)) {
                return true;
            }
        }
        return false;
    }

    public Expression clearVariables() {
        this.variables.clear();
        this.variableKeys.clear();
        return this;
    }

    public String[] getVariableNames() {
        final StringArray variables = new StringArray();
        for (final Token t : tokens) {
            if (t.getType() == Token.TOKEN_VARIABLE) {
                variables.addIfAbsent(((VariableToken) t).getName());
            }
        }
        return variables.toArray();
    }

    public ValidationResult validate(boolean checkVariablesSet) {
        final ValidationErrors errors = new ValidationErrors();
        if (checkVariablesSet) {
            /* check that all vars have a value set */
            for (final Token t : this.tokens) {
                if (t.getType() == Token.TOKEN_VARIABLE) {
                    final String _var = ((VariableToken) t).getName();
                    if (!variables.has(_var)) {
                        errors.add("The setVariable '" + _var + "' has not been set");
                    }
                }
            }
        }

        /* Check if the number of operands, functions and operators match.
           The idea is to increment a counter for operands and decrease it for operators.
           When a function occurs the number of available arguments has to be greater
           than or equals to the function's expected number of arguments.
           The count has to be larger than 1 at all times and exactly 1 after all tokens
           have been processed */
        int count = 0;
        for (Token tok : this.tokens) {
            switch (tok.getType()) {
                case Token.TOKEN_NUMBER:
                case Token.TOKEN_VARIABLE:
                    count++;
                    break;
                case Token.TOKEN_FUNCTION:
                    final _Function func = ((FunctionToken) tok).getFunction();
                    final int argsNum = func.getNumArguments();
                    if (argsNum > count) {
                        errors.add("Not enough arguments for '" + func.getName() + "'");
                    }
                    if (argsNum > 1) {
                        count -= argsNum - 1;
                    } else if (argsNum == 0) {
                        // see https://github.com/fasseg/exp4j/issues/59
                        count++;
                    }
                    break;
                case Token.TOKEN_OPERATOR:
                    Operator op = ((OperatorToken) tok).getOperator();
                    if (op.getNumOperands() == 2) {
                        count--;
                    }
                    break;
            }
            if (count < 1) {
                errors.add("Too many operators");
                return new ValidationResult(false, errors.toArray());
            }
        }
        if (count > 1) {
            errors.add("Too many operands");
        }
        return errors.isEmpty() ? ValidationResult.SUCCESS : new ValidationResult(false, errors.toArray());

    }

    public ValidationResult validate() {
        return validate(true);
    }

   
    public double evaluate() {
    	  try {
    		 return  evaluateWithException();
    	  }catch(Exception e) {
    		  e.printStackTrace();
    		  return Double.NaN;
    	  }
    }
    
    public double evaluateWithException() {
        final ArrayStack output = new ArrayStack();
        for (Token t : tokens) {
            if (t.getType() == Token.TOKEN_NUMBER) {
                output.push(((NumberToken) t).getValue());
            } else if (t.getType() == Token.TOKEN_VARIABLE) {
                final String name = ((VariableToken) t).getName();
                final Double value = this.variables.get(name);
                if (value == null) {
                    throw new IllegalArgumentException("No value has been set for the setVariable '" + name + "'.");
                }
                output.push(value);
            } else if (t.getType() == Token.TOKEN_OPERATOR) {
                OperatorToken op = (OperatorToken) t;
                if (output.size() < op.getOperator().getNumOperands()) {
                    throw new IllegalArgumentException("Invalid number of operands available for '" + op.getOperator().getSymbol() + "' operator");
                }
                if (op.getOperator().getNumOperands() == 2) {
                    /* pop the operands and push the result of the operation */
                    double rightArg = output.pop();
                    double leftArg = output.pop();
                    output.push(op.getOperator().apply(leftArg, rightArg));
                } else if (op.getOperator().getNumOperands() == 1) {
                    /* pop the operand and push the result of the operation */
                    double arg = output.pop();
                    output.push(op.getOperator().apply(arg));
                }
            } else if (t.getType() == Token.TOKEN_FUNCTION) {
                FunctionToken func = (FunctionToken) t;
                final int numArguments = func.getFunction().getNumArguments();
                if (output.size() < numArguments) {
                    throw new IllegalArgumentException("Invalid number of arguments available for '" + func.getFunction().getName() + "' function");
                }
                /* collect the arguments from the stack */
                double[] args = new double[numArguments];
                for (int j = numArguments - 1; j >= 0; j--) {
                    args[j] = output.pop();
                }
                output.push(func.getFunction().apply(args));
            }
        }
        if (output.size() > 1) {
            throw new IllegalArgumentException("Invalid number of items on the output queue. Might be caused by an invalid number of arguments for a function.");
        }
        return output.pop();
    }
}
