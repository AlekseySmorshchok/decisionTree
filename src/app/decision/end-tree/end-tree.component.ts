import { Component, OnInit } from '@angular/core';
import { Decision } from '../../model/decision';
import { Router } from '@angular/router';
import { DecisionCreateService } from '../../services/decision-create.service';
import { MatDialog } from '@angular/material';
import { RedirectWithMessageComponent } from '../create-alternative/redirect-with-message/redirect-with-message.component';
import { DecisionInterface } from '../../services/decisionInterface';
import { DecisionServiceWithAuth } from '../../services/decisionServiceWithAuth';
import { DecisionServiceWithoutAuth } from '../../services/decisonServiceWithoutAuth';

@Component({
  selector: 'app-end-tree',
  templateUrl: './end-tree.component.html',
  styleUrls: ['./end-tree.component.css']
})
export class EndTreeComponent implements OnInit {

  decision : Decision;
  alternativeName : String = "";
  number : number = 0;
  decisionInterface : DecisionInterface;

  constructor(private router: Router,
              private decisionCreateService: DecisionCreateService,
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


  getTitle()
  {
    for(let alternativ of this.decision.alternativeArray)
    {
      if(alternativ.finalRate > this.number)
      {
        this.number = alternativ.finalRate;
        this.alternativeName = alternativ.name;
      }
    }
  }

  goNext()
  {
    this.router.navigate(['']);
  }
  changeTree()
  {
    this.router.navigate(['createTree']);
  }

}
