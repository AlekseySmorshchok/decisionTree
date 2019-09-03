import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDecisionComponent } from './view-decision.component';

describe('ViewDecisionComponent', () => {
  let component: ViewDecisionComponent;
  let fixture: ComponentFixture<ViewDecisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDecisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDecisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
