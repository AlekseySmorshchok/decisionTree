import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';

@Injectable()
export class HttpService {

  public host: string;

  constructor(private http: Http) {
    this.host = environment.host;
   }

  public get( route:string)
  {
    return this.http.post(this.host + route,"")
  }

}
