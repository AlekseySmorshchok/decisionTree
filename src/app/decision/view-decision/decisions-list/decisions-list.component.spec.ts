import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisionsListComponent } from './decisions-list.component';

describe('DecisionsListComponent', () => {
  let component: DecisionsListComponent;
  let fixture: ComponentFixture<DecisionsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecisionsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecisionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
