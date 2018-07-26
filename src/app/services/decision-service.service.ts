import { Injectable } from '@angular/core';
import { HttpService } from './http-service.service';

@Injectable()
export class DecisionService {

  constructor(private httpService: HttpService) { }

  public test(route)
  {
     return this.httpService.get(route);
  }

}
