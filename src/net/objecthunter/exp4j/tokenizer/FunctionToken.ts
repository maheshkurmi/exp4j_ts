/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
namespace net.objecthunter.exp4j.tokenizer {
    export class FunctionToken extends net.objecthunter.exp4j.tokenizer.Token {
        /*private*/ _function: net.objecthunter.exp4j.func._Function;

        public constructor(_function: net.objecthunter.exp4j.func._Function) {
            super(net.objecthunter.exp4j.tokenizer.Token.TOKEN_FUNCTION);
            if (this._function === undefined) { this._function = null; }
            this._function = _function;
        }

        public getFunction(): net.objecthunter.exp4j.func._Function {
            return this._function;
        }
    }

}

