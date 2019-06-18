import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { DecisionCreateService } from '../../services/decision-create.service';
import { Decision } from '../../model/decision';
import { DecisionInterface } from '../../services/decisionInterface';
import { DecisionServiceWithAuth } from '../../services/decisionServiceWithAuth';
import { DecisionServiceWithoutAuth } from '../../services/decisonServiceWithoutAuth';

@Component({
  selector: 'app-create-tree',
  templateUrl: './create-tree.component.html',
  styleUrls: ['./create-tree.component.css']
})
export class CreateTreeComponent implements OnInit{

  decision: Decision;
  decisionInterface : DecisionInterface;
  constructor(public snackBar: MatSnackBar,
              private router: Router,
              private decisionCreateService: DecisionCreateService) { }

  ngOnInit() {
    if (localStorage.getItem('currentUser') != null) {
      this.decisionInterface = new DecisionServiceWithAuth();
    }
    else {
      this.decisionInterface = new DecisionServiceWithoutAuth();
    }
    this.decision = this.decisionInterface.getDecision();
    if(this.decision == null) {
      this.decision = new Decision();
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  goNext() {
    this.openSnackBar(this.decision.name, 'Create');
    this.decisionInterface.setDecision(this.decision);
    this.router.navigate(['createAlternative', 1]);
  }

}
