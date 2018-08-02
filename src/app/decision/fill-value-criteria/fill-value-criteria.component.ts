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

  constructor( private decisionCreateService: DecisionCreateService,
              private dialog: MatDialog,
              private router: Router) { }

  ngOnInit() {
    this.decision = this.decisionCreateService.getDecision();
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
      this.router.navigate(['/']);
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
    this.router.navigate(['instruction']);
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

}
