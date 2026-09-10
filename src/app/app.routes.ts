import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Carrinho } from './components/carrinho/carrinho';
import { MontaResumoCompra } from './monta-resumo-compra/monta-resumo-compra';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: Home},
    { path: 'resumo', component: MontaResumoCompra },
    {path: 'carrinho', component: Carrinho}
];
