import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MontaResumoCompra } from './monta-resumo-compra';

describe('MontaResumoCompra', () => {
  let component: MontaResumoCompra;
  let fixture: ComponentFixture<MontaResumoCompra>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MontaResumoCompra],
    }).compileComponents();

    fixture = TestBed.createComponent(MontaResumoCompra);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
