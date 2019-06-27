import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCreditsComponent } from './list-credits.component';

describe('ListCreditsComponent', () => {
  let component: ListCreditsComponent;
  let fixture: ComponentFixture<ListCreditsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCreditsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCreditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
