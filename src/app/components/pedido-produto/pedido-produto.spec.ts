import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoProduto } from './pedido-produto';

describe('PedidoProduto', () => {
  let component: PedidoProduto;
  let fixture: ComponentFixture<PedidoProduto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidoProduto],
    }).compileComponents();

    fixture = TestBed.createComponent(PedidoProduto);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
