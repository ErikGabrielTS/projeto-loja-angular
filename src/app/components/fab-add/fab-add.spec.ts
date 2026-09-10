import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FabAdd } from './fab-add';

describe('FabAdd', () => {
  let component: FabAdd;
  let fixture: ComponentFixture<FabAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FabAdd],
    }).compileComponents();

    fixture = TestBed.createComponent(FabAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
