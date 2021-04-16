import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescuentoChequeComponent } from './descuento-cheque.component';

describe('DescuentoChequeComponent', () => {
  let component: DescuentoChequeComponent;
  let fixture: ComponentFixture<DescuentoChequeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescuentoChequeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescuentoChequeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
