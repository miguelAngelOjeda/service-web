import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEnterpriseComponent } from './list-enterprise.component';

describe('ListEnterpriseComponent', () => {
  let component: ListEnterpriseComponent;
  let fixture: ComponentFixture<ListEnterpriseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEnterpriseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEnterpriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
