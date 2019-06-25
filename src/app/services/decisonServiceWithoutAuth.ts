import { Injectable } from "@angular/core";
import { DecisionInterface } from "./decisionInterface";
import { Decision } from "../model/decision";
import { Alternative } from "../model/alternative";
import { DecisionCreateService } from "./decision-create.service";
import { Criteria } from "../model/criteria";

@Injectable()
export class DecisionServiceWithoutAuth implements DecisionInterface
{
    addCriteria(name: string) {
        let decision = this.getDecision();
        decision = DecisionCreateService.prototype.pushCriteria(name,decision);
        this.setDecision(decision);
        return decision;
    }
    editCriteria(criteria: Criteria, result: string) {
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
    deleteCriteria(criteria: Criteria) {
        let decision = this.getDecision();
        decision = DecisionCreateService.prototype.deleteCriteriaArray(criteria.name, decision);
        this.setDecision(decision);
        return decision;
    }
    addAlternative(name: string, flag: boolean) {
        let decision = this.getDecision();
        decision.getAlternative.push(DecisionCreateService.prototype.makeOneAlternative(name, flag, decision));
        this.setDecision(decision);
        return decision;
    }
    editAlternative(alternative: Alternative) {
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
    deliteAlternative(alternative: Alternative) {
        let decision = this.getDecision();
        decision = DecisionCreateService.prototype.deleteAlternative(alternative,decision)
        this.setDecision(decision);
        return decision;
    }

    getDecision() {
        return new Decision().deserialize(JSON.parse(localStorage.getItem("Decision")));
        //return JSON.parse(localStorage.getItem('decision')) as Decision;
    }    
    
    setDecision(decision: Decision) {
        localStorage.setItem("Decision",JSON.stringify(decision));
    }


}