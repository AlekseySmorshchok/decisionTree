import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IsNewTreeComponent } from './is-new-tree.component';

describe('IsNewTreeComponent', () => {
  let component: IsNewTreeComponent;
  let fixture: ComponentFixture<IsNewTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IsNewTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IsNewTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
