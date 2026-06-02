/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
var net;
(function (net) {
    var objecthunter;
    (function (objecthunter) {
        var exp4j;
        (function (exp4j) {
            /**
             * Simple double stack using an array as data storage.
             */
            class ArrayStack {
                constructor(initialCapacity = 5) {
                    if (initialCapacity <= 0) {
                        throw new Error("Stack's capacity must be positive");
                    }
                    this.data = new Array(initialCapacity).fill(0);
                    this.idx = -1;
                }
                push(value) {
                    if (this.idx + 1 === this.data.length) {
                        const nextLength = (this.data.length * 1.2 | 0) + 1;
                        const temp = new Array(nextLength).fill(0);
                        for (let i = 0; i < this.data.length; i++) {
                            temp[i] = this.data[i];
                        }
                        this.data = temp;
                    }
                    this.data[++this.idx] = value;
                }
                peek() {
                    if (this.idx === -1) {
                        throw new Error("Stack is empty");
                    }
                    return this.data[this.idx];
                }
                pop() {
                    if (this.idx === -1) {
                        throw new Error("Stack is empty");
                    }
                    return this.data[this.idx--];
                }
                isEmpty() {
                    return this.idx === -1;
                }
                size() {
                    return this.idx + 1;
                }
            }
            exp4j.ArrayStack = ArrayStack;
        })(exp4j = objecthunter.exp4j || (objecthunter.exp4j = {}));
    })(objecthunter = net.objecthunter || (net.objecthunter = {}));
})(net || (net = {}));
//# sourceMappingURL=ArrayStack.js.map