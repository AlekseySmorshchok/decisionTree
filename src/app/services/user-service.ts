import { Injectable} from '@angular/core';
import {Response, Headers, Http, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { User } from '../model/user';
import { environment } from '../../environments/environment';
import {AuthConfigConsts, AuthHttp} from "angular2-jwt";


@Injectable()
export class UserService {
  private user: User = new User();
  host : string ;

  constructor(private http: Http,
    private authHttp: AuthHttp,) { 
    this.host = environment.host;
  }
  register(user: User){
    return this.http.post(this.host +`registration`,user).map((response:Response) => response);
  }

  login(email: string, password: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http
      .post(
        this.host + `login`,
        JSON.stringify({email, password}),
        {headers}
      )
      .map(res => {
        return res.json();
      })
      .do(token => {
        localStorage.setItem(AuthConfigConsts.DEFAULT_TOKEN_NAME, token.token);
      });
  }
  getMe() {
    return this.authHttp.get(this.host + `me`).map(res => res.json());
  }

}