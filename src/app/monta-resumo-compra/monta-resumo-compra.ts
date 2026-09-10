import { Component, OnInit } from '@angular/core';
import { CarrinhoService } from '../../services/carrinho-service';

@Component({
  selector: 'app-monta-resumo-compra',
  imports: [],
  templateUrl: './monta-resumo-compra.html',
  styleUrl: './monta-resumo-compra.css',
})
export class MontaResumoCompra implements OnInit {
  cep: string = '';
  valorFrete: number = 0;
  freteCalculado: boolean = false;
  carregandoFrete: boolean = false;
  erroFrete: string = '';
  cidadeEstado: string = '';

  constructor(public carrinhoService: CarrinhoService) {}

  ngOnInit(): void {}

  calcularFrete(): void {
    const cepLimpo = this.cep.replace(/\D/g, '');

    if (cepLimpo.length !== 8) {
      this.erroFrete = 'Digite um CEP válido com 8 dígitos.';
      this.freteCalculado = false;
      return;
    }

    this.carregandoFrete = true;
    this.erroFrete = '';

    this.carrinhoService.consultarFreteAPI(cepLimpo).subscribe({
      next: (dados) => {
        this.carregandoFrete = false;
        if (dados.erro) {
          this.erroFrete = 'CEP não encontrado.';
          this.freteCalculado = false;
          this.cidadeEstado = '';
        } else {
          // Exemplo: Define valor fixo de frete e exibe a localização
          this.valorFrete = 15.00;
          this.freteCalculado = true;
          this.cidadeEstado = `${dados.localidade} - ${dados.uf}`;
        }
      },
      error: () => {
        this.carregandoFrete = false;
        this.erroFrete = 'Erro ao consultar o CEP.';
        this.freteCalculado = false;
      }
    });
  }

  obterTotalFinal(): number {
    return this.carrinhoService.obterSubtotal() + (this.freteCalculado ? this.valorFrete : 0);
  }
}

