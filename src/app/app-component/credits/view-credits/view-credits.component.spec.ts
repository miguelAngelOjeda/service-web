import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCreditsComponent } from './view-credits.component';

describe('ViewCreditsComponent', () => {
  let component: ViewCreditsComponent;
  let fixture: ComponentFixture<ViewCreditsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCreditsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCreditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
