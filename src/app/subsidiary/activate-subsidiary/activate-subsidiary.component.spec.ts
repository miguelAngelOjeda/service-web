import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateSubsidiaryComponent } from './activate-subsidiary.component';

describe('ActivateSubsidiaryComponent', () => {
  let component: ActivateSubsidiaryComponent;
  let fixture: ComponentFixture<ActivateSubsidiaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivateSubsidiaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivateSubsidiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
