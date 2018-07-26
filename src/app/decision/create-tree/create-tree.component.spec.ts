import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTreeComponent } from './create-tree.component';

describe('CreateTreeComponent', () => {
  let component: CreateTreeComponent;
  let fixture: ComponentFixture<CreateTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
