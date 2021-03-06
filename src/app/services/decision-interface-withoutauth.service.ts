import { Injectable } from '@angular/core';
import { DecisionInterface } from './decisionInterface';
import { Alternative } from '../model/alternative';
import { Criteria } from '../model/criteria';
import { Observable } from 'rxjs/Observable';
import { Decision } from '../model/decision';
import { DecisionCreateService } from './decision-create.service';
import { DecisionWithCompareArray } from '../model/decisionWithCompareArray';
import { environment } from '../../environments/environment';
import { Http,Headers} from '@angular/http';

@Injectable()
export class DecisionInterfaceWithoutauthService implements DecisionInterface{

  host = environment.host;
  
  constructor(private http: Http) {
  }

  sendpairedComparisonCirteria(decision: Decision, rageCriteria: number[][]): Observable<Decision> {
    return new Observable((observer) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Access-Control-Allow-Origin', '*');
        this.http.post(this.host + `sendpairedComparisonCirteria`, new DecisionWithCompareArray(decision,rageCriteria),{headers})
        .map(response => response.json() as Decision).subscribe(
          data=>
          {
            localStorage.setItem("Decision",JSON.stringify(data));   
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
    headers.append('Access-Control-Allow-Origin', '*');
      this.http.post(this.host + `sendpairedComparisonCirteriaValue`, new DecisionWithCompareArray(decision,rageCriteria),{headers})
      .map(response => response.json() as Decision).subscribe(
        data=>
        {
            localStorage.setItem("Decision",JSON.stringify(data));   
            observer.next(data);
            observer.complete();
        }
      );
      
    });
  }
 
  isNewDecision(): Observable<Boolean> {
    return new Observable((observer) => {
      if(localStorage.getItem("Decision")!=null)
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
          localStorage.removeItem("Decision");
          observer.next("OK");
          observer.complete();
      });
    }

  createDecision(name: string, note: string,url: string): Observable<Decision> {
    return new Observable((observer) => {
      var decision = new Decision();
      decision.name = name;
      decision.note = note;
      this.setDecision(decision).subscribe(data=>
        {
          observer.next(decision);
          observer.complete();
        });
    });
  }

  addAlternative(name: string, flag: boolean): Observable<Decision> {
    return new Observable((observer) => {
      this.getDecision().subscribe(data=>
        {
          let decision  = new Decision().deserialize(data);
          decision.alternativeArray.push(DecisionCreateService.prototype.makeOneAlternative(name, flag, decision));
          this.setDecision(decision).subscribe(data=>
            {
              observer.next(decision);
              observer.complete();
            });
        });  
      
    });
  }
  editAlternative(alternative: Alternative): Observable<Decision> {
    return new Observable((observer) => {
      this.getDecision().subscribe(data=>
        {
          let decision  = new Decision().deserialize(data);
          for(let alternativeFromArray of decision.alternativeArray)
          {
              if(alternativeFromArray.id == alternative.id)
              {
                  alternativeFromArray.name = alternative.name;
              }
          }
          this.setDecision(decision).subscribe(data=>
            {
              observer.next(decision);
              observer.complete();
            });
        });  
      
    });
  }
  deliteAlternative(alternative: Alternative): Observable<Decision> {
    return new Observable((observer) => {
      this.getDecision().subscribe(data=>
        {
          let decision  = DecisionCreateService.prototype.deleteAlternative(alternative,new Decision().deserialize(data));
          this.setDecision(decision).subscribe(data=>
            {
              observer.next(decision);
              observer.complete();
            });
        });  
      
    });
  }
  addCriteria(name: string): Observable<Decision> {
    return new Observable((observer) => {
      this.getDecision().subscribe(data=>
        {
          let decision = new Decision().deserialize(data);
          decision = DecisionCreateService.prototype.pushCriteria(name,decision);
          this.setDecision(decision).subscribe(data=>
            {
              observer.next(decision);
              observer.complete();
            });
        });  
      
    });
    
  }

  editCriteria(criteria: Criteria, result: string): Observable<Decision> {
    return new Observable((observer) => {
      this.getDecision().subscribe(data=>
        {
          let decision = new Decision().deserialize(data);
          for(let alternative of decision.alternativeArray)
          {
              for(let criteriaFromDecision of alternative.criteriaArray)
              {
                  if(criteria.name == criteriaFromDecision.name)
                  {
                      criteriaFromDecision.name = result;
                  }
              }
          }
          this.setDecision(decision).subscribe(data=>
            {
              observer.next(decision);
              observer.complete();
            });
        });  
      
    });
  }
  deleteCriteria(criteria: Criteria): Observable<Decision> {
    return new Observable((observer) => {
      this.getDecision().subscribe(data=>
        {
          let decision  = DecisionCreateService.prototype.deleteCriteriaArray(criteria.name, new Decision().deserialize(data));
          this.setDecision(decision).subscribe(data =>
            {
              observer.next(decision);
              observer.complete();
            });
        });  
      
    });
  }

  getDecision(): Observable<Decision> {
      return new Observable((observer) => {
         
            observer.next(new Decision().deserialize(JSON.parse(localStorage.getItem('Decision'))));
            observer.complete();
          });
  }    
  
  setDecision(decision: Decision): Observable<Decision> {
    return new Observable((observer) => {
      localStorage.setItem("Decision",JSON.stringify(decision));   
      observer.next(decision);
      observer.complete();
    });
     
  }
}
