import { Component, signal } from '@angular/core';
import { Produto } from '../../types/produto';
import { CarrinhoService } from '../../services/carrinho-service';
import { Router } from '@angular/router';
import { FabAdd } from '../fab-add/fab-add';

@Component({
  selector: 'app-carrinho',
  imports: [FabAdd],
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.css',
})
export class Carrinho {
  listaProdutos = signal<Produto[]>([]);

  constructor(
    private router: Router,
    private http: CarrinhoService,
  ) {}

  ngOnInit() {
    this.listarProdutos();
  }

  listarProdutos() {
    this.http.listarProdutos().subscribe({
      next: (dados) => {
        this.listaProdutos.set([...dados].sort((a, b) => a.produto.localeCompare(b.produto)));
      },
      error: (msgErro) => {
        console.log('Erro ao cadastrar o produto', msgErro);
      },
    });
  }

  excluirProduto(produto: Produto) {
    if (confirm(`Deseja excluir ${produto.produto} da competição? `)) {
      this.http.excluirProduto(produto).subscribe({
        next: (dados) => {
          this.listaProdutos.update((elem) =>
            elem.filter((a) => a.idproduto !== produto.idproduto),
          );

          console.log('Produto excluído com Sucesso ', dados);
        },
        error: (msgErro) => {
          console.log('Erro ao Excluir  o produto ', msgErro);
        },
      });
    }
    this.ngOnInit();
  }

  //ALTERAR DADOS
  /*buscarProduto(idproduto: Produto){
    this.router.navigate(['/cadastroproduto', idproduto])
  }*/
}
