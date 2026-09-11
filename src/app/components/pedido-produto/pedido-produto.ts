import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { PedidoService } from '../../services/pedido-service';
import { PedidoDetalhado } from '../../types/pedido-detalhado';


@Component({
  selector: 'app-pedido-produto',
  imports: [CommonModule, FormsModule, CurrencyPipe],
  templateUrl: './pedido-produto.html',
  styleUrl: './pedido-produto.css',
})
export class PedidoProduto {
  idpedido = signal<number | null>(null);
  pedido = signal<PedidoDetalhado | null>(null);
  erro = signal<string | null>(null);

  constructor(private pedidoService: PedidoService) {}

  buscarPedido() {
    const id = this.idpedido();
    if (!id) {
      this.erro.set('Informe um ID de pedido.');
      return;
    }

    this.erro.set(null);
    this.pedido.set(null);

    this.pedidoService.buscarDetalhado(id).subscribe({
      next: (dados) => this.pedido.set(dados),
      error: (err) => {
        console.error(err);
        this.erro.set('Pedido não encontrado.');
      },
    });
  }

  valorTotal = computed(() => {
    const produtos = this.pedido()?.produtos ?? [];
    return produtos.reduce(
      (total, item) => total + item.quantidade * item.valor_unitario,
      0
    );
  });
}
