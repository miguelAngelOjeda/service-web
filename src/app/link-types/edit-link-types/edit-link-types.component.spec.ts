import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLinkTypesComponent } from './edit-link-types.component';

describe('EditLinkTypesComponent', () => {
  let component: EditLinkTypesComponent;
  let fixture: ComponentFixture<EditLinkTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLinkTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLinkTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
