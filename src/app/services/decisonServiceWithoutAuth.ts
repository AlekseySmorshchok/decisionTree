import { Injectable } from "@angular/core";
import { DecisionInterface } from "./decisionInterface";
import { Decision } from "../model/decision";

@Injectable()
export class DecisionServiceWithoutAuth implements DecisionInterface
{
    
    getDecision(): Decision {
        return new Decision().deserialize(JSON.parse(localStorage.getItem("Decision")));
        //return JSON.parse(localStorage.getItem('decision')) as Decision;
    }    
    
    setDecision(decision: Decision) {
        localStorage.setItem("Decision",JSON.stringify(decision));
    }


}