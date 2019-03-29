import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEnterpriseComponent } from './view-enterprise.component';

describe('ViewEnterpriseComponent', () => {
  let component: ViewEnterpriseComponent;
  let fixture: ComponentFixture<ViewEnterpriseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEnterpriseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEnterpriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
