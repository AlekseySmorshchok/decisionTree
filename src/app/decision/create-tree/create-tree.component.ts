import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { DecisionCreateService } from '../../services/decision-create.service';
import { Decision } from '../../model/decision';

@Component({
  selector: 'app-create-tree',
  templateUrl: './create-tree.component.html',
  styleUrls: ['./create-tree.component.css']
})
export class CreateTreeComponent implements OnInit {

  newDecisionTitle = '';
  note = '';
  decision : Decision;
  
  constructor(public snackBar: MatSnackBar,
              private router: Router,
              private decisionCreateService : DecisionCreateService) { }

  ngOnInit() {
    this.decision = this.decisionCreateService.getDecision();
    if(this.decision.getName != undefined)
    {
      this.newDecisionTitle = this.decision.getName;
      this.note = this.decision.getNote;
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  goNext() {
    this.openSnackBar(this.newDecisionTitle, 'Create');
    this.decisionCreateService.createDecision(this.newDecisionTitle,this.note);
    if(localStorage.getItem("currentUser")!=null)
    {
        this.decisionCreateService
    }
    this.router.navigate(['createAlternative',1]);
  }

  

}
