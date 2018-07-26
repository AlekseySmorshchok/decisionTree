import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCriteriaComponent } from './delete-criteria.component';

describe('DeleteCriteriaComponent', () => {
  let component: DeleteCriteriaComponent;
  let fixture: ComponentFixture<DeleteCriteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteCriteriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
