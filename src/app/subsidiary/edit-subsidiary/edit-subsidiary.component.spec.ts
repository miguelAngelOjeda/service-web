import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSubsidiaryComponent } from './edit-subsidiary.component';

describe('EditSubsidiaryComponent', () => {
  let component: EditSubsidiaryComponent;
  let fixture: ComponentFixture<EditSubsidiaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSubsidiaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSubsidiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
