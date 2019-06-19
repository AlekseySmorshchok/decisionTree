import { Decision } from "../model/decision";
import { Alternative } from "../model/alternative";
import { Criteria } from "../model/criteria";

export interface DecisionInterface
{
    getDecision(): Decision;
    setDecision(decision: Decision);
    addAlternative(name: string, flag: boolean) : Decision;
    editAlternative(alternative: Alternative): Decision;
    deliteAlternative(alternative: Alternative): Decision;
    addCriteria(name: string): Decision;
    editCriteria(criteria: Criteria, result: string): Decision;
    deleteCriteria(criteria: Criteria): Decision;
}