import { Decision } from "../model/decision";

export interface DecisionInterface
{
    getDecision(): Decision;
    setDecision(decision: Decision);
}