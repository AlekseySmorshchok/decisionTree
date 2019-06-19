import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DecisionCreateService } from '../../services/decision-create.service';
import { Decision } from '../../model/decision';
import { MatDialog } from '@angular/material';
import { RedirectWithMessageComponent } from '../create-alternative/redirect-with-message/redirect-with-message.component';
import { DecisionInterface } from '../../services/decisionInterface';
import { DecisionServiceWithAuth } from '../../services/decisionServiceWithAuth';
import { DecisionServiceWithoutAuth } from '../../services/decisonServiceWithoutAuth';

@Component({
  selector: 'app-instruction',
  templateUrl: './instruction.component.html',
  styleUrls: ['./instruction.component.css']
})
export class InstructionComponent implements OnInit {
  title = 'Instruction';
  decision: Decision;
  decisionInterface : DecisionInterface;

  constructor(private router: Router,
              private createDecisionService: DecisionCreateService,
              private dialog: MatDialog) { }

  ngOnInit() {
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
    this.createDecisionService.getAnswer(this.decision).subscribe(data=>{
      if(data == -1)
    {
      this.router.navigate(['pairedComparisonCriteria']);
    }
    else
    {
      if(data != -1)
      {
        this.router.navigate(['pairedComparisonCriteriaValue',data]);
      }
    }
    });
    
  }

}
