import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseCriteriaUrlComponent } from './choose-criteria-url.component';

describe('ChooseCriteriaUrlComponent', () => {
  let component: ChooseCriteriaUrlComponent;
  let fixture: ComponentFixture<ChooseCriteriaUrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseCriteriaUrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseCriteriaUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
