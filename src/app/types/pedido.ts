export interface PedidoCreate {
  idpessoa: number;
  data_pedido: string; // formato YYYY-MM-DD
  status_pedido: string;
}

export interface Pedido extends PedidoCreate {
  idpedido: number;
}