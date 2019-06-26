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

    
}