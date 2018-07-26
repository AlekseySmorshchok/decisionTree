import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillValueCriteriaComponent } from './fill-value-criteria.component';

describe('FillValueCriteriaComponent', () => {
  let component: FillValueCriteriaComponent;
  let fixture: ComponentFixture<FillValueCriteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillValueCriteriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillValueCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
