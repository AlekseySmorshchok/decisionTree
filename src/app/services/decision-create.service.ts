import { Injectable } from '@angular/core';
import { Decision } from '../model/decision';
import { AuthConfigConsts, AuthHttp } from 'angular2-jwt';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { HttpParams } from '@angular/common/http';
import { DecisionWithCompareArray } from '../model/decisionWithCompareArray';
import { Observable } from '../../../node_modules/rxjs/Observable';
import { Alternative } from '../model/alternative';
import { Criteria } from '../model/criteria';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';

@Injectable()
export class DecisionCreateService {

  decision: Decision;
  host : string ;
  constructor(private http: Http,
    private authHttp: AuthHttp) {
    this.decision = new Decision();
      this.host = environment.host;
   }

   /*createDecision(name: string, note: string): Decision
   {
      let decisionObect = new Decision();
      decisionObect.setName = name;
      decisionObect.setNote = note;
      return decisionObect;
   }*/

  
   getDecision()  // -
   {
     return this.decision;
   }

   makeOneAlternative(name : string, flag: boolean, decisionObject: Decision) : Alternative // +
   {
    let alternative = new Alternative();
    alternative.setName = name;
    if(decisionObject.getAlternative.length != 0)
    {
        alternative.setId = decisionObject.getAlternative[decisionObject.alternativeArray.length - 1].id + 1;
    }
    else{
        alternative.setId = 1;
    }
    if(flag == true)
    {
      alternative.setCriteriaArray = JSON.parse(JSON.stringify(decisionObject.getAlternative[0].getCriteriaArray)) as Criteria[ ];
    }
    return alternative;
   }

   getMaxCriteriaId(decisionObect: Decision) : number // +
   {
     var Arrayindex = 1;
     if(decisionObect.alternativeArray[0].criteriaArray == null || decisionObect.alternativeArray[0].criteriaArray == undefined || 
      decisionObect.alternativeArray[0].criteriaArray.length == 0)
      {
        return Arrayindex;
      }
      else
      {
        for( let alternative of decisionObect.alternativeArray)
        {
          for (let criteria of alternative.criteriaArray)
          {
            if(criteria.id > Arrayindex)
            {
              Arrayindex = criteria.id;
             
            }
            
          }
        }
        return (Arrayindex +1);
      }
   }

   pushCriteria(name : string, decisionObect: Decision) :Decision //+
   {
      let idNumber = this.getMaxCriteriaId(decisionObect);
      for(let alternative of decisionObect.alternativeArray )
      {
        let criteria = new Criteria();
        criteria.id = idNumber;
        criteria.name = name;
        if(alternative.criteriaArray == null || alternative.criteriaArray == undefined)
        {
          alternative.criteriaArray = [];
        }
        
        alternative.criteriaArray.push(criteria);
        idNumber++;
      }
      return decisionObect;
   }

   deleteCriteriaArray(criteriaName: string, decisionObect: Decision) : Decision //+
   {
      let index = -1;
      for( let alternative of decisionObect.alternativeArray)
      {
        for(let criteria of alternative.criteriaArray)
        {
          if(criteria.name == criteriaName)
          {
            index = alternative.criteriaArray.indexOf(criteria);
            break;
          }
        }
        if(index != -1)
        {
          alternative.criteriaArray.splice(index, 1);
          index = -1;
        }
      }
      return decisionObect;
   }

   setDecision(decision : Decision)
   {
     this.decision = decision;
   }

   deleteAlternative(alternative: Alternative, decisionObject: Decision) : Decision {
    //let index = decisionObject.alternativeArray.indexOf(alternative);
    let index = 0;
    for( let i = 0; i < decisionObject.alternativeArray.length; i++)
    {
      if(decisionObject.alternativeArray[i].id == alternative.id)
      {
        index = i;
      }
    }
    if (index > -1) {
      decisionObject.alternativeArray.splice(index, 1);
    }
    return decisionObject;
  }
  
  

  sendpairedComparisonCirteria(decision:Decision, rageCriteria:number[][], number:number): Observable<Decision>
  {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let url  = '';
    if(number == 2)
    {
      if(localStorage.getItem('currentUser')!=null)
      {
        url = 'sendpairedComparisonCirteriaWithSave';
      }
      else
      {
        url = 'sendpairedComparisonCirteria';
      }
    }
    else
    {
      if(number == 1)
      {
        if(localStorage.getItem('currentUser')!=null)
        {
          url ='sendpairedComparisonCirteriaValueWithSave'
        }
        else
        {
          url = 'sendpairedComparisonCirteriaValue';
        }
      }
    }
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

  saveDecision(decision:Decision){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', localStorage.getItem(AuthConfigConsts.DEFAULT_TOKEN_NAME));
    return this.authHttp.post(this.host + `saveDecision`, decision,{headers})
    .map(response => response.json() as Decision);
  
  }

  getDecisionTree()
  {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', localStorage.getItem(AuthConfigConsts.DEFAULT_TOKEN_NAME));
      var id : number = +localStorage.getItem("idDecision");
      return this.authHttp.post(this.host + `getDecision`, id, {headers})
      .map(response => response.json() as Decision);
  }

}
