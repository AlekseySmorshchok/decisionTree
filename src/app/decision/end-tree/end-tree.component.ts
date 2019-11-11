import { Component, OnInit } from '@angular/core';
import { Decision } from '../../model/decision';
import { Router } from '@angular/router';
import { DecisionCreateService } from '../../services/decision-create.service';
import { MatDialog } from '@angular/material';
import { RedirectWithMessageComponent } from '../create-alternative/redirect-with-message/redirect-with-message.component';
import { DecisionInterface } from '../../services/decisionInterface';
import { DecisionInterfaceWithoutauthService } from '../../services/decision-interface-withoutauth.service';
import { DecisionInterfaceWithauthService } from '../../services/decision-interface-withauth.service';

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
              private dialog: MatDialog,
              private decisionWithouAuth:DecisionInterfaceWithoutauthService,
              private decisionWithAuth: DecisionInterfaceWithauthService) { }

  ngOnInit() {
    if (localStorage.getItem('currentUser') != null) {
      this.decisionInterface = this.decisionWithAuth;
    }
    else {
      this.decisionInterface = this.decisionWithouAuth;
    }
    this.decisionInterface.getDecision().subscribe(
      data=>{
        this.decision  =  new Decision().deserialize(data);
        if( this.decision == undefined)
        {
          this.redirectWithMessage();
        }
        else
        {
          this.getTitle();
        }
      });
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
    this.router.navigate(['editTree']);
  }

}
