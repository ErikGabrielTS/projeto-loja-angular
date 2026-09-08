import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Carrinho } from './components/carrinho/carrinho';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: Home},
    {path: 'carrinho', component: Carrinho}
];
