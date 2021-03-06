import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Decision } from '../../model/decision';
import { DecisionCreateService } from '../../services/decision-create.service';
import { MatDialog } from '@angular/material';
import { RedirectWithMessageComponent } from '../create-alternative/redirect-with-message/redirect-with-message.component';
import { Criteria } from '../../model/criteria';
import { DecisionInterface } from '../../services/decisionInterface';
import { DecisionInterfaceWithoutauthService } from '../../services/decision-interface-withoutauth.service';
import { DecisionInterfaceWithauthService } from '../../services/decision-interface-withauth.service';


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
  panelOpenState: boolean = false;
  choose:boolean = true;
  decisionInterface : DecisionInterface;
  isLoaderView = false;

  constructor(private router: Router,
              private decisionCreateService: DecisionCreateService,
              private dialog: MatDialog,
              private decisionWithouAuth:DecisionInterfaceWithoutauthService,
              private decisionWithAuth: DecisionInterfaceWithauthService,
              private decisionService: DecisionCreateService) { }

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
    if (localStorage.getItem('token') != null) {
      this.decisionInterface = this.decisionWithAuth;
    }
    else {
      this.decisionInterface = this.decisionWithouAuth;
    }
    this.decisionInterface.getDecision().subscribe(
      data=>{
        this.decision  =  new Decision().deserialize(data);
        this.decisionCreateService.getAnswer(this.decision).subscribe(
          flag =>
          {
            if(flag==-1)
            {
              this.decision.stage = 7;
              this.decisionInterface.setDecision(this.decision).subscribe(status=>
                {
                  
                    this.router.navigate(['pairedComparisonCriteria']);
                  
                });
            }
            else
            {
              this.numberOfNote = flag;
              this.firstCompariosnIndex = 0;
              this.secondCompariosnIndex  = 1;
              this.selectedValue =  1;
              this.makeDefaultRageCriteria();
              this.makeCriteriaArray();
              this.counter = this.doFact(this.comparisonCriteriaArray.length-1);
            }
          }
        );
      });
  }

  getCount(index: number): number
  {
      let count = 0;
      for(let criteria of this.decision.alternativeArray[index].criteriaArray)
      {
        let flag = false;
        for(let criteriaT of this.decision.alternativeArray[index].criteriaArray)
        {
            if(criteriaT.name == criteria.name)
            {
              flag = true;
              break;
            }
        }
        if(flag == false)
        {
          count ++;
        }
      }
      return count;
  }

  makeCriteriaArray()
  {
    this.comparisonCriteriaArray = [];
      for(let alternative of this.decision.alternativeArray)
      {
        let flag = false;
        for(let criteriaName of this.comparisonCriteriaArray)
        {
          if(criteriaName.value == alternative.criteriaArray[this.numberOfNote].value)
          {
            flag = true;
            break;
          }
        }
        if(flag == false)
        {
          this.comparisonCriteriaArray.push(alternative.criteriaArray[this.numberOfNote]);
        }
      }
      if(this.comparisonCriteriaArray.length<=1)
      {
        this.checkIfAllValueEqual();
      }
  }

  checkIfAllValueEqual()
  {
    this.counter = 0;
              
                for(var alternative = 0 ; alternative < this.decision.alternativeArray.length; alternative ++)
                {
                  for(var alternativeduble = 0 ; alternativeduble < this.decision.alternativeArray.length; alternativeduble ++)
                  {
                      this.rageCriteria[alternative][alternativeduble] = 1;
                      this.rageCriteria[alternativeduble][alternative] = 1;
                  }
                }
                this.saveResaultAndgoNext();
              
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
    this.rageCriteria = new Array(this.decision.alternativeArray.length);
    for(var criteria = 0 ; criteria < this.decision.alternativeArray.length; criteria++)
    {
        this.rageCriteria[criteria] = new Array(this.decision.alternativeArray.length);
        this.rageCriteria[criteria][criteria] = 1;
    }
    for(var alternative = 0 ; alternative < this.decision.alternativeArray.length; alternative ++)
    {
        for(var alternativeduble = 0 ; alternativeduble < this.decision.alternativeArray.length; alternativeduble ++)
        {
          if(this.decision.alternativeArray[alternative].criteriaArray[this.numberOfNote].value == this.decision.alternativeArray[alternativeduble].criteriaArray[this.numberOfNote].value)
          {
            this.rageCriteria[alternative][alternativeduble] = 1;
            this.rageCriteria[alternativeduble][alternative] = 1;
          }
        }
    }
  }

  findIndex(criteriaValue:string):number[]
  {
    let indexes : number[] = new Array();
    for(var index = 0 ; index < this.decision.alternativeArray.length; index++)
    {
      if(criteriaValue == this.decision.alternativeArray[index].criteriaArray[this.numberOfNote].value)
      {
        indexes.push(index);
      }
    }
    return indexes;
  }

  saveChoose()
  {
    for(let line of this.findIndex(this.comparisonCriteriaArray[this.firstCompariosnIndex].value))
      {
        for(let column of this.findIndex(this.comparisonCriteriaArray[this.secondCompariosnIndex].value))
        {
          if(this.choose)
          {
            this.rageCriteria[line][column] = this.selectedValue;
            this.rageCriteria[column][line] = 1/this.selectedValue
          }
          else
          {
            this.rageCriteria[line][column] = 1/this.selectedValue;
            this.rageCriteria[column][line] = this.selectedValue
          }
        }
      }
  }

  saveAnswerInRageArray()
  {
    this.saveChoose();    
    if(this.secondCompariosnIndex== this.comparisonCriteriaArray.length-1)
    {
      if(this.firstCompariosnIndex == this.comparisonCriteriaArray.length-2 && this.secondCompariosnIndex== this.comparisonCriteriaArray.length-1 )
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
    this.isLoaderView = true;
    if(this.counter<=0)
    {
      this.decisionInterface.sendpairedComparisonCirteriaValue(this.decision,this.rageCriteria).subscribe( (data )=>{
        
        this.decision = new Decision().deserialize(data);
        this.decisionCreateService.getAnswer(this.decision).subscribe(
          flag =>
          {
            if(flag==-1)
            {
              this.decision.stage = 7;
              this.decisionInterface.setDecision(this.decision).subscribe(status=>
                {
                  
                    this.router.navigate(['pairedComparisonCriteria']);
                  
                    this.isLoaderView = false;
                });
            }
            else
            { 
              this.numberOfNote = flag;
              this.firstCompariosnIndex = 0;
              this.secondCompariosnIndex  = 1;
              this.selectedValue =  1;
              this.makeDefaultRageCriteria();
              this.makeCriteriaArray();
              this.counter = this.doFact(this.comparisonCriteriaArray.length-1);
              
              this.isLoaderView = false;
            }
            
          }
        );
      });
    }
  }

}
