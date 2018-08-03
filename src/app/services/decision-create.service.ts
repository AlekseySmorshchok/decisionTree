import { Injectable } from '@angular/core';
import { Decision, Alternative, Criteria } from '../model/decision';
import { AuthConfigConsts, AuthHttp } from 'angular2-jwt';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { HttpParams } from '@angular/common/http';
import { DecisionWithCompareArray } from '../model/decisionWithCompareArray';
import { Observable } from '../../../node_modules/rxjs/Observable';

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

   createAlternative(name : string, tmp : boolean) : Decision
   {
      this.decision.getAlternative.push(this.makeOneAlternative(name, tmp));
      return this.decision;
   }

   makeOneAlternative(name : string, flag: boolean) : Alternative
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
    if(flag == true)
    {
      
      let lengthAlternative = this.decision.getAlternative.length;
      let lengthCriteria = this.decision.getAlternative[0].getCriteriaArray.length;
      let i = this.decision.getAlternative[lengthAlternative-1].getCriteriaArray[lengthCriteria-1].getId +1;
      let criteriaArray : Criteria[ ] = [];
        for(let criteria of this.decision.getAlternative[0].getCriteriaArray)
        {
          let tmp: Criteria = new Criteria();
          tmp.setName = criteria.getName;
          tmp.setId = i;
          criteriaArray.push(tmp);
          i++;
        }
      alternative.setCriteriaArray = criteriaArray;
    }
    return alternative;
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

  sendpairedComparisonCirteria(decision:Decision, rageCriteria:number[][], number:number): Observable<Decision>
  {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if(number == 2)
    {
      return this.http.post(this.host + `sendpairedComparisonCirteria`, new DecisionWithCompareArray(decision,rageCriteria),{ headers }
      )
      .map(response => response.json() as Decision);
    }
    if(number ==1 )
    {
      let object= {decision:decision,rageCriteria:rageCriteria};
      return this.http.post(this.host + `sendpairedComparisonCirteriaValue`, new DecisionWithCompareArray(decision,rageCriteria) ,{headers})
      .map(response =>  response.json() as Decision);
    }
  }

  getAnswer(decision:Decision){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host+`getAnswer`, decision,{headers})
    .map(response => response.json() as number);

  }

makeDecisionObject(dec:Decision) 
{ 
  let decision = new Decision(); 
  Object.assign(decision,dec); 
  let alternativeArray : Alternative[] = []; 
  for(let alternative of decision.getAlternative) 
  { 
    let tmpalternative = new Alternative(); 
    Object.assign(tmpalternative,alternative); 
    let criteriaArray : Criteria[] = []; 
    for(let criteria of tmpalternative.getCriteriaArray) 
    { 
      let tmpCriteria = new Criteria(); 
      Object.assign(tmpCriteria,criteria); 
      criteriaArray.push(tmpCriteria); 
    } 
    tmpalternative.setCriteriaArray = criteriaArray; 
    alternativeArray.push(tmpalternative); 
  } 
  decision.setAlternative = alternativeArray; 
  return decision; 
}

  makeDefaultDecision()
  {
    let decision = new Decision();
    let alternative = new Alternative();
    let criteria = new Criteria();
    decision.getAlternative.push(alternative);
    decision.getAlternative[0].getCriteriaArray.push(criteria);
    return decision;
  }

}
