import { Component, OnInit } from '@angular/core';
import { Decision, Alternative } from '../../model/decision';
import { DecisionCreateService } from '../../services/decision-create.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { RedirectWithMessageComponent } from './redirect-with-message/redirect-with-message.component';
import { Router } from '@angular/router';
import { EditAlternativeComponent } from './edit-alternative/edit-alternative.component';
import { DeletAlternativeComponent } from './delet-alternative/delet-alternative.component';

@Component({
  selector: 'app-create-alternative',
  templateUrl: './create-alternative.component.html',
  styleUrls: ['./create-alternative.component.css']
})
export class CreateAlternativeComponent implements OnInit {

  title = 'Create Alternative';
  newAlternativeName = '';
  decision : Decision = new Decision;
  path: number;
  flag: boolean = false;

  constructor(private decisionCreateService : DecisionCreateService,
              private dialog: MatDialog,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
      this.path = +this.router.url.substring(this.router.url.length-1,this.router.url.length);
      if(localStorage.getItem('currentUser')!=null)
      {
        this.decisionCreateService.getDecisionTree().subscribe(
            data =>
            {
              this.decision = this.decisionCreateService.makeDecisionObject(data);
              this.decisionCreateService.setDecision(this.decision);
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
      this.redirectWithMessage();
    }
    else{
      if(this.decision.getAlternative.length!=0)
      {
        this.flag = true;
      }
    }
  }

  create()
  {
    this.decision = this.decisionCreateService.createAlternative(this.newAlternativeName, this.flag);
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
    let dialogRef = this.dialog.open(EditAlternativeComponent, {
      width: '250px',
      data: { name: alternative.getName }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined)
      {
        alternative.setName = result;
      }
    });
  }

  delete(alternative: Alternative) {
    let dialogRef = this.dialog.open(DeletAlternativeComponent, {
      width: '250px',
      data: { name: '' }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.decisionCreateService.deleteAlternative(alternative);
    }
  );
}

  goToUrl()
  {
    if(this.path == 1)
    {

      this.router.navigate(['createCriteria',1]);
      this.decision.setStage = 1;
    }
    else{
      this.router.navigate(['fillValueCriteria']);
    }
  }

  goNext() {
    if(this.decision.getAlternative.length>=2)
    {
      if(localStorage.getItem("currentUser")!=null)
      {
        this.decisionCreateService.saveDecision(this.decision).subscribe(
          data=>
          {
            this.decision = this.decisionCreateService.makeDecisionObject(data);
            this.goToUrl();
          }
        );
      }
      else{
        this.goToUrl();
      }
      
    }
    else
    {
      this.openSnackBar("Для сравнения нужны 2 альтернативы","");
    }
  }

  goBack()
  {
    if(this.path==1)
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
