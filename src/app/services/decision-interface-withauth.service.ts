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
import { DecisionWithCompareArray } from '../model/decisionWithCompareArray';

@Injectable()
export class DecisionInterfaceWithauthService  implements DecisionInterface
{
  
 

    host = environment.host;
    authHttp: AuthHttp;
    
    constructor(private http: Http) {
      this.authHttp = new AuthHttp(new AuthConfig() , http);
    }

    sendpairedComparisonCirteria(decision: Decision, rageCriteria: number[][]): Observable<Decision> {
      return new Observable((observer) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', localStorage.getItem(AuthConfigConsts.DEFAULT_TOKEN_NAME));
        this.authHttp.post(this.host + `sendpairedComparisonCirteriaWithSave`, new DecisionWithCompareArray(decision,rageCriteria),{headers})
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
    sendpairedComparisonCirteriaValue(decision: Decision, rageCriteria: number[][]): Observable<Decision> {
      return new Observable((observer) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', localStorage.getItem(AuthConfigConsts.DEFAULT_TOKEN_NAME));
        this.authHttp.post(this.host + `sendpairedComparisonCirteriaValueWithSave`, new DecisionWithCompareArray(decision,rageCriteria),{headers})
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

    isNewDecision(): Observable<Boolean> {
      return new Observable((observer) => {
        if(localStorage.getItem("idDecision")!=null)
        {
            this.getDecision().subscribe(data =>
              {
                if(data.stage == -1)
                {
                  observer.next(false);
                  observer.complete();
                }
                else
                {
                  observer.next(true);
                  observer.complete();
                }
              });
        }
        else
        {
          observer.next(false);
          observer.complete();
        }
          
      });
    }

    deleteDecisionFromInterface(): Observable<String> {
      return new Observable((observer) => {
          localStorage.removeItem("idDecision");
          observer.next("OK");
          observer.complete();
      });
    }

    createDecision(name: String, note: String, url: String): Observable<Decision> 
    
    {
      return new Observable((observer) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', localStorage.getItem(AuthConfigConsts.DEFAULT_TOKEN_NAME));
      this.authHttp.post(this.host + `saveNewDecision`, {"name":name,"note":note,"url":url},{headers})
      .map(response => response.json()).subscribe(
        data=>
        {
          localStorage.setItem("idDecision",data.id.toString());
          observer.next(data);
          observer.complete();
        },
        error=>
        {
          observer.error(error.json().message)
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

  getDecisionById(id: number): Observable<Decision> {
    return new Observable((observer) => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', localStorage.getItem(AuthConfigConsts.DEFAULT_TOKEN_NAME));
    
      this.authHttp.post(this.host + `getDecision`, id, {headers}) .map(response => response.json() as Decision).subscribe(data =>
        {
          observer.next(data);
          observer.complete();
        })
    }
     );
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