import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Decision, Criteria, Alternative } from '../../model/decision';
import { DecisionCreateService } from '../../services/decision-create.service';
import { MatDialog } from '@angular/material';
import { RedirectWithMessageComponent } from '../create-alternative/redirect-with-message/redirect-with-message.component';

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
    this.decision = this.decisionCreateService.getDecision();
    if( this.decision.getName == undefined)
    {
      this.redirectWithMessage();
    }
    else{
      this.counter = this.doFact(this.decision.getAlternative.length-1);
      this.makeDefaultRageCriteria();
      this.makeCriteriaArray();
      this.kolvoCriteria = this.decision.getAlternative.length-1;
    }
  }

  makeCriteriaArray()
  {
    this.comparisonCriteriaArray = [];
      for(let alternative of this.decision.getAlternative)
      {
        this.comparisonCriteriaArray.push(alternative.getCriteriaArray[this.numberOfNote])
      }
  }

  redirectWithMessage()
  {
    let dialogRef = this.dialog.open(RedirectWithMessageComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['/']);
    });
  }
  
  doFact(counter: number ): number {
    return counter <= 1 ? 1 : counter + this.doFact(counter - 1);
  }

  makeDefaultRageCriteria()
  {
    this.rageCriteria = new Array(this.decision.getAlternative[0].getCriteriaArray.length);
    for(var criteria = 0 ; criteria < this.decision.getAlternative[0].getCriteriaArray.length; criteria++)
    {
        this.rageCriteria[criteria] = new Array(this.decision.getAlternative[0].getCriteriaArray.length);
        this.rageCriteria[criteria][criteria] = 1;
    }
  }

  saveAnswerInRageArray()
  {
    this.rageCriteria[this.firstCompariosnIndex][this.secondCompariosnIndex] = this.selectedValue;
    this.rageCriteria[this.secondCompariosnIndex][this.firstCompariosnIndex] = 1/this.selectedValue
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

  saveResaultAndgoNext()
  {
    if(this.counter<=0)
    {
      this.decisionCreateService.sendpairedComparisonCirteria(this.decision,this.rageCriteria,1).subscribe( (data )=>{
        console.log(data, "data");
        this.decision = this.decisionCreateService.makeDecisionObject(data);
        console.log(this.decision, "decision")
        this.decisionCreateService.getAnswer(this.decision).subscribe(
          flag =>
          {
            if(flag==-1)
            {
              this.router.navigate(['pairedComparisonCriteria']);
            }
            else
            {
              this.counter = this.doFact(this.decision.getAlternative[0].getCriteriaArray.length-1);
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
