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

  decision: Decision;
  minRate: boolean[] = [];
  panelOpenState: boolean = false;
  disabled: boolean[] = [];
  decisionInterface : DecisionInterface;
  
  constructor( public snackBar: MatSnackBar,
              private dialog: MatDialog,
              private router: Router,
              private decisionWithouAuth:DecisionInterfaceWithoutauthService,
              private decisionWithAuth: DecisionInterfaceWithauthService) { }

  ngOnInit() {
    for(let i =0; i< this.disabled.length;i++)
    {
      this.disabled[i] = false;
    }
    if (localStorage.getItem('currentUser') != null) {
      this.decisionInterface = this.decisionWithAuth;
    }
    else {
      this.decisionInterface = this.decisionWithouAuth;
    }
    this.decisionInterface.getDecision().subscribe(
      data=>{
        this.decision  =  new Decision().deserialize(data);
        this.check();
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
        for(let criteria of this.decision.alternativeArray[0].criteriaArray)
        {
          this.minRate.push(false);
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
    let canGoNext = true;
    for(let alternative of this.decision.alternativeArray)
    {
      for(let criteria of alternative.criteriaArray)
      {
        if(criteria.value == null)
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
    this.checkValueRate();
    this.decisionInterface.setDecision(this.decision).subscribe(status=>
      {
        
          this.router.navigate(['instruction']);
        
      });
    }
    else
    {
      this.openSnackBar("Для перехода на следующую страницу, должны быть заполнены все значения", '');
    }
    
  }

  checkValueRate()
  {
    for(let alternative of this.decision.alternativeArray)
    {
      for(let criteria of alternative.criteriaArray)
      {
        criteria.valueRate = parseFloat(criteria.value);
      }
    }
  }

  goCreateCriterion()
  {
    this.decisionInterface.setDecision(this.decision).subscribe(status=>
      {
        
          this.router.navigate(['createCriteria',2]);
        
      });
  }

  goCreateAlternative()
  {
    this.decisionInterface.setDecision(this.decision).subscribe(status=>
      {
        
          this.router.navigate(['createAlternative',2]);
       
      });
  }

  goBack()
  {
    this.router.navigate(['instruction']);
  }

  checkForLetters(id : number)
  {
      var index : number = this.findInexOfCriteria(id);
      var regexp = new RegExp("[а-яА-ЯёЁa-zA-z]");
      var flag : boolean = false;
      for(let alternative of this.decision.alternativeArray)
      {
        if(alternative.criteriaArray[index].value!=null)
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
