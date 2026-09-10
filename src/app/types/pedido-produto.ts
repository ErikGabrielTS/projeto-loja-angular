// types/pedido-produto.ts
export interface PedidoProdutoCreate {
  idpedido: number;
  idproduto: number;
  quantidade: number;
  valor_unitario: number;
}