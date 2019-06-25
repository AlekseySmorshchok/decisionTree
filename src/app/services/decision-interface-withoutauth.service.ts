import { Injectable } from '@angular/core';
import { DecisionInterface } from './decisionInterface';
import { Alternative } from '../model/alternative';
import { Criteria } from '../model/criteria';
import { Observable } from 'rxjs/Observable';
import { Decision } from '../model/decision';
import { DecisionCreateService } from './decision-create.service';

@Injectable()
export class DecisionInterfaceWithoutauthService implements DecisionInterface{

  addAlternative(name: string, flag: boolean): Observable<Decision> {
    return new Observable((observer) => {
      this.getDecision().subscribe(data=>
        {
          let decision  = new Decision().deserialize(data);
          decision.getAlternative.push(DecisionCreateService.prototype.makeOneAlternative(name, flag, decision));
          this.setDecision(decision);
          observer.next(decision);
          observer.complete();
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
              if(alternativeFromArray.id = alternative.id)
              {
                  alternativeFromArray.name = alternative.name;
              }
          }
          this.setDecision(decision);
          observer.next(decision);
          observer.complete();
        });  
      
    });
  }
  deliteAlternative(alternative: Alternative): Observable<Decision> {
    return new Observable((observer) => {
      this.getDecision().subscribe(data=>
        {
          let decision  = DecisionCreateService.prototype.deleteAlternative(alternative,new Decision().deserialize(data));
          this.setDecision(decision);
          observer.next(decision);
          observer.complete();
        });  
      
    });
  }
  addCriteria(name: string): Observable<Decision> {
    return new Observable((observer) => {
      this.getDecision().subscribe(data=>
        {
          let decision = new Decision().deserialize(data);
          decision = DecisionCreateService.prototype.pushCriteria(name,decision);
          this.setDecision(decision);
          observer.next(decision);
          observer.complete();
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
          this.setDecision(decision);
          observer.next(decision);
          observer.complete();
        });  
      
    });
  }
  deleteCriteria(criteria: Criteria): Observable<Decision> {
    return new Observable((observer) => {
      this.getDecision().subscribe(data=>
        {
          let decision  = DecisionCreateService.prototype.deleteCriteriaArray(criteria.name, new Decision().deserialize(data));
          this.setDecision(decision);
          observer.next(decision);
          observer.complete();
        });  
      
    });
  }

  getDecision(): Observable<Decision> {
      return new Observable((observer) => {
         
            observer.next(new Decision().deserialize(JSON.parse(localStorage.getItem('Decision'))));
            observer.complete();
          });
  }    
  
  setDecision(decision: Decision) {
      localStorage.setItem("Decision",JSON.stringify(decision));
  }
}
