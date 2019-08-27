import { Component, OnInit } from '@angular/core';
import { Decision } from '../../model/decision';
import { DecisionCreateService } from '../../services/decision-create.service';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { RedirectWithMessageComponent } from '../create-alternative/redirect-with-message/redirect-with-message.component';
import { and } from '@angular/router/src/utils/collection';
import { Criteria } from '../../model/criteria';
import { DecisionInterface } from '../../services/decisionInterface';
import { DecisionInterfaceWithoutauthService } from '../../services/decision-interface-withoutauth.service';
import { DecisionInterfaceWithauthService } from '../../services/decision-interface-withauth.service';

@Component({
  selector: 'app-paired-comparison-criteria',
  templateUrl: './paired-comparison-criteria.component.html',
  styleUrls: ['./paired-comparison-criteria.component.css']
})
export class PairedComparisonCriteriaComponent implements OnInit {
  
  title="Попарное сравнение критериев";
  decision: Decision;
  counter : number = 0;
  comparisonCriteriaArray : Criteria[]  = [];
  firstCompariosnIndex : number = 0;
  secondCompariosnIndex : number = 1;
  selectedValue: number = 1;
  rageCriteria : number[][];
  choose:boolean = true;
  panelOpenState: boolean = false;
  decisionInterface : DecisionInterface;
  
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

  constructor(private decisionCreateSevice: DecisionCreateService,
              private dialog: MatDialog,
              private router: Router,
              private decisionWithouAuth:DecisionInterfaceWithoutauthService,
              private decisionWithAuth: DecisionInterfaceWithauthService) {  }

  ngOnInit() {
    if (localStorage.getItem('currentUser') != null) {
      this.decisionInterface = this.decisionWithAuth;
    }
    else {
      this.decisionInterface = this.decisionWithouAuth;
    }
    this.decisionInterface.getDecision().subscribe(
      data=>{
        this.decision  =  new Decision().deserialize(data);
        if( this.decision == undefined)
        {
          this.redirectWithMessage();
        }
        else{
          this.counter = this.doFact(this.decision.alternativeArray[0].criteriaArray.length-1);
          this.comparisonCriteriaArray = this.decision.alternativeArray[0].criteriaArray;
          this.makeDefaultRageCriteria();
        }
      });
  }

  doFact(counter: number ): number {
    return counter <= 1 ? 1 : counter + this.doFact(counter - 1);
  }

  makeDefaultRageCriteria()
  {
    this.rageCriteria = new Array(this.comparisonCriteriaArray.length);
    for(var criteria = 0 ; criteria < this.comparisonCriteriaArray.length; criteria++)
    {
        this.rageCriteria[criteria] = new Array(this.comparisonCriteriaArray.length);
        this.rageCriteria[criteria][criteria] = 1;
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
      this.decisionCreateSevice.sendpairedComparisonCirteria(this.decision,this.rageCriteria,2).subscribe(
        data=>
        {
          this.decisionInterface.setDecision(new Decision().deserialize(data)).subscribe(status=>
            {
              
                this.router.navigate(['endTree'])
              
            });
          
        }
      );
    }
  }

}
