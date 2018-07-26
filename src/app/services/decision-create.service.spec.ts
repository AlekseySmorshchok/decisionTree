import { TestBed, inject } from '@angular/core/testing';

import { DecisionCreateService } from './decision-create.service';

describe('DecisionCreateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DecisionCreateService]
    });
  });

  it('should be created', inject([DecisionCreateService], (service: DecisionCreateService) => {
    expect(service).toBeTruthy();
  }));
});
