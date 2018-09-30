import { Component, OnInit } from '@angular/core';
import { DecisionCreateService } from '../../services/decision-create.service';
import { Decision, Alternative } from '../../model/decision';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { RedirectWithMessageComponent } from '../create-alternative/redirect-with-message/redirect-with-message.component';

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

  constructor( private decisionCreateService: DecisionCreateService,
              private dialog: MatDialog,
              private router: Router) { }

  ngOnInit() {
    for(let i =0; i< this.disabled.length;i++)
    {
      this.disabled[i] = false;
    }
    if(localStorage.getItem('currentUser')!=null)
      {
        this.decisionCreateService.getDecisionTree().subscribe(
            data =>
            {
              this.decision = this.decisionCreateService.makeDecisionObject(data);
              console.log(this.decision);
              this.check();
            }
          
        );
      }
      else{
        this.decision = this.decisionCreateService.getDecision();
        this.check();
      }
    
  }

  check()
  {
    if( this.decision.getName == undefined)
      {
        this.decision.setAlternative = [];
        this.decision.getAlternative.push(new Alternative());
        this.redirectWithMessage();
      }
      else
      {
        for(let criteria of this.decision.getAlternative[0].getCriteriaArray)
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
    for(let alternative of this.decision.getAlternative)
    {
      for(let i in this.decision.getAlternative[0].getCriteriaArray)
      {
        alternative.getCriteriaArray[i].setMinMaxValue = this.minRate[i]
      }
    }
    this.checkValueRate();
    
      if(localStorage.getItem("currentUser")!=null)
      {
        this.decisionCreateService.saveDecision(this.decision).subscribe(
          data=>
          {
            this.decision = this.decisionCreateService.makeDecisionObject(data);
            
          }
        );
      }
      else{
        this.router.navigate(['instruction']);
      }
    
    
  }

  checkValueRate()
  {
    for(let alternative of this.decision.getAlternative)
    {
      for(let criteria of alternative.getCriteriaArray)
      {
        criteria.setValueRate = parseFloat(criteria.getValue);
      }
    }
  }

  goCreateCriterion()
  {
    this.router.navigate(['createCriteria',2]);
  }

  goCreateAlternative()
  {
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
      for(let alternative of this.decision.getAlternative)
      {
        if(alternative.getCriteriaArray[index].getValue!=null)
        {
            if(alternative.getCriteriaArray[index].getValue.search(regexp) != -1)
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
   
    for(let alternative of this.decision.getAlternative)
    {
        let flag = 0;
        for(let criteria of alternative.getCriteriaArray)
        {
          if(criteria.getId == id)
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
    for(let alternative of this.decision.getAlternative)
    {
        for(let criteria of alternative.getCriteriaArray)
        {
          if(criteria.getId==id)
          {
            return criteria.getValue;
          }
        }
    }
  }

}
