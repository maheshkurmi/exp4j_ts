declare namespace net.objecthunter.exp4j.func {
    /**
     * A class representing a Function which can be used in an expression.
     */
    abstract class _Function {
        name: string;
        numArguments: number;
        constructor(name: string);
        constructor(name: string, numArguments: number);
        getName(): string;
        getNumArguments(): number;
        abstract apply(...args: number[]): number;
        static isValidFunctionName(name: string): boolean;
    }
}
