import { Component, OnInit } from '@angular/core';
import { DecisionCreateService } from '../../services/decision-create.service';
import { Decision } from '../../model/decision';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { RedirectWithMessageComponent } from '../create-alternative/redirect-with-message/redirect-with-message.component';
import { Alternative } from '../../model/alternative';
import { DecisionInterface } from '../../services/decisionInterface';
import { DecisionInterfaceWithoutauthService } from '../../services/decision-interface-withoutauth.service';
import { DecisionInterfaceWithauthService } from '../../services/decision-interface-withauth.service';

@Component({
  selector: 'app-fill-value-criteria',
  templateUrl: './fill-value-criteria.component.html',
  styleUrls: ['./fill-value-criteria.component.css']
})
export class FillValueCriteriaComponent implements OnInit {

  decision: Decision = new Decision(); 
  minRate: boolean[] = [];
  panelOpenState: boolean = false;
  disabled: boolean[] = [];
  decisionInterface : DecisionInterface;
  isLoaderView = false;
  decisionForCompare: Decision;
  decisionString = "";

  constructor( public snackBar: MatSnackBar,
              private dialog: MatDialog,
              private router: Router,
              private decisionWithouAuth:DecisionInterfaceWithoutauthService,
              private decisionWithAuth: DecisionInterfaceWithauthService,
              private decisionService: DecisionCreateService) { }

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
        this.decisionString = JSON.stringify(data);
        this.check();
        for(let i =0; i< this.decision.alternativeArray[0].criteriaArray.length;i++)
        {
          this.checkForLetters(this.decision.alternativeArray[0].criteriaArray[i].id);
        }
      });
    
  }

  check()
  {
    if( this.decision == undefined)
      {
        this.redirectWithMessage();
      }
      else
      {
        let index = 0;
        for(let criteria of this.decision.alternativeArray[0].criteriaArray)
        {
          this.minRate[index] = criteria.minMaxValue;
          index ++;
        }
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

  goNext()
  {
    this.isLoaderView = true;
    let canGoNext = true;
    for(let alternative of this.decision.alternativeArray)
    {
      for(let criteria of alternative.criteriaArray)
      {
        if(criteria.value == null || criteria.value == "")
        {
          canGoNext = false;
          break;
        }
      }
      if(canGoNext == false)
      {
        break;
      }
    }
    if(canGoNext == true)
    {
          for(let alternative of this.decision.alternativeArray)
          {
            for(let i in this.decision.alternativeArray[0].criteriaArray)
            {
              alternative.criteriaArray[i].minMaxValue = this.minRate[i]
            }
          }
          this.compareNewAndOldDecision();
          this.checkValueRate();
          this.decisionService.checkValueRate(this.decision).subscribe(
            editDecision => 
            {
              this.decision = editDecision;
              this.decision.stage = 5;

              this.decisionInterface.setDecision(this.decision).subscribe(status=>
                {
                    this.router.navigate(['instruction']);
                  
                });
            }
          );
    }
    else
    {
      this.openSnackBar("Для перехода на следующую страницу, должны быть заполнены все значения", '');
      this.isLoaderView = false;
    }
    
  }

  compareNewAndOldDecision()
  {
    this.decisionForCompare = new Decision().deserialize(JSON.parse(this.decisionString));
    for(let criteriaIndex=0; criteriaIndex < this.decision.alternativeArray[0].criteriaArray.length; criteriaIndex++)
    {
      let isChange = false;
      for(let alternativeIndex = 0; alternativeIndex < this.decision.alternativeArray.length; alternativeIndex++)
      {
            if(this.decision.alternativeArray[alternativeIndex].criteriaArray[criteriaIndex].value != this.decisionForCompare.alternativeArray[alternativeIndex].criteriaArray[criteriaIndex].value ||
              this.decision.alternativeArray[alternativeIndex].criteriaArray[criteriaIndex].minMaxValue != this.decisionForCompare.alternativeArray[alternativeIndex].criteriaArray[criteriaIndex].minMaxValue)
          {
            isChange = true;
            break;
          }
      }
      if(isChange)
      {
        for(let alternativeIndex = 0; alternativeIndex < this.decision.alternativeArray.length; alternativeIndex++)
        {
          this.decision.alternativeArray[alternativeIndex].criteriaArray[criteriaIndex].inWork = true;
        }
      }
    }
  }

 

  goCreateCriterion()
  {
    this.isLoaderView = true;
    for(let alternative of this.decision.alternativeArray)
          {
            for(let i in this.decision.alternativeArray[0].criteriaArray)
            {
              alternative.criteriaArray[i].minMaxValue = this.minRate[i]
            }
          }
          if(this.decision.urlTable!=null && this.decision.urlTable!="")
          {
            this.decision.stage = 9;
          }
          else
          {
            this.decision.stage = 9;
          }
    this.decisionInterface.setDecision(this.decision).subscribe(status=>
      {
        if(this.decision.urlTable!=null && this.decision.urlTable!="")
          {
            this.router.navigate(['chooseCriteria']);
          }
          else {
            this.router.navigate(['createCriteria',2]);
          }
      });
  }

  goCreateAlternative()
  {
    this.isLoaderView = true;
    this.decision.stage = 3;
    this.decisionInterface.setDecision(this.decision).subscribe(status=>
      {
        
          this.router.navigate(['createAlternative',2]);
       
      });
  }

  goBack()
  {
    this.isLoaderView = true;
    this.router.navigate(['instruction']);
  }

  checkValueRate()
  {
    var regexp = new RegExp("[а-яА-ЯёЁa-zA-z]");
    for(let alternative of this.decision.alternativeArray)
          {
            for(let i in this.decision.alternativeArray[0].criteriaArray)
            {
              alternative.criteriaArray[i].minMaxValue = this.minRate[i]
            }
          }
    for(let alternative of this.decision.alternativeArray)
    {
      for(let criteria of alternative.criteriaArray)
      {
        if(criteria.value.search(regexp) == -1)
        {
          
        criteria.valueRate = parseFloat(criteria.value);
        }
      }
    }
  }

  checkForLetters(id : number)
  {
      var index : number = this.findInexOfCriteria(id);
      var regexp = new RegExp("[а-яА-ЯёЁa-zA-z]");
      var flag : boolean = false;
      for(let alternative of this.decision.alternativeArray)
      {
        if( alternative.criteriaArray[index].value!=null)
        {
            if(alternative.criteriaArray[index].value.search(regexp) != -1)
          {
            flag = true;
            break;
          }
        }
      }
      if(flag == true)
      {
        this.disabled[index] = true;
        this.minRate[index] = false;
      }
      else{
        this.disabled[index] = false;
      }
  }

  findInexOfCriteria(id:number)
  {
   
    for(let alternative of this.decision.alternativeArray)
    {
        let flag = 0;
        for(let criteria of alternative.criteriaArray)
        {
          if(criteria.id == id)
          {
            return flag;
          }
          else
          {
            flag++;
          }
        }
    }
  }

  findCriteria(id:number): string
  {
    for(let alternative of this.decision.alternativeArray)
    {
        for(let criteria of alternative.criteriaArray)
        {
          if(criteria.id==id)
          {
            return criteria.value;
          }
        }
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }
}
