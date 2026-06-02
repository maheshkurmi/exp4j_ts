/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
var net;
(function (net) {
    var objecthunter;
    (function (objecthunter) {
        var exp4j;
        (function (exp4j) {
            var func;
            (function (func) {
                /**
                 * A class representing a Function which can be used in an expression.
                 */
                class _Function {
                    constructor(name, numArguments = 1) {
                        if (numArguments < 0) {
                            throw new Error("The number of function arguments can not be less than 0 for '" + name + "'");
                        }
                        if (!_Function.isValidFunctionName(name)) {
                            throw new Error("The function name '" + name + "' is invalid");
                        }
                        this.name = name;
                        this.numArguments = numArguments;
                    }
                    getName() {
                        return this.name;
                    }
                    getNumArguments() {
                        return this.numArguments;
                    }
                    static isValidFunctionName(name) {
                        if (name == null) {
                            return false;
                        }
                        return name.length > 0;
                    }
                }
                func._Function = _Function;
            })(func = exp4j.func || (exp4j.func = {}));
        })(exp4j = objecthunter.exp4j || (objecthunter.exp4j = {}));
    })(objecthunter = net.objecthunter || (net.objecthunter = {}));
})(net || (net = {}));
//# sourceMappingURL=_Function.js.map