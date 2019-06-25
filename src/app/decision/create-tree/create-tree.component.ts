import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
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
  buttonName: string;
  errorStatus = -1;
  constructor(public snackBar: MatSnackBar,
              private router: Router) { }

  async ngOnInit() {
    
    if (localStorage.getItem('currentUser') != null) {
      this.decisionInterface = new DecisionServiceWithAuth();
    }
    else {
      this.decisionInterface = new DecisionServiceWithoutAuth();
    }
    console.log(await this.decisionInterface.getDecision());
     this.decision = await this.decisionInterface.getDecision();

     console.log(this.decision);
    if(this.decision == null || this.decision == undefined) {
      this.decision = new Decision();
      this.buttonName = "Создать";
    }
    else
    {
      this.buttonName = "Далее";
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  async goNext() {
    this.openSnackBar(this.decision.name, 'Create');
    this.errorStatus = await this.decisionInterface.setDecision(this.decision);
    console.log(this.errorStatus);
    if(this.errorStatus != -1)
    {
    this.router.navigate(['createAlternative', 1]);
    }
    else
    {
      this.router.navigate(['']);
    }
  }

}
