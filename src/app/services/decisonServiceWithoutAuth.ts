import { Injectable } from "@angular/core";
import { DecisionInterface } from "./decisionInterface";
import { Decision } from "../model/decision";
import { Alternative } from "../model/alternative";
import { DecisionCreateService } from "./decision-create.service";
import { Criteria } from "../model/criteria";

@Injectable()
export class DecisionServiceWithoutAuth implements DecisionInterface
{
    addCriteria(name: string): Decision {
        let decision = this.getDecision();
        decision = DecisionCreateService.prototype.pushCriteria(name,decision);
        this.setDecision(decision);
        return decision;
    }
    editCriteria(criteria: Criteria, result: string): Decision {
        let decision = this.getDecision();
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
        return decision;
    }
    deleteCriteria(criteria: Criteria): Decision {
        let decision = this.getDecision();
        decision = DecisionCreateService.prototype.deleteCriteriaArray(criteria.name, decision);
        this.setDecision(decision);
        return decision;
    }
      addAlternative(name: string, flag: boolean): Decision {
        let decision = this.getDecision();
        decision.getAlternative.push(DecisionCreateService.prototype.makeOneAlternative(name, flag, decision));
        this.setDecision(decision);
        return decision;
    }
    editAlternative(alternative: Alternative): Decision {
        let decision = this.getDecision();
        for(let alternativeFromArray of decision.alternativeArray)
        {
            if(alternativeFromArray.id = alternative.id)
            {
                alternativeFromArray.name = alternative.name;
            }
        }
        this.setDecision(decision);
        return decision;
    }
    deliteAlternative(alternative: Alternative): Decision {
        let decision = this.getDecision();
        decision = DecisionCreateService.prototype.deleteAlternative(alternative,decision)
        this.setDecision(decision);
        return decision;
    }
   

    getDecision(): Decision {
        return new Decision().deserialize(JSON.parse(localStorage.getItem("Decision")));
        //return JSON.parse(localStorage.getItem('decision')) as Decision;
    }    
    
    setDecision(decision: Decision) {
        localStorage.setItem("Decision",JSON.stringify(decision));
    }


}