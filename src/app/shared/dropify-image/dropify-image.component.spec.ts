import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropifyImageComponent } from './dropify-image.component';

describe('DropifyImageComponent', () => {
  let component: DropifyImageComponent;
  let fixture: ComponentFixture<DropifyImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropifyImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropifyImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
