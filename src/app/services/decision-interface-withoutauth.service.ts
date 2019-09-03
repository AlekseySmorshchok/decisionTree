import { Injectable } from '@angular/core';
import { DecisionInterface } from './decisionInterface';
import { Alternative } from '../model/alternative';
import { Criteria } from '../model/criteria';
import { Observable } from 'rxjs/Observable';
import { Decision } from '../model/decision';
import { DecisionCreateService } from './decision-create.service';

@Injectable()
export class DecisionInterfaceWithoutauthService implements DecisionInterface{
  
  getDecisions(): Observable<Decision[]> {
    throw new Error("Method not implemented.");
  }
 
 
  isNewDecision(): Observable<Boolean> {
    return new Observable((observer) => {
        observer.next(localStorage.getItem("Decision")!=null ? true : false);
        observer.complete();
    });
  }

  deleteDecisionFromInterface(): Observable<String> {
      return new Observable((observer) => {
          localStorage.removeItem("Decision");
          observer.next("OK");
          observer.complete();
      });
    }

  createDecision(name: string, note: string): Observable<Decision> {
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
