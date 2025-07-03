export interface List<T>{
    addFirst(data: T): void;
    addLast(data: T): void;
    add(data: T, index: number): void;
    removeFirst(): T;
    removeLast(): T;
    remove(index: number): T;
    peekFirst(): T;
    peekLast(): T;
    get(position: number): T;
    size(): number;
    isEmpty(): boolean;
    clear(): void;
    printAll(): void;
}