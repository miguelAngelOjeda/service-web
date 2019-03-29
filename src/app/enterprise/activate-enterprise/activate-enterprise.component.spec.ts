import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateEnterpriseComponent } from './activate-enterprise.component';

describe('ActivateEnterpriseComponent', () => {
  let component: ActivateEnterpriseComponent;
  let fixture: ComponentFixture<ActivateEnterpriseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivateEnterpriseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivateEnterpriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
