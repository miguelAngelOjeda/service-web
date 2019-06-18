import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserspbComponent } from './edit-userspb.component';

describe('EditUserspbComponent', () => {
  let component: EditUserspbComponent;
  let fixture: ComponentFixture<EditUserspbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditUserspbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserspbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
