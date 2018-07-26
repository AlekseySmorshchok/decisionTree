import { Injectable } from '@angular/core';
import { Decision, Alternative, Criteria } from '../model/decision';

@Injectable()
export class DecisionCreateService {

  decision: Decision;

  constructor() {
    this.decision = new Decision();
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

}
