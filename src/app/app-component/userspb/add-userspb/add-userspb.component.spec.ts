import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserspbComponent } from './add-userspb.component';

describe('AddUserspbComponent', () => {
  let component: AddUserspbComponent;
  let fixture: ComponentFixture<AddUserspbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUserspbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserspbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
