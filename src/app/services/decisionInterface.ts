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
    createDecision(name: String, note:String): Observable<Decision> ;
    deleteDecisionFromInterface(): Observable<String>;
}