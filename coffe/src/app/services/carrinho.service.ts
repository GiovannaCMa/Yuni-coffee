import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ItemCarrinho {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
  imagem?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private carrinho: ItemCarrinho[] = [];
  private carrinho$ = new BehaviorSubject<ItemCarrinho[]>([]);

  constructor() {
    const salvo = localStorage.getItem('carrinho');
    if (salvo) {
      this.carrinho = JSON.parse(salvo);
      this.carrinho$.next(this.carrinho);
    }
  }

  getCarrinho() {
    return this.carrinho$.asObservable();
  }

  adicionar(item: ItemCarrinho) {
    const existente = this.carrinho.find(p => p.id === item.id);
    if (existente) {
      existente.quantidade += item.quantidade;
    } else {
      this.carrinho.push(item);
    }
    this.atualizarStorage();
  }

  remover(id: number) {
    this.carrinho = this.carrinho.filter(p => p.id !== id);
    this.atualizarStorage();
  }

  limpar() {
    this.carrinho = [];
    this.atualizarStorage();
  }

  private atualizarStorage() {
    localStorage.setItem('carrinho', JSON.stringify(this.carrinho));
    this.carrinho$.next([...this.carrinho]);
  }

  getTotal() {
    return this.carrinho.reduce((t, p) => t + p.preco * p.quantidade, 0);
  }
}
