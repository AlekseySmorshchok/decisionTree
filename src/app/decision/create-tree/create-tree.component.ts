import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { DecisionCreateService } from '../../services/decision-create.service';

@Component({
  selector: 'app-create-tree',
  templateUrl: './create-tree.component.html',
  styleUrls: ['./create-tree.component.css']
})
export class CreateTreeComponent implements OnInit {

  newDecisionTitle = '';
  note = '';

  constructor(public snackBar: MatSnackBar,
              private router: Router,
              private decisionCreateService : DecisionCreateService) { }

  ngOnInit() {
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  goNext() {
    this.openSnackBar(this.newDecisionTitle, 'Create');
    this.decisionCreateService.createDecision(this.newDecisionTitle,this.note);
    this.router.navigate(['createAlternative']);
  }

}
