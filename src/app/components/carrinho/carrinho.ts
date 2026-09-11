import { Component, signal } from '@angular/core';
import { CarrinhoService } from '../../services/carrinho-service';
import { Router } from '@angular/router';
import { ItemCarrinho } from '../../types/itemCarrinho';
import { PedidoService } from '../../services/pedido-service';
import { PedidoCreate } from '../../types/pedido';
import { PedidoProdutoCreate } from '../../types/pedido-produto';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-carrinho',
  imports: [],
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.css',
})
export class Carrinho {
  listaCarrinho = signal<ItemCarrinho[]>([]);

  constructor(
    private router: Router,
    private carrinhoService: CarrinhoService,
    private pedidoService: PedidoService,
  ) {}

  ngOnInit() {
    this.listarItens();
  }

  listarItens() {
    const itens = this.carrinhoService.listar();
    this.listaCarrinho.set(
      [...itens].sort((a, b) => a.produto.produto.localeCompare(b.produto.produto)),
    );
  }

  excluirProduto(item: ItemCarrinho) {
    if (confirm(`Deseja excluir ${item.produto.produto} do carrinho? `)) {
      this.carrinhoService.removerDoCarrinho(item.produto.idproduto);
      this.listarItens();
    }
  }

  alterarQuantidade(item: ItemCarrinho, event: Event) {
    const input = event.target as HTMLInputElement;
    const quantidade = Number(input.value);

    if (quantidade >= 1 && quantidade <= item.produto.estoque) {
      this.carrinhoService.alterarQuantidade(item.produto.idproduto, quantidade);
      this.listarItens();
    }
  }

  finalizarPedido() {
    const itens = this.carrinhoService.listar();

    if (itens.length === 0) {
      alert('O carrinho está vazio.');
      return;
    }

    const IDPESSOA_TESTE = 1; // TODO: trocar quando tiver login

    const novoPedido: PedidoCreate = {
      idpessoa: IDPESSOA_TESTE,
      data_pedido: new Date().toISOString().split('T')[0],
      status_pedido: 'A',
    };

    this.pedidoService
      .criarPedido(novoPedido)
      .pipe(
        switchMap((pedidoCriado) => {
          const produtosDoPedido: PedidoProdutoCreate[] = itens.map((item) => ({
            idpedido: pedidoCriado.idpedido,
            idproduto: item.produto.idproduto,
            quantidade: item.quantidade,
            valor_unitario: item.valor_unitario,
          }));

          return this.pedidoService.adicionarProdutos(pedidoCriado.idpedido, produtosDoPedido);
        }),
      )
      .subscribe({
        next: () => {
          console.log('Pedido finalizado com sucesso');
          this.carrinhoService.limparCarrinho();
          this.listarItens();
          this.router.navigate(['/home']);
        },
        error: (msgErro) => {
          console.log('Erro ao finalizar pedido', msgErro);
        },
      });
  }
}
