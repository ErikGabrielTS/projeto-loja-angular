import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarrinhoService } from '../../services/carrinho-service';
import { ItemCarrinho } from '../../types/itemCarrinho';


@Component({
  selector: 'app-resumo-carrinho',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resumo-carrinho.html',
  styleUrl: './resumo-carrinho.css',
})
export class ResumoCarrinho {
  // Injeta o serviço do carrinho sem precisar do construtor
  private carrinhoService = inject(CarrinhoService);

  // Acessa o signal diretamente do serviço
  itens = this.carrinhoService.carrinho;

  // Signal computado para o Subtotal (com tipagem explícita no reduce)
  subtotal = computed(() => {
    return this.itens().reduce(
      (acc: number, item: ItemCarrinho) => acc + item.valor_unitario * item.quantidade,
      0
    );
  });

  // Signal computado para o Total
  total = computed(() => this.subtotal());
  
}