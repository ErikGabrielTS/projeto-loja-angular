import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Carrinho } from './components/carrinho/carrinho';
import { ListaProduto } from './components/lista-produto/lista-produto';
import { PedidoProduto } from './components/pedido-produto/pedido-produto';
import { ResumoCarrinho } from './components/resumo-carrinho/resumo-carrinho';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'home', component: Home},
    {path: 'listaproduto', component: ListaProduto},
    {path: 'carrinho', component: Carrinho},
    {path: 'resumo', component: ResumoCarrinho},
    {path: 'pedido', component: PedidoProduto}
];
