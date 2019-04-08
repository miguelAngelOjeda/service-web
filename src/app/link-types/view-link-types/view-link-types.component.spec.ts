import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLinkTypesComponent } from './view-link-types.component';

describe('ViewLinkTypesComponent', () => {
  let component: ViewLinkTypesComponent;
  let fixture: ComponentFixture<ViewLinkTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewLinkTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLinkTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
