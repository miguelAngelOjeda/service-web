import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EgressComponent } from './egress.component';

describe('EgressComponent', () => {
  let component: EgressComponent;
  let fixture: ComponentFixture<EgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
