/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
namespace net.objecthunter.exp4j.func {
    /**
     * A class representing a Function which can be used in an expression.
     */
    export abstract class _Function {
        name: string;

        numArguments: number;

        public constructor(name: string);

        public constructor(name: string, numArguments: number);

        public constructor(name: string, numArguments: number = 1) {
            if (numArguments < 0){
                throw new Error("The number of function arguments can not be less than 0 for '" + name + "'");
            }
            if (!_Function.isValidFunctionName(name)){
                throw new Error("The function name '" + name + "' is invalid");
            }
            this.name = name;
            this.numArguments = numArguments;
        }

        public getName(): string {
            return this.name;
        }

        public getNumArguments(): number {
            return this.numArguments;
        }

        public abstract apply(...args: number[]): number;

        public static isValidFunctionName(name: string): boolean {
            if (name == null) {
                return false;
            }
            return name.length > 0;
        }
    }

}
