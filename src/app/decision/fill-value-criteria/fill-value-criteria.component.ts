import { Component, OnInit } from '@angular/core';
import { DecisionCreateService } from '../../services/decision-create.service';
import { Decision } from '../../model/decision';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { RedirectWithMessageComponent } from '../create-alternative/redirect-with-message/redirect-with-message.component';
import { Alternative } from '../../model/alternative';
import { DecisionInterface } from '../../services/decisionInterface';
import { DecisionServiceWithAuth } from '../../services/decisionServiceWithAuth';
import { DecisionServiceWithoutAuth } from '../../services/decisonServiceWithoutAuth';

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
  
  constructor( private decisionCreateService: DecisionCreateService,
              private dialog: MatDialog,
              private router: Router) { }

  ngOnInit() {
    for(let i =0; i< this.disabled.length;i++)
    {
      this.disabled[i] = false;
    }
    if (localStorage.getItem('currentUser') != null) {
      this.decisionInterface = new DecisionServiceWithAuth();
    }
    else {
      this.decisionInterface = new DecisionServiceWithoutAuth();
    }
    this.decision = this.decisionInterface.getDecision();
    this.check();
    
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
    for(let alternative of this.decision.alternativeArray)
    {
      for(let i in this.decision.alternativeArray[0].criteriaArray)
      {
        alternative.criteriaArray[i].setMinMaxValue = this.minRate[i]
      }
    }
    this.checkValueRate();
    this.decisionInterface.setDecision(this.decision);
    this.router.navigate(['instruction']);
  }

  checkValueRate()
  {
    for(let alternative of this.decision.alternativeArray)
    {
      for(let criteria of alternative.criteriaArray)
      {
        criteria.setValueRate = parseFloat(criteria.value);
      }
    }
  }

  goCreateCriterion()
  {
    this.decisionInterface.setDecision(this.decision);
    this.router.navigate(['createCriteria',2]);
  }

  goCreateAlternative()
  {
    this.decisionInterface.setDecision(this.decision);
    this.router.navigate(['createAlternative',2]);
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

}
