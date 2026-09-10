export interface ProdutoPedidoDetalhado {
  idproduto: number;
  descricao_produto: string;
}

export interface PedidoProdutoDetalhado {
  idproduto: number;
  quantidade: number;
  valor_unitario: number;
  produto: ProdutoPedidoDetalhado;
}

export interface PessoaPedido {
  idpessoa: number;
  nome: string;
}

export interface PedidoDetalhado {
  idpedido: number;
  status_pedido: string;
  pessoa: PessoaPedido;
  produtos: PedidoProdutoDetalhado[];
}