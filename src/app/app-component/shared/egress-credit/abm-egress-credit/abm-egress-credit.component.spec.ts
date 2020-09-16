import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmEgressCreditComponent } from './abm-egress-credit.component';

describe('AbmEgressCreditComponent', () => {
  let component: AbmEgressCreditComponent;
  let fixture: ComponentFixture<AbmEgressCreditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbmEgressCreditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmEgressCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
