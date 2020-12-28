import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintCreditsComponent } from './print-credits.component';

describe('PrintCreditsComponent', () => {
  let component: PrintCreditsComponent;
  let fixture: ComponentFixture<PrintCreditsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintCreditsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintCreditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
