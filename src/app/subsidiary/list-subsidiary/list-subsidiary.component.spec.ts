import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSubsidiaryComponent } from './list-subsidiary.component';

describe('ListSubsidiaryComponent', () => {
  let component: ListSubsidiaryComponent;
  let fixture: ComponentFixture<ListSubsidiaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSubsidiaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSubsidiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
