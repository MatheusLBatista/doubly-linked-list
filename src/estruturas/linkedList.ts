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

    addLast(dado: T): void {
        const novoNo = new Node(dado);
        if (!this.fim) {
            this.inicio = this.fim = novoNo;
        } else {
            this.fim.proximo = novoNo;
            novoNo.anterior = this.fim;
            this.fim = novoNo;
        }
        this.tamanho++;
    }

    add(dado: T, index: number): void {
        if (index < 0 || index > this.tamanho) {
            throw new Error("Índice fora do intervalo válido");
        }

        if (index === 0) {
            this.addFirst(dado);
            return;
        }

        if (index === this.tamanho) {
            this.addLast(dado);
            return;
        }

        const novoNo = new Node(dado);
        let atual = this.inicio;

        for (let i = 0; i < index; i++) {
            atual = atual!.proximo;
        }

        const anterior = atual!.anterior;

        novoNo.anterior = anterior;
        novoNo.proximo = atual;

        if (anterior) anterior.proximo = novoNo;
        if (atual) atual.anterior = novoNo;

        this.tamanho++;
    }

    removeFirst(): T | undefined {
        if (!this.inicio) return undefined;
        const valor = this.inicio.dado;
        this.inicio = this.inicio.proximo;
        if (this.inicio) {
            this.inicio.anterior = null;
        } else {
            this.fim = null;
        }
        this.tamanho--;
        return valor;
    }

    removeLast(): T {
        if (!this.fim) throw new Error("Lista vazia");
        const valor = this.fim.dado;
        this.fim = this.fim.anterior;
        if (this.fim) {
            this.fim.proximo = null;
        } else {
            this.inicio = null;
        }
        this.tamanho--;
        return valor;
    }

    remove(index: number): T {
        if (index < 0 || index >= this.tamanho) {
            throw new Error("Índice inválido. Tente novamente!");
        }

        if (index === 0) {
            const valor = this.removeFirst();
            if (valor === undefined) throw new Error("Erro ao tentar remover");
            return valor;
        }

        if (index === this.tamanho - 1) {
            return this.removeLast();
        }

        let atual: Node<T> | null;
        let i: number;

        if (index < this.tamanho / 2) {
            atual = this.inicio;
            i = 0;
            while (i < index && atual) {
                atual = atual.proximo;
                i++;
            }
        } else {
            atual = this.fim;
            i = this.tamanho - 1;
            while (i > index && atual) {
                atual = atual.anterior;
                i--;
            }
        }

        const anterior = atual!.anterior;
        const proximo = atual!.proximo;

        if (anterior) {
            anterior.proximo = proximo;
        } 
        else if (proximo){
            proximo.anterior = anterior;
        }
        this.tamanho--;

        return atual!.dado;
    }

    size(): number {
        return this.tamanho;
    }

    isEmpty(): boolean {
        return this.tamanho === 0;
    }

    peekLast(): T | undefined {
        return this.fim?.dado;
    }

    clear(): void {
        this.inicio = null;
        this.fim = null;
        this.tamanho = 0;
    }
}