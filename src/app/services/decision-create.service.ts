import { Injectable } from '@angular/core';
import { Decision, Alternative, Criteria } from '../model/decision';
import { AuthConfigConsts, AuthHttp } from 'angular2-jwt';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { HttpParams } from '@angular/common/http';
import { DecisionWithCompareArray } from '../model/decisionWithCompareArray';

@Injectable()
export class DecisionCreateService {

  decision: Decision;
  host : string ;
  constructor(private http: Http,
    private authHttp: AuthHttp) {
    this.decision = new Decision();
      this.host = environment.host;
   }

   createDecision(name : string, note : string)
   {
     this.decision.setName = name;
     this.decision.setNote = note;
   }

   getDecision()
   {
     return this.decision;
   }

   createAlternative(name : string) : Decision
   {
      var alternative : Alternative = new Alternative();
      alternative.setName = name;
      if(this.decision.getAlternative.length!=0)
      {
          alternative.setId = this.decision.getAlternative[this.decision.getAlternative.length-1].getId +1;
      }
      else{
          alternative.setId = 1;
      }
      this.decision.getAlternative.push(alternative);
      return this.decision;
   }

   setDecision(decision : Decision)
   {
     this.decision = decision;
   }

   deleteAlternative(alternative: Alternative) {
    let index = this.decision.getAlternative.indexOf(alternative);

    if (index > -1) {
      this.decision.getAlternative.splice(index, 1);
    }
  }
  deleteCriteria(criteria: Criteria, criteriaArray : Criteria[])
  {
    
      let index = criteriaArray.indexOf(criteria);

      if (index > -1) {
        criteriaArray.splice(index, 1);
      }
    
  }

  sendpairedComparisonCirteria(decision:Decision, rageCriteria:number[][], number:number)
  {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if(number == 2)
    {
      return this.http.post(this.host + `sendpairedComparisonCirteria`, new DecisionWithCompareArray(decision,rageCriteria) ,{headers})
      .map(response => response.json() as Decision);
    }
    if(number ==1 )
    {
      return this.http.post(this.host + `sendpairedComparisonCirteriaValue`, new DecisionWithCompareArray(decision,rageCriteria) ,{headers})
      .map(response => response.json() as Decision);
    }
  }

  getAnswer(decision:Decision){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host+`getAnswer`, decision,{headers})
    .map(response => response.json() as number);

  }

}
