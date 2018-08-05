import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PairedComparisonCriteriaComponent } from './paired-comparison-criteria.component';

describe('PairedComparisonCriteriaComponent', () => {
  let component: PairedComparisonCriteriaComponent;
  let fixture: ComponentFixture<PairedComparisonCriteriaComponent>;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PairedComparisonCriteriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PairedComparisonCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
