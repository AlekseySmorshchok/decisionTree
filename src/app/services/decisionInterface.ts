import { Decision } from "../model/decision";
import { Alternative } from "../model/alternative";
import { Criteria } from "../model/criteria";

export interface DecisionInterface
{
    getDecision();
    setDecision(decision: Decision);
    addAlternative(name: string, flag: boolean) ;
    editAlternative(alternative: Alternative);
    deliteAlternative(alternative: Alternative);
    addCriteria(name: string);
    editCriteria(criteria: Criteria, result: string);
    deleteCriteria(criteria: Criteria);
}