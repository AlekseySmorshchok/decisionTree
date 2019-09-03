import { Injectable } from '@angular/core';
import { BaseComponentCommunicationService } from './base-component-communication.service';

@Injectable()
export class LoginStateCommunicationService extends BaseComponentCommunicationService<boolean> {

  constructor() {
    super();
  }

}
