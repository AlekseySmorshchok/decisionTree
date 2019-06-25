import { TestBed, inject } from '@angular/core/testing';

import { DecisionInterfaceWithoutauthService } from './decision-interface-withoutauth.service';

describe('DecisionInterfaceWithoutauthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DecisionInterfaceWithoutauthService]
    });
  });

  it('should be created', inject([DecisionInterfaceWithoutauthService], (service: DecisionInterfaceWithoutauthService) => {
    expect(service).toBeTruthy();
  }));
});
