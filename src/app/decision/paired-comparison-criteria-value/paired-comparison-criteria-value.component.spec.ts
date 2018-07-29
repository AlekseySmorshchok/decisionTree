import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PairedComparisonCriteriaValueComponent } from './paired-comparison-criteria-value.component';

describe('PairedComparisonCriteriaValueComponent', () => {
  let component: PairedComparisonCriteriaValueComponent;
  let fixture: ComponentFixture<PairedComparisonCriteriaValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PairedComparisonCriteriaValueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PairedComparisonCriteriaValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
