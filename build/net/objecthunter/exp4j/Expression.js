/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
var net;
(function (net) {
    var objecthunter;
    (function (objecthunter) {
        var exp4j;
        (function (exp4j) {
            /**
             * Creates a new expression that is a copy of the existing one.
             *
             * @param existing the expression to copy
             */
            class Expression {
                constructor(tokensOrExisting, userFunctionNames = null) {
                    if (tokensOrExisting instanceof Expression) {
                        const existing = tokensOrExisting;
                        this.tokens = existing.tokens.slice();
                        this.variables = new Map();
                        this.variableKeys = [];
                        for (const key of existing.variableKeys) {
                            if (!this.variableKeys.includes(key)) {
                                this.variableKeys.push(key);
                            }
                            this.variables.set(key, existing.variables.get(key));
                        }
                        this.userFunctionNames = existing.userFunctionNames == null ? null : existing.userFunctionNames.slice();
                        return;
                    }
                    this.tokens = tokensOrExisting;
                    this.variables = new Map();
                    this.variableKeys = [];
                    this.initDefaultVariables();
                    this.userFunctionNames = userFunctionNames == null ? null : userFunctionNames.slice();
                }
                initDefaultVariables() {
                    this.setVariableInternal("pi", Math.PI);
                    this.setVariableInternal("\u03c0", Math.PI);
                    this.setVariableInternal("\u03c6", 1.61803398874);
                    this.setVariableInternal("e", Math.E);
                    this.setVariableInternal("true", 1.0);
                    this.setVariableInternal("false", 0.0);
                    this.setVariableInternal("null", NaN);
                }
                setVariableInternal(name, value) {
                    this.variables.set(name, value);
                    if (!this.variableKeys.includes(name)) {
                        this.variableKeys.push(name);
                    }
                }
                setVariable(name, value) {
                    this.checkVariableName(name);
                    this.setVariableInternal(name, value);
                    return this;
                }
                checkVariableName(name) {
                    if ((this.userFunctionNames != null && this.containsUserFunctionName(name)) || net.objecthunter.exp4j.func.Functions.getBuiltinFunction(name) != null) {
                        throw new Error("The variable name '" + name + "' is invalid. Since there exists a function with the same name");
                    }
                }
                containsUserFunctionName(name) {
                    if (this.userFunctionNames == null) {
                        return false;
                    }
                    for (const functionName of this.userFunctionNames) {
                        if (functionName != null && functionName === name) {
                            return true;
                        }
                    }
                    return false;
                }
                clearVariables() {
                    this.variables.clear();
                    this.variableKeys = [];
                    return this;
                }
                getVariableNames() {
                    const variables = [];
                    for (const t of this.tokens) {
                        if (t.getType() === net.objecthunter.exp4j.tokenizer.Token.TOKEN_VARIABLE) {
                            const varName = t.getName();
                            if (!variables.includes(varName)) {
                                variables.push(varName);
                            }
                        }
                    }
                    return variables;
                }
                validate(checkVariablesSet = true) {
                    const errors = [];
                    if (checkVariablesSet) {
                        for (const t of this.tokens) {
                            if (t.getType() === net.objecthunter.exp4j.tokenizer.Token.TOKEN_VARIABLE) {
                                const _var = t.getName();
                                if (!this.variables.has(_var)) {
                                    errors.push("The setVariable '" + _var + "' has not been set");
                                }
                            }
                        }
                    }
                    let count = 0;
                    for (const tok of this.tokens) {
                        switch ((tok.getType())) {
                            case net.objecthunter.exp4j.tokenizer.Token.TOKEN_NUMBER:
                            case net.objecthunter.exp4j.tokenizer.Token.TOKEN_VARIABLE:
                                count++;
                                break;
                            case net.objecthunter.exp4j.tokenizer.Token.TOKEN_FUNCTION:
                                const func = tok.getFunction();
                                const argsNum = func.getNumArguments();
                                if (argsNum > count) {
                                    errors.push("Not enough arguments for '" + func.getName() + "'");
                                }
                                if (argsNum > 1) {
                                    count -= argsNum - 1;
                                }
                                else if (argsNum === 0) {
                                    count++;
                                }
                                break;
                            case net.objecthunter.exp4j.tokenizer.Token.TOKEN_OPERATOR:
                                const op = tok.getOperator();
                                if (op.getNumOperands() === 2) {
                                    count--;
                                }
                                break;
                        }
                        if (count < 1) {
                            errors.push("Too many operators");
                            return new net.objecthunter.exp4j.ValidationResult(false, errors);
                        }
                    }
                    if (count > 1) {
                        errors.push("Too many operands");
                    }
                    return errors.length === 0 ? net.objecthunter.exp4j.ValidationResult.SUCCESS : new net.objecthunter.exp4j.ValidationResult(false, errors);
                }
                evaluate() {
                    try {
                        return this.evaluateWithException();
                    }
                    catch (e) {
                        const err = e;
                        console.error(err.message, err);
                        return NaN;
                    }
                }
                evaluateWithException() {
                    const output = new net.objecthunter.exp4j.ArrayStack();
                    for (const t of this.tokens) {
                        if (t.getType() === net.objecthunter.exp4j.tokenizer.Token.TOKEN_NUMBER) {
                            output.push(t.getValue());
                        }
                        else if (t.getType() === net.objecthunter.exp4j.tokenizer.Token.TOKEN_VARIABLE) {
                            const name = t.getName();
                            const value = this.variables.get(name);
                            if (value == null) {
                                throw new Error("No value has been set for the setVariable '" + name + "'.");
                            }
                            output.push(value);
                        }
                        else if (t.getType() === net.objecthunter.exp4j.tokenizer.Token.TOKEN_OPERATOR) {
                            const op = t;
                            if (output.size() < op.getOperator().getNumOperands()) {
                                throw new Error("Invalid number of operands available for '" + op.getOperator().getSymbol() + "' operator");
                            }
                            if (op.getOperator().getNumOperands() === 2) {
                                const rightArg = output.pop();
                                const leftArg = output.pop();
                                output.push(op.getOperator().apply(leftArg, rightArg));
                            }
                            else if (op.getOperator().getNumOperands() === 1) {
                                const arg = output.pop();
                                output.push(op.getOperator().apply(arg));
                            }
                        }
                        else if (t.getType() === net.objecthunter.exp4j.tokenizer.Token.TOKEN_FUNCTION) {
                            const func = t;
                            const numArguments = func.getFunction().getNumArguments();
                            if (output.size() < numArguments) {
                                throw new Error("Invalid number of arguments available for '" + func.getFunction().getName() + "' function");
                            }
                            const args = new Array(numArguments);
                            for (let j = numArguments - 1; j >= 0; j--) {
                                args[j] = output.pop();
                            }
                            output.push(func.getFunction().apply(...args));
                        }
                    }
                    if (output.size() > 1) {
                        throw new Error("Invalid number of items on the output queue. Might be caused by an invalid number of arguments for a function.");
                    }
                    return output.pop();
                }
            }
            exp4j.Expression = Expression;
        })(exp4j = objecthunter.exp4j || (objecthunter.exp4j = {}));
    })(objecthunter = net.objecthunter || (net.objecthunter = {}));
})(net || (net = {}));
//# sourceMappingURL=Expression.js.map