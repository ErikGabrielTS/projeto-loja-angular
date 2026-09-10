// types/item-carrinho.ts
import { Produto } from './produto';

export interface ItemCarrinho {
  produto: Produto;
  quantidade: number;
  valor_unitario: number;
}