import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletAlternativeComponent } from './delet-alternative.component';

describe('DeletAlternativeComponent', () => {
  let component: DeletAlternativeComponent;
  let fixture: ComponentFixture<DeletAlternativeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletAlternativeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletAlternativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
