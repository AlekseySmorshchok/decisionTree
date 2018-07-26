import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAlternativeComponent } from './create-alternative.component';

describe('CreateAlternativeComponent', () => {
  let component: CreateAlternativeComponent;
  let fixture: ComponentFixture<CreateAlternativeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAlternativeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAlternativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
