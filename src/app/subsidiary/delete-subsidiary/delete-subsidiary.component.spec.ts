import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSubsidiaryComponent } from './delete-subsidiary.component';

describe('DeleteSubsidiaryComponent', () => {
  let component: DeleteSubsidiaryComponent;
  let fixture: ComponentFixture<DeleteSubsidiaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteSubsidiaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSubsidiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
