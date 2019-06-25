import { TestBed, inject } from '@angular/core/testing';

import { DecisionInterfaceWithauthService } from './decision-interface-withauth.service';

describe('DecisionInterfaceWithauthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DecisionInterfaceWithauthService]
    });
  });

  it('should be created', inject([DecisionInterfaceWithauthService], (service: DecisionInterfaceWithauthService) => {
    expect(service).toBeTruthy();
  }));
});
