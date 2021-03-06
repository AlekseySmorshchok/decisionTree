import { Decision } from "../model/decision";
import { Alternative } from "../model/alternative";
import { Criteria } from "../model/criteria";
import { Observable } from "rxjs/Observable";

export interface DecisionInterface
{
    getDecision(): Observable<Decision>;
    setDecision(decision: Decision): Observable<Decision>;
    addAlternative(name: string, flag: boolean): Observable<Decision> ;
    editAlternative(alternative: Alternative): Observable<Decision> ;
    deliteAlternative(alternative: Alternative): Observable<Decision> ;
    addCriteria(name: string): Observable<Decision> ;
    editCriteria(criteria: Criteria, result: string): Observable<Decision> ;
    deleteCriteria(criteria: Criteria): Observable<Decision> ;
    createDecision(name: String, note:String, url:String): Observable<Decision> ;
    deleteDecisionFromInterface(): Observable<String>;
    isNewDecision(): Observable<Boolean>;
    sendpairedComparisonCirteria(decision:Decision, rageCriteria:number[][]): Observable<Decision> ;
    sendpairedComparisonCirteriaValue(decision:Decision, rageCriteria:number[][]): Observable<Decision> ;
}