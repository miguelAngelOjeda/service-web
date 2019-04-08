import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLinkTypesComponent } from './list-link-types.component';

describe('ListLinkTypesComponent', () => {
  let component: ListLinkTypesComponent;
  let fixture: ComponentFixture<ListLinkTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListLinkTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLinkTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
