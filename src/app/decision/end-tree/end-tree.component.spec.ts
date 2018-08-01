import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndTreeComponent } from './end-tree.component';

describe('EndTreeComponent', () => {
  let component: EndTreeComponent;
  let fixture: ComponentFixture<EndTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
