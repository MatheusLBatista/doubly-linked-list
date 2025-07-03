import { List } from "../interfaces/list.js"

export class Node<T> {
    public dado: T;
    public proximo: Node<T> | null = null;
    public anterior: Node<T> | null = null;

    constructor(dado: T) {
        this.dado = dado;
    }
}

export class LinkedList<T>  {
    private inicio: Node<T> | null = null;
    private fim: Node<T> | null = null;
    private tamanho: number = 0;

    addFirst(dado: T): void {
        const novoNo = new Node(dado);
        if (!this.inicio) {
            this.inicio = this.fim = novoNo;
        } else {
            novoNo.proximo = this.inicio;
            this.inicio.anterior = novoNo;
            this.inicio = novoNo;
        }
        this.tamanho++;
    }
}