import { Injectable } from '@angular/core';
import { Decision } from './decision';

@Injectable()
export class DecisionWithCompareArray {

    private decision:Decision;
    private compareArray: number[][];

    constructor(decision:Decision,compareArray: number[][]){
                this.decision = decision;
                this.compareArray = compareArray;
                }

    get getDecision():Decision{
        return this.decision;
    }
    set setDecision(decision:Decision)
    {
        this.decision = decision;
    }

    get getCompareCriteria():number[][]{
        return this.compareArray;
    }
    set setCompareCriteria(compareCriteria:number[][])
    {
        this.compareArray = compareCriteria;
    }
}