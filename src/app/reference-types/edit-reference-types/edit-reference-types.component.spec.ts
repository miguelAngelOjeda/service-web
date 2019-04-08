import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReferenceTypesComponent } from './edit-reference-types.component';

describe('EditReferenceTypesComponent', () => {
  let component: EditReferenceTypesComponent;
  let fixture: ComponentFixture<EditReferenceTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditReferenceTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditReferenceTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
