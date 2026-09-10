import { Injectable } from '@angular/core';
import { Produto } from '../types/produto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CarrinhoService {
  constructor(private http: HttpClient) {}

  listarProdutos(): Observable<Produto[]> {
    const urlApi = `http://127.0.0.1:8000/produtos`;

    return this.http.get<Produto[]>(urlApi);
  }

  localizarProdutos(idproduto: number): Observable<Produto> {
    const urlApi = `http://127.0.0.1:8000/produtos/${idproduto}`;

    return this.http.get<Produto>(urlApi);
  }

  excluirProduto(produto: Produto): Observable<Produto> {
    const urlApi = `http://127.0.0.1:8000/produtos/${produto.idproduto}`;

    return this.http.delete<Produto>(urlApi);
  }

  private produtos: Produto[] = [];

  /* Para puxar o tamanho da array
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
  }*/
}
