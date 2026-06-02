/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
namespace net.objecthunter.exp4j {
    /**
     * Simple double stack using an array as data storage.
     */
    export class ArrayStack {
        /*private*/ data: number[];

        /*private*/ idx: number;

        public constructor();

        public constructor(initialCapacity: number);

        public constructor(initialCapacity: number = 5) {
            if (initialCapacity <= 0){
                throw new Error("Stack's capacity must be positive");
            }
            this.data = new Array<number>(initialCapacity).fill(0);
            this.idx = -1;
        }

        push(value: number) {
            if (this.idx + 1 === this.data.length){
                const nextLength = (this.data.length * 1.2 | 0) + 1;
                const temp: number[] = new Array<number>(nextLength).fill(0);
                for (let i = 0; i < this.data.length; i++) {
                    temp[i] = this.data[i];
                }
                this.data = temp;
            }
            this.data[++this.idx] = value;
        }

        peek(): number {
            if (this.idx === -1){
                throw new Error("Stack is empty");
            }
            return this.data[this.idx];
        }

        pop(): number {
            if (this.idx === -1){
                throw new Error("Stack is empty");
            }
            return this.data[this.idx--];
        }

        isEmpty(): boolean {
            return this.idx === -1;
        }

        size(): number {
            return this.idx + 1;
        }
    }

}
