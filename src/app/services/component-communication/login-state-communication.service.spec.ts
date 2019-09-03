import { TestBed, inject } from '@angular/core/testing';

import { LoginStateCommunicationService } from './login-state-communication.service';

describe('LoginStateCommunicationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginStateCommunicationService]
    });
  });

  it('should be created', inject([LoginStateCommunicationService], (service: LoginStateCommunicationService) => {
    expect(service).toBeTruthy();
  }));
});
