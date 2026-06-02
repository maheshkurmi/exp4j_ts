/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
namespace net.objecthunter.exp4j {
    /**
     * Creates a new expression that is a copy of the existing one.
     *
     * @param existing the expression to copy
     */
    export class Expression {
        /*private*/ tokens: net.objecthunter.exp4j.tokenizer.Token[];

        /*private*/ variables: Map<string, number>;

        /*private*/ variableKeys: string[];

        /*private*/ userFunctionNames: string[] | null;

        public constructor(existing: Expression);

        public constructor(tokens: net.objecthunter.exp4j.tokenizer.Token[], userFunctionNames?: string[] | null);

        public constructor(
            tokensOrExisting: Expression | net.objecthunter.exp4j.tokenizer.Token[],
            userFunctionNames: string[] | null = null
        ) {
            if (tokensOrExisting instanceof Expression) {
                const existing = tokensOrExisting;
                this.tokens = existing.tokens.slice();
                this.variables = new Map<string, number>();
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
            this.variables = new Map<string, number>();
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

        setVariableInternal(name: string, value: number) {
            this.variables.set(name, value);
            if (!this.variableKeys.includes(name)) {
                this.variableKeys.push(name);
            }
        }

        public setVariable(name: string, value: number): Expression {
            this.checkVariableName(name);
            this.setVariableInternal(name, value);
            return this;
        }

        checkVariableName(name: string) {
            if ((this.userFunctionNames != null && this.containsUserFunctionName(name)) || net.objecthunter.exp4j.func.Functions.getBuiltinFunction(name) != null){
                throw new Error("The variable name '" + name + "' is invalid. Since there exists a function with the same name");
            }
        }

        containsUserFunctionName(name: string): boolean {
            if (this.userFunctionNames == null) {
                return false;
            }
            for (const functionName of this.userFunctionNames) {
                if (functionName != null && functionName === name){
                    return true;
                }
            }
            return false;
        }

        public clearVariables(): Expression {
            this.variables.clear();
            this.variableKeys = [];
            return this;
        }

        public getVariableNames(): string[] {
            const variables: string[] = [];
            for (const t of this.tokens) {
                if (t.getType() === net.objecthunter.exp4j.tokenizer.Token.TOKEN_VARIABLE){
                    const varName = (<net.objecthunter.exp4j.tokenizer.VariableToken>t).getName();
                    if (!variables.includes(varName)) {
                        variables.push(varName);
                    }
                }
            }
            return variables;
        }

        public validate(checkVariablesSet: boolean = true): net.objecthunter.exp4j.ValidationResult {
            const errors: string[] = [];

            if (checkVariablesSet){
                for (const t of this.tokens) {
                    if (t.getType() === net.objecthunter.exp4j.tokenizer.Token.TOKEN_VARIABLE){
                        const _var: string = (<net.objecthunter.exp4j.tokenizer.VariableToken>t).getName();
                        if (!this.variables.has(_var)){
                            errors.push("The setVariable '" + _var + "' has not been set");
                        }
                    }
                }
            }

            let count: number = 0;
            for (const tok of this.tokens) {
                switch((tok.getType())) {
                case net.objecthunter.exp4j.tokenizer.Token.TOKEN_NUMBER:
                case net.objecthunter.exp4j.tokenizer.Token.TOKEN_VARIABLE:
                    count++;
                    break;
                case net.objecthunter.exp4j.tokenizer.Token.TOKEN_FUNCTION:
                    const func: net.objecthunter.exp4j.func._Function = (<net.objecthunter.exp4j.tokenizer.FunctionToken>tok).getFunction();
                    const argsNum: number = func.getNumArguments();
                    if (argsNum > count){
                        errors.push("Not enough arguments for '" + func.getName() + "'");
                    }
                    if (argsNum > 1){
                        count -= argsNum - 1;
                    } else if (argsNum === 0){
                        count++;
                    }
                    break;
                case net.objecthunter.exp4j.tokenizer.Token.TOKEN_OPERATOR:
                    const op: net.objecthunter.exp4j.operator.Operator = (<net.objecthunter.exp4j.tokenizer.OperatorToken>tok).getOperator();
                    if (op.getNumOperands() === 2){
                        count--;
                    }
                    break;
                }

                if (count < 1){
                    errors.push("Too many operators");
                    return new net.objecthunter.exp4j.ValidationResult(false, errors);
                }
            }

            if (count > 1){
                errors.push("Too many operands");
            }

            return errors.length === 0 ? net.objecthunter.exp4j.ValidationResult.SUCCESS : new net.objecthunter.exp4j.ValidationResult(false, errors);
        }

        public evaluate(): number {
            try {
                return this.evaluateWithException();
            } catch(e) {
                const err = e as Error;
                console.error(err.message, err);
                return NaN;
            }
        }

        public evaluateWithException(): number {
            const output: net.objecthunter.exp4j.ArrayStack = new net.objecthunter.exp4j.ArrayStack();
            for (const t of this.tokens) {
                if (t.getType() === net.objecthunter.exp4j.tokenizer.Token.TOKEN_NUMBER){
                    output.push((<net.objecthunter.exp4j.tokenizer.NumberToken>t).getValue());
                } else if (t.getType() === net.objecthunter.exp4j.tokenizer.Token.TOKEN_VARIABLE){
                    const name: string = (<net.objecthunter.exp4j.tokenizer.VariableToken>t).getName();
                    const value: number | undefined = this.variables.get(name);
                    if (value == null){
                        throw new Error("No value has been set for the setVariable '" + name + "'.");
                    }
                    output.push(value);
                } else if (t.getType() === net.objecthunter.exp4j.tokenizer.Token.TOKEN_OPERATOR){
                    const op: net.objecthunter.exp4j.tokenizer.OperatorToken = <net.objecthunter.exp4j.tokenizer.OperatorToken>t;
                    if (output.size() < op.getOperator().getNumOperands()){
                        throw new Error("Invalid number of operands available for '" + op.getOperator().getSymbol() + "' operator");
                    }
                    if (op.getOperator().getNumOperands() === 2){
                        const rightArg: number = output.pop();
                        const leftArg: number = output.pop();
                        output.push(op.getOperator().apply(leftArg, rightArg));
                    } else if (op.getOperator().getNumOperands() === 1){
                        const arg: number = output.pop();
                        output.push(op.getOperator().apply(arg));
                    }
                } else if (t.getType() === net.objecthunter.exp4j.tokenizer.Token.TOKEN_FUNCTION){
                    const func: net.objecthunter.exp4j.tokenizer.FunctionToken = <net.objecthunter.exp4j.tokenizer.FunctionToken>t;
                    const numArguments: number = func.getFunction().getNumArguments();
                    if (output.size() < numArguments){
                        throw new Error("Invalid number of arguments available for '" + func.getFunction().getName() + "' function");
                    }
                    const args: number[] = new Array<number>(numArguments);
                    for (let j: number = numArguments - 1; j >= 0; j--) {
                        args[j] = output.pop();
                    }
                    output.push(func.getFunction().apply(...args));
                }
            }

            if (output.size() > 1){
                throw new Error("Invalid number of items on the output queue. Might be caused by an invalid number of arguments for a function.");
            }
            return output.pop();
        }
    }

}
