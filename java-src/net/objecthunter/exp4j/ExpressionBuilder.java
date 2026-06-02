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
import def.js.Set;
import net.objecthunter.exp4j.function.Functions;
import net.objecthunter.exp4j.function._Function;
import net.objecthunter.exp4j.operator.Operator;
import net.objecthunter.exp4j.shuntingyard.ShuntingYard;

/**
 * Factory class for {@link Expression} instances. This class is the main API entrypoint. Users should create new
 * {@link Expression} instances using this factory class.
 */
public class ExpressionBuilder {

    private static final class StringArray {
        private String[] items = new String[8];
        private int size = 0;

        boolean contains(String value) {
            for (int i = 0; i < size; i++) {
                if (items[i].equals(value)) {
                    return true;
                }
            }
            return false;
        }

        void addIfAbsent(String value) {
            if (contains(value)) {
                return;
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
    }

    private final String expression;

    private final Map<String, _Function> userFunctions;

    private final Map<String, Operator> userOperators;

    private final Set<String> variableNames;

    private final StringArray variableNameList;

    private final StringArray userFunctionNameList;

    private boolean implicitMultiplication = true;

    /**
     * Create a new ExpressionBuilder instance and initialize it with a given expression string.
     *
     * @param expression the expression to be parsed
     */
    public ExpressionBuilder(String expression) {
        if (expression == null || expression.trim().length() == 0) {
            throw new IllegalArgumentException("Expression can not be empty");
        }
        this.expression = expression;
        this.userOperators = new Map<>();
        this.userFunctions = new Map<>();
        this.variableNames = new Set<>();
        this.variableNameList = new StringArray();
        this.userFunctionNameList = new StringArray();
    }

    /**
     * Add a {@link net.objecthunter.exp4j.function.Function} implementation available for use in the expression
     *
     * @param function the custom {@link net.objecthunter.exp4j.function.Function} implementation that should be available for use in the expression.
     * @return the ExpressionBuilder instance
     */
    public ExpressionBuilder _function(_Function _function) {
        final String functionName = _function.getName();
        this.userFunctions.set(functionName, _function);
        this.userFunctionNameList.addIfAbsent(functionName);
        return this;
    }

    /**
     * Add multiple {@link net.objecthunter.exp4j.function.Function} implementations available for use in the expression
     *
     * @param functions the custom {@link net.objecthunter.exp4j.function.Function} implementations
     * @return the ExpressionBuilder instance
     */
    public ExpressionBuilder functions(_Function... _functions) {
        for (_Function f : _functions) {
            this._function(f);
        }
        return this;
    }

    /**
     * Declare variable names used in the expression
     *
     * @param variableNames the variables used in the expression
     * @return the ExpressionBuilder instance
     */
    public ExpressionBuilder variables(String... variableNames) {
        for (String variableName : variableNames) {
            addVariableName(variableName);
        }
        return this;
    }

    /**
     * Declare a variable used in the expression
     *
     * @param variableName the variable used in the expression
     * @return the ExpressionBuilder instance
     */
    public ExpressionBuilder variable(String variableName) {
        addVariableName(variableName);
        return this;
    }

    private void addVariableName(String variableName) {
        if (!this.variableNames.has(variableName)) {
            this.variableNames.add(variableName);
            this.variableNameList.addIfAbsent(variableName);
        }
    }

    public ExpressionBuilder implicitMultiplication(boolean enabled) {
        this.implicitMultiplication = enabled;
        return this;
    }

    /**
     * Add an {@link net.objecthunter.exp4j.operator.Operator} which should be available for use in the expression
     *
     * @param operator the custom {@link net.objecthunter.exp4j.operator.Operator} to add
     * @return the ExpressionBuilder instance
     */
    public ExpressionBuilder operator(Operator operator) {
        this.checkOperatorSymbol(operator);
        this.userOperators.set(operator.getSymbol(), operator);
        return this;
    }

    private void checkOperatorSymbol(Operator op) {
        String name = op.getSymbol();
        for (char ch : name.toCharArray()) {
            if (!Operator.isAllowedOperatorChar(ch)) {
                throw new IllegalArgumentException("The operator symbol '" + name + "' is invalid");
            }
        }
    }

    /**
     * Add multiple {@link net.objecthunter.exp4j.operator.Operator} implementations which should be available for use in the expression
     *
     * @param operators the set of custom {@link net.objecthunter.exp4j.operator.Operator} implementations to add
     * @return the ExpressionBuilder instance
     */
    public ExpressionBuilder operator(Operator... operators) {
        for (Operator o : operators) {
            this.operator(o);
        }
        return this;
    }

    /**
     * Build the {@link Expression} instance using the custom operators and functions set.
     *
     * @return an {@link Expression} instance which can be used to evaluate the result of the expression
     */
    public Expression build() {
        if (expression.length() == 0) {
            throw new IllegalArgumentException("The expression can not be empty");
        }
        
        /* set the constants' varibale names */
        addVariableName("pi");
        addVariableName("π");
        addVariableName("e");
        addVariableName("φ");
        //Add boolean constants
        addVariableName("true");
        addVariableName("false");
        addVariableName("null");
        /* Check if there are duplicate vars/functions */
        for (String _var : variableNameList.toArray()) {
            if (Functions.getBuiltinFunction(_var) != null || userFunctions.has(_var)) {
                throw new IllegalArgumentException("A variable can not have the same name as a function [" + _var + "]");
            }
        }

        return new Expression(ShuntingYard.convertToRPN(this.expression, this.userFunctions, this.userOperators,
                this.variableNames, this.implicitMultiplication), this.userFunctionNameList.toArray());
    }

}
