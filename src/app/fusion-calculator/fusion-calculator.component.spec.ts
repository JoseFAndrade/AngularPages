import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FusionCalculatorComponent } from './fusion-calculator.component';

describe('FusionCalculatorComponent', () => {
  let component: FusionCalculatorComponent;
  let fixture: ComponentFixture<FusionCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FusionCalculatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FusionCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
