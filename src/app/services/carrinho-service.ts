import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Produto } from '../types/produto';
import { ItemCarrinho } from '../types/itemCarrinho';

const CHAVE_STORAGE = 'carrinho';

@Injectable({
  providedIn: 'root',
})
export class CarrinhoService {
  private plataformaId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.plataformaId);

  carrinho = signal<ItemCarrinho[]>(this.carregarDoStorage());

  private carregarDoStorage(): ItemCarrinho[] {
    if (!this.isBrowser) {
      return [];
    }
    const dados = localStorage.getItem(CHAVE_STORAGE);
    return dados ? JSON.parse(dados) : [];
  }

  private salvarNoStorage(itens: ItemCarrinho[]) {
    if (!this.isBrowser) {
      return;
    }
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(itens));
  }

  listar() {
    return this.carrinho();
  }

  adicionarAoCarrinho(produto: Produto) {
    const itemExistente = this.carrinho().find(
      (item) => item.produto.idproduto === produto.idproduto
    );

    if (itemExistente) {
      this.carrinho.update((itens) =>
        itens.map((item) =>
          item.produto.idproduto === produto.idproduto
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        )
      );
    } else {
      this.carrinho.update((itens) => [
        ...itens,
        { produto, quantidade: 1, valor_unitario: produto.valor_unitario },
      ]);
    }

    this.salvarNoStorage(this.carrinho());
  }

  alterarQuantidade(idproduto: number, quantidade: number) {
    this.carrinho.update((itens) =>
      itens.map((item) =>
        item.produto.idproduto === idproduto
          ? { ...item, quantidade }
          : item
      )
    );
    this.salvarNoStorage(this.carrinho());
  }

  removerDoCarrinho(idproduto: number) {
    this.carrinho.update((itens) =>
      itens.filter((item) => item.produto.idproduto !== idproduto)
    );
    this.salvarNoStorage(this.carrinho());
  }

  limparCarrinho() {
    this.carrinho.set([]);
    this.salvarNoStorage([]);
  }
}