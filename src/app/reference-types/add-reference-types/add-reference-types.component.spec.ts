import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReferenceTypesComponent } from './add-reference-types.component';

describe('AddReferenceTypesComponent', () => {
  let component: AddReferenceTypesComponent;
  let fixture: ComponentFixture<AddReferenceTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddReferenceTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReferenceTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
