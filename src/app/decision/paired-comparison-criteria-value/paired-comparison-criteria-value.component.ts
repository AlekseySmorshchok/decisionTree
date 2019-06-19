import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Decision } from '../../model/decision';
import { DecisionCreateService } from '../../services/decision-create.service';
import { MatDialog } from '@angular/material';
import { RedirectWithMessageComponent } from '../create-alternative/redirect-with-message/redirect-with-message.component';
import { Criteria } from '../../model/criteria';
import { DecisionInterface } from '../../services/decisionInterface';
import { DecisionServiceWithAuth } from '../../services/decisionServiceWithAuth';
import { DecisionServiceWithoutAuth } from '../../services/decisonServiceWithoutAuth';

@Component({
  selector: 'app-paired-comparison-criteria-value',
  templateUrl: './paired-comparison-criteria-value.component.html',
  styleUrls: ['./paired-comparison-criteria-value.component.css']
})
export class PairedComparisonCriteriaValueComponent implements OnInit {
  numberOfNote: number;
  decision: Decision;
  counter : number = 0;
  title = "Попарное сравнение значений критериев"
  rageCriteria : number[][];
  comparisonCriteriaArray : Criteria[]  = [];
  firstCompariosnIndex : number = 0;
  secondCompariosnIndex : number = 1;
  selectedValue: number = 1;
  kolvoCriteria: number = 0;
  panelOpenState: boolean = false;
  choose:boolean = true;
  decisionInterface : DecisionInterface;

  constructor(private router: Router,
              private decisionCreateService: DecisionCreateService,
              private dialog: MatDialog) { }

  values = [
    {value: 1, viewValue: 'равновесное значение (одинаково важны при выборе)'},
    {value: 2, viewValue: 'между равнозначностью и умеренным превосходством'},
    {value: 3, viewValue: 'умеренное превосходство'},
    {value: 4, viewValue: 'между умеренным и сильным превосходством'},
    {value: 5, viewValue: 'сильное превосходство'},
    {value: 6, viewValue: 'между сильным и очень сильным превосходством'},
    {value: 7, viewValue: 'очень сильное превосходство'},
    {value: 8, viewValue: 'между очень сильным и высшим превосходством'},
    {value: 9, viewValue: 'высшее превосходство'}
  ];

  ngOnInit() {
    this.numberOfNote = +this.router.url.substring(this.router.url.length-1,this.router.url.length);
    if (localStorage.getItem('currentUser') != null) {
      this.decisionInterface = new DecisionServiceWithAuth();
    }
    else {
      this.decisionInterface = new DecisionServiceWithoutAuth();
    }
    this.decision = this.decisionInterface.getDecision();
    if( this.decision == undefined)
    {
      this.redirectWithMessage();
    }
    else
    {
      this.counter = this.doFact(this.decision.alternativeArray.length-1);
      this.makeDefaultRageCriteria();
      this.makeCriteriaArray();
      this.kolvoCriteria = this.decision.alternativeArray.length-1;
    }
  }

  makeCriteriaArray()
  {
    this.comparisonCriteriaArray = [];
      for(let alternative of this.decision.alternativeArray)
      {
        this.comparisonCriteriaArray.push(alternative.criteriaArray[this.numberOfNote])
      }
  }

  redirectWithMessage()
  {
    let dialogRef = this.dialog.open(RedirectWithMessageComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['']);
    });
  }
  
  doFact(counter: number ): number {
    return counter <= 1 ? 1 : counter + this.doFact(counter - 1);
  }

  makeDefaultRageCriteria()
  {
    this.rageCriteria = new Array(this.decision.alternativeArray[0].criteriaArray.length);
    for(var criteria = 0 ; criteria < this.decision.alternativeArray[0].criteriaArray.length; criteria++)
    {
        this.rageCriteria[criteria] = new Array(this.decision.alternativeArray[0].criteriaArray.length);
        this.rageCriteria[criteria][criteria] = 1;
    }
  }

  saveChoose()
  {
    if(this.choose)
    {
      this.rageCriteria[this.firstCompariosnIndex][this.secondCompariosnIndex] = this.selectedValue;
      this.rageCriteria[this.secondCompariosnIndex][this.firstCompariosnIndex] = 1/this.selectedValue
    }
    else
    {
      this.rageCriteria[this.firstCompariosnIndex][this.secondCompariosnIndex] = 1/this.selectedValue;
      this.rageCriteria[this.secondCompariosnIndex][this.firstCompariosnIndex] = this.selectedValue
    }
  }

  saveAnswerInRageArray()
  {
    this.saveChoose();
    if(this.secondCompariosnIndex== this.rageCriteria.length-1)
    {
      if(this.firstCompariosnIndex== this.rageCriteria.length-2 && this.secondCompariosnIndex== this.rageCriteria.length-1 )
      {
        
      }
      else{
        this.firstCompariosnIndex +=1;
        this.secondCompariosnIndex = this.firstCompariosnIndex +1;
      }
    }
    else{
      this.secondCompariosnIndex += 1;
    }

    this.counter--;
    if(this.counter==0)
    {
      this.saveResaultAndgoNext();
    }
  }

  swap()
  {
    if(this.choose)
    {
      this.choose = false;
    }
    else{
      this.choose = true;
    }
  }

  saveResaultAndgoNext()
  {
    if(this.counter<=0)
    {
      this.decisionCreateService.sendpairedComparisonCirteria(this.decision,this.rageCriteria,1).subscribe( (data )=>{
        this.decision = this.decisionCreateService.makeDecisionObject(data);
        this.decisionCreateService.getAnswer(this.decision).subscribe(
          flag =>
          {
            if(flag==-1)
            {
              this.decisionInterface.setDecision(this.decision);
              this.router.navigate(['pairedComparisonCriteria']);
            }
            else
            {
              this.counter = this.doFact(this.decision.alternativeArray[0].criteriaArray.length-1);
              this.numberOfNote = flag;
              this.makeDefaultRageCriteria();
              this.makeCriteriaArray();
              this.firstCompariosnIndex = 0;
              this.secondCompariosnIndex  = 1;
              this.selectedValue =  1;
            }
          }
        );
      });

          
        }
      
  }

}
