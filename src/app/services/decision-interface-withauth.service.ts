import { Injectable } from '@angular/core';
import { DecisionInterface } from './decisionInterface';
import { Alternative } from '../model/alternative';
import { Criteria } from '../model/criteria';
import { Observable } from 'rxjs/Observable';
import { Decision } from '../model/decision';
import { environment } from '../../environments/environment';
import { AuthHttp, AuthConfig, AuthConfigConsts } from 'angular2-jwt';
import { Http,Headers } from '@angular/http';
import { DecisionCreateService } from './decision-create.service';

@Injectable()
export class DecisionInterfaceWithauthService  implements DecisionInterface
{
 

    host = environment.host;
    authHttp: AuthHttp;
    
    constructor(private http: Http) {
      this.authHttp = new AuthHttp(new AuthConfig() , http);
    }

    isNewDecision(): Observable<Boolean> {
      return new Observable((observer) => {
          observer.next(localStorage.getItem("idDecision")!=null ? true : false);
          observer.complete();
      });
    }

    deleteDecisionFromInterface(): Observable<String> {
      return new Observable((observer) => {
          localStorage.removeItem("idDecision");
          observer.next("OK");
          observer.complete();
      });
    }

    createDecision(name: String, note: String): Observable<Decision> {
      return new Observable((observer) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', localStorage.getItem(AuthConfigConsts.DEFAULT_TOKEN_NAME));
      this.authHttp.post(this.host + `saveNewDecision`, {"name":name,"note":note},{headers})
      .map(response => response.json() as Decision).subscribe(
        data=>
        {
          localStorage.setItem("idDecision",data.id.toString());
          observer.next(data);
          observer.complete();
        }
      );
      
    });
    }
    

  getDecision(): Observable<Decision> {
    return new Observable((observer) => {
    let decision: Decision = null;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', localStorage.getItem(AuthConfigConsts.DEFAULT_TOKEN_NAME));
    var id  = +localStorage.getItem("idDecision");
    if(id != 0)
    {
      this.authHttp.post(this.host + `getDecision`, id, {headers}) .map(response => response.json() as Decision).subscribe(data =>
        {
          observer.next(data);
          observer.complete();
        })
    }
    else
    {
        observer.next(new Decision());
        observer.complete();
      
    } });
  }

  setDecision(decision: Decision): Observable<Decision> {
    return new Observable((observer) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', localStorage.getItem(AuthConfigConsts.DEFAULT_TOKEN_NAME));
      this.authHttp.post(this.host + `saveOrUpdateDecision`, decision,{headers})
      .map(response => response.json() as Decision).subscribe(
        data=>
        {
          localStorage.setItem("idDecision",data.id.toString());
          observer.next(data);
          observer.complete();
        }
      );
      
    });
      
  }
    
  addAlternative(name: string, flag: boolean): Observable<Decision> {
    return new Observable((observer) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', localStorage.getItem(AuthConfigConsts.DEFAULT_TOKEN_NAME));
      var id = + localStorage.getItem("idDecision");
      this.authHttp.post(this.host + `saveNewAlternative`,{"name": name, "id": id.toString()},{headers})
      .map(response => response.json() as Decision).subscribe(
        data=>
        {
          localStorage.setItem("idDecision",data.id.toString());
          observer.next(data);
          observer.complete();
        }
      );
    });
  }

  editAlternative(alternative: Alternative): Observable<Decision> {
    return new Observable((observer) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', localStorage.getItem(AuthConfigConsts.DEFAULT_TOKEN_NAME));
      var id = + localStorage.getItem("idDecision");
      this.authHttp.post(this.host + `editAlternative`,{"name": alternative.name, "id": alternative.id.toString()},{headers})
      .map(response => response.json() as Decision).subscribe(
        data=>
        {
          localStorage.setItem("idDecision",data.id.toString());
          observer.next(data);
          observer.complete();
        }
      );
    });
  }
  deliteAlternative(alternative: Alternative): Observable<Decision> {
    return new Observable((observer) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', localStorage.getItem(AuthConfigConsts.DEFAULT_TOKEN_NAME));
      var id = + localStorage.getItem("idDecision");
      this.authHttp.post(this.host + `deleteAlternative`,alternative.id,{headers})
      .map(response => response.json() as Decision).subscribe(
        data=>
        {
          localStorage.setItem("idDecision",data.id.toString());
          observer.next(data);
          observer.complete();
        }
      );
    });
  }
  
  addCriteria(name: string): Observable<Decision> {
    return new Observable((observer) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', localStorage.getItem(AuthConfigConsts.DEFAULT_TOKEN_NAME));
      var id = + localStorage.getItem("idDecision");
      this.authHttp.post(this.host + `saveNewCriteria`,{"name": name, "id": id.toString()},{headers})
      .map(response => response.json() as Decision).subscribe(
        data=>
        {
          localStorage.setItem("idDecision",data.id.toString());
          observer.next(data);
          observer.complete();
        }
      );
    });
  }
  editCriteria(criteria: Criteria, result: string): Observable<Decision> {
    return new Observable((observer) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', localStorage.getItem(AuthConfigConsts.DEFAULT_TOKEN_NAME));
      var id = + localStorage.getItem("idDecision");
      this.authHttp.post(this.host + `editCriteria`,{"name": result, "id": criteria.id.toString()},{headers})
      .map(response => response.json() as Decision).subscribe(
        data=>
        {
          localStorage.setItem("idDecision",data.id.toString());
          observer.next(data);
          observer.complete();
        }
      );
    });
  }
  deleteCriteria(criteria: Criteria): Observable<Decision> {
    return new Observable((observer) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', localStorage.getItem(AuthConfigConsts.DEFAULT_TOKEN_NAME));
      var id = + localStorage.getItem("idDecision");
      this.authHttp.post(this.host + `deleteCriteria`,{"name": criteria.name, "id":criteria.id.toString()},{headers})
      .map(response => response.json() as Decision).subscribe(
        data=>
        {
          localStorage.setItem("idDecision",data.id.toString());
          observer.next(data);
          observer.complete();
        }
      );
    });
  }
    
  getDecisions(): Observable<Decision[]> {
    return new Observable((observer) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', localStorage.getItem(AuthConfigConsts.DEFAULT_TOKEN_NAME));
      this.authHttp.post(this.host + `getDecisions`,{headers})
      .map(response => response.json() as Decision[]).subscribe(
        data=>
        {
          observer.next(data);
          observer.complete();
        }
      );
      
    });
  }

 }