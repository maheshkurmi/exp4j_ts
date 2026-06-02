declare namespace net.objecthunter.exp4j {
    /**
     * Simple double stack using an array as data storage.
     */
    class ArrayStack {
        data: number[];
        idx: number;
        constructor();
        constructor(initialCapacity: number);
        push(value: number): void;
        peek(): number;
        pop(): number;
        isEmpty(): boolean;
        size(): number;
    }
}
