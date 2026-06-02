declare namespace net.objecthunter.exp4j.tokenizer {
    class FunctionToken extends net.objecthunter.exp4j.tokenizer.Token {
        _function: net.objecthunter.exp4j.func._Function;
        constructor(_function: net.objecthunter.exp4j.func._Function);
        getFunction(): net.objecthunter.exp4j.func._Function;
    }
}
