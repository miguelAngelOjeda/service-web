import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReferenceTypesComponent } from './list-reference-types.component';

describe('ListReferenceTypesComponent', () => {
  let component: ListReferenceTypesComponent;
  let fixture: ComponentFixture<ListReferenceTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListReferenceTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListReferenceTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
