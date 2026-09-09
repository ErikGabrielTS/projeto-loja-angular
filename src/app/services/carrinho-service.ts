import { Injectable } from '@angular/core';
import { Produto } from '../types/produto';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarrinhoService {
  private produtos: Produto[] = []


  // Para puxar o tamanho da array
  tamanhoArray(){
    return this.produtos.length
  }

  //Para adicionar um produto na array 
  adicionar(produto: Produto){
    this.produtos.push(produto)
  }

  listar(){
    return this.produtos
  }

  // Buscando pelo id do produto 
  buscarPorId (id: number){
    const produto = this.produtos.find(elem => elem.idproduto == id)

    return of(produto)
  }

  editar(buscaProduto : Produto){
    const buscaProduto = this.produtos.findIndex(elem => elem.idproduto == buscaProduto.idproduto)

    if(posArray != -1)
      this.produtos[posArray] = buscaProduto
  }

  excluir(id : number ){
    this.produtos = this.produtos.filter(elem => elem.idproduto !== id)
  }
  
}
