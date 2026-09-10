import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido, PedidoCreate } from '../types/pedido';
import { PedidoProdutoCreate } from '../types/pedido-produto';
import { PedidoDetalhado } from '../types/pedido-detalhado';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private urlBase = 'http://127.0.0.1:8000/pedidos';

  constructor(private http: HttpClient) {}

  criarPedido(pedido: PedidoCreate): Observable<Pedido> {
    return this.http.post<Pedido>(`${this.urlBase}/`, pedido);
  }

  adicionarProdutos(
    idpedido: number,
    produtos: PedidoProdutoCreate[]
  ): Observable<PedidoProdutoCreate[]> {
    return this.http.post<PedidoProdutoCreate[]>(
      `${this.urlBase}/${idpedido}/produtos`,
      produtos
    );
  }

  buscarDetalhado(idpedido: number): Observable<PedidoDetalhado> {
  return this.http.get<PedidoDetalhado>(`${this.urlBase}/${idpedido}/detalhado`);
  }

}