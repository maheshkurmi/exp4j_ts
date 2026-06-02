declare namespace net.objecthunter.exp4j {
    /**
     * Creates a new expression that is a copy of the existing one.
     *
     * @param existing the expression to copy
     */
    class Expression {
        tokens: net.objecthunter.exp4j.tokenizer.Token[];
        variables: Map<string, number>;
        variableKeys: string[];
        userFunctionNames: string[] | null;
        constructor(existing: Expression);
        constructor(tokens: net.objecthunter.exp4j.tokenizer.Token[], userFunctionNames?: string[] | null);
        initDefaultVariables(): void;
        setVariableInternal(name: string, value: number): void;
        setVariable(name: string, value: number): Expression;
        checkVariableName(name: string): void;
        containsUserFunctionName(name: string): boolean;
        clearVariables(): Expression;
        getVariableNames(): string[];
        validate(checkVariablesSet?: boolean): net.objecthunter.exp4j.ValidationResult;
        evaluate(): number;
        evaluateWithException(): number;
    }
}
