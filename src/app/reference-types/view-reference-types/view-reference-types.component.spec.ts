import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReferenceTypesComponent } from './view-reference-types.component';

describe('ViewReferenceTypesComponent', () => {
  let component: ViewReferenceTypesComponent;
  let fixture: ComponentFixture<ViewReferenceTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewReferenceTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewReferenceTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
