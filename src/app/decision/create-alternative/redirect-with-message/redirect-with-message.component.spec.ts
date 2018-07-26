import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectWithMessageComponent } from './redirect-with-message.component';

describe('RedirectWithMessageComponent', () => {
  let component: RedirectWithMessageComponent;
  let fixture: ComponentFixture<RedirectWithMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedirectWithMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedirectWithMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
