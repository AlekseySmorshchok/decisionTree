import { Injectable } from '@angular/core';
import { DecisionInterface } from './decisionInterface';
import { Alternative } from '../model/alternative';
import { Criteria } from '../model/criteria';
import { Observable } from 'rxjs/Observable';
import { Decision } from '../model/decision';
import { environment } from '../../environments/environment';
import { AuthHttp, AuthConfig, AuthConfigConsts } from 'angular2-jwt';
import { Http,Headers } from '@angular/http';

@Injectable()
export class DecisionInterfaceWithauthService  implements DecisionInterface
{
  

    host = environment.host;
    authHttp: AuthHttp;
    
    constructor(private http: Http) {
      this.authHttp = new AuthHttp(new AuthConfig() , http);
    }


      getDecision(): Observable<Decision> {
      let decision: Decision = null;
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', localStorage.getItem(AuthConfigConsts.DEFAULT_TOKEN_NAME));
      var id  = +localStorage.getItem("idDecision");
      if(id != 0)
      {
        return  this.authHttp.post(this.host + `getDecision`, id, {headers}) .map(response => response.json() as Decision)
      }
      else
      {
        return new Observable((observer) => {
         
          observer.next(new Decision());
          observer.complete();
        });
      }
    }

    setDecision(decision: Decision): Observable<string> {
      return new Observable((observer) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', localStorage.getItem(AuthConfigConsts.DEFAULT_TOKEN_NAME));
        this.authHttp.post(this.host + `saveOrUpdateDecision`, decision,{headers})
        .map(response => response.json() as number).subscribe(
          data=>
          {
            localStorage.setItem("idDecision",data.toString());
            observer.next('OK');
            observer.complete();
          }
        );
        
      });
       
    }
    
    addAlternative(name: string, flag: boolean): Observable<Decision> {
      throw new Error("Method not implemented.");
    }
    editAlternative(alternative: Alternative): Observable<Decision> {
      throw new Error("Method not implemented.");
    }
    deliteAlternative(alternative: Alternative): Observable<Decision> {
      throw new Error("Method not implemented.");
    }
    addCriteria(name: string): Observable<Decision> {
      throw new Error("Method not implemented.");
    }
    editCriteria(criteria: Criteria, result: string): Observable<Decision> {
      throw new Error("Method not implemented.");
    }
    deleteCriteria(criteria: Criteria): Observable<Decision> {
      throw new Error("Method not implemented.");
    }
    

 }