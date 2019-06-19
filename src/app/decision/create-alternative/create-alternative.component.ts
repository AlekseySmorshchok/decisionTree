import { Component, OnInit } from '@angular/core';
import { Decision } from '../../model/decision';
import { DecisionCreateService } from '../../services/decision-create.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { RedirectWithMessageComponent } from './redirect-with-message/redirect-with-message.component';
import { Router } from '@angular/router';
import { EditAlternativeComponent } from './edit-alternative/edit-alternative.component';
import { DeletAlternativeComponent } from './delet-alternative/delet-alternative.component';
import { DecisionInterface } from '../../services/decisionInterface';
import { DecisionServiceWithAuth } from '../../services/decisionServiceWithAuth';
import { DecisionServiceWithoutAuth } from '../../services/decisonServiceWithoutAuth';
import { Alternative } from '../../model/alternative';

@Component({
  selector: 'app-create-alternative',
  templateUrl: './create-alternative.component.html',
  styleUrls: ['./create-alternative.component.css']
})
export class CreateAlternativeComponent implements OnInit {

  title = 'Create Alternative';
  newAlternativeName = '';
  decision : Decision;
  path: number;
  flag = false;
  decisionInterface : DecisionInterface;
  
  constructor(private decisionCreateService : DecisionCreateService,
              private dialog: MatDialog,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
      this.path = +this.router.url.substring(this.router.url.length-1,this.router.url.length);
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
    if( this.decision == null)
    {
      this.redirectWithMessage();
      this.decision = new Decision();
    }
    else{
      if(this.decision.alternativeArray != null && this.decision.alternativeArray.length != 0 && this.decision.alternativeArray[0].criteriaArray != null 
        && this.decision.alternativeArray[0].criteriaArray.length > 0)
      {
        this.flag = true;
      }
    }
  }

  create()
  {
    if( this.decision == null)
    {
      this.redirectWithMessage();
    }
    this.decision = this.decisionInterface.addAlternative(this.newAlternativeName,this.flag);
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


  editAlternative(alternative: Alternative): void {
    if( this.decision == null)
    {
      this.redirectWithMessage();
    }
    let dialogRef = this.dialog.open(EditAlternativeComponent, {
      width: '250px',
      data: { name: alternative.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined)
      {
        alternative.name = result;
        this.decisionInterface.setDecision(this.decision);
      }
    });
  }

  delete(alternative: Alternative) {
    let dialogRef = this.dialog.open(DeletAlternativeComponent, {
      width: '250px',
      data: { name: '' }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.decision = this.decisionInterface.deliteAlternative(alternative);
    }
  );
}

  goToUrl()
  {
    if(this.path == 1)
    {
      this.decision.setStage = 1;
      this.decisionInterface.setDecision(this.decision);
      this.router.navigate(['createCriteria', 1]);
    }
    else{
      
      this.decisionInterface.setDecision(this.decision);
      this.router.navigate(['fillValueCriteria']);
    }
  }

  goNext() {
    if(this.decision.getAlternative.length >= 2)
    {
        this.goToUrl();
    }
    else
    {
      this.openSnackBar("Для сравнения нужны 2 альтернативы","");
    }
  }

  goBack()
  {
    if(this.path == 1)
    {
      this.router.navigate(['createTree']);
    }
    else{
      this.router.navigate(['fillValueCriteria']);
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }

}