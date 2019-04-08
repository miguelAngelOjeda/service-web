import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLinkTypesComponent } from './add-link-types.component';

describe('AddLinkTypesComponent', () => {
  let component: AddLinkTypesComponent;
  let fixture: ComponentFixture<AddLinkTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLinkTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLinkTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
