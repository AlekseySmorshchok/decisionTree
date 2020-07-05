import { Component, OnInit } from '@angular/core';
import { Decision } from '../../model/decision';
import { DecisionCreateService } from '../../services/decision-create.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { RedirectWithMessageComponent } from './redirect-with-message/redirect-with-message.component';
import { Router } from '@angular/router';
import { EditAlternativeComponent } from './edit-alternative/edit-alternative.component';
import { DeletAlternativeComponent } from './delet-alternative/delet-alternative.component';
import { DecisionInterface } from '../../services/decisionInterface';
import { DecisionInterfaceWithoutauthService } from '../../services/decision-interface-withoutauth.service';
import { DecisionInterfaceWithauthService } from '../../services/decision-interface-withauth.service';
import { Alternative } from '../../model/alternative';
import { a } from '@angular/core/src/render3';

@Component({
  selector: 'app-create-alternative',
  templateUrl: './create-alternative.component.html',
  styleUrls: ['./create-alternative.component.css']
})
export class CreateAlternativeComponent implements OnInit {

  title = 'Create Alternative';
  newAlternativeName = "";
  decision : Decision;
  path: number;
  flag = false;
  decisionInterface : DecisionInterface;
  alternativeErrorMessage = "";
  isLoaderView = false;
  isReadOnly = false;

  constructor(private decisionCreateService : DecisionCreateService,
              private dialog: MatDialog,
              private router: Router,
              private snackBar: MatSnackBar,
              private decisionWithouAuth:DecisionInterfaceWithoutauthService,
              private decisionWithAuth: DecisionInterfaceWithauthService) { }

  ngOnInit() {
      this.path = +this.router.url.substring(this.router.url.length-1,this.router.url.length);
      if (localStorage.getItem('token') != null) {
        this.decisionInterface = this.decisionWithAuth;
      }
      else {
        this.decisionInterface = this.decisionWithouAuth;
      }
      this.decisionInterface.getDecision().subscribe(data=>
        {
          this.decision = new Decision().deserialize(data);
          if(this.decision.urlTable!=null && this.decision.urlTable!="")
          {
            this.isReadOnly = true;
            console.log(this.isReadOnly);
          }
          this.check();
        });
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
    this.isLoaderView = true;
    this.alternativeErrorMessage = "";
    if( this.decision == null)
    {
      this.redirectWithMessage();
    }
    if(this.newAlternativeName)
    {
      this.decisionInterface.addAlternative(this.newAlternativeName,this.flag).subscribe(data =>
        {
          this.isLoaderView = false;
          this.decision = new Decision().deserialize(data);
        });
    }
    else
    {
      this.isLoaderView = false;
      this.alternativeErrorMessage = "Введите название альтернативы"
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


  editAlternative(alternative: Alternative): void {
    if( this.decision == null)
    {
      this.redirectWithMessage();
    }
    let dialogRef = this.dialog.open(EditAlternativeComponent, {
      width: '20%',
      data: { name: alternative.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
      {
        this.isLoaderView = true;
        alternative.name = result;
        this.decisionInterface.editAlternative(alternative).subscribe(data=>
          {
            this.decision = new Decision().deserialize(data);
            this.openSnackBar("Название альтернативы измененно","");
            this.isLoaderView = false;
          });
      }
    });
  }

  delete(alternative: Alternative) {
    let name = alternative.name;
    let dialogRef = this.dialog.open(DeletAlternativeComponent, {
      width: '250px',
      data: { name: '' }
    });
    dialogRef.afterClosed().subscribe(result => {

      if(result)
      {
        this.isLoaderView = true;
        this.decisionInterface.deliteAlternative(alternative).subscribe(data =>
          {
            this.decision = new Decision().deserialize(data);
            this.openSnackBar("Альтернатива "+ name+" удалена","");
            this.isLoaderView = false;
          })
      }
      
    }
  );
}

  goToUrl()
  {
    if(this.path == 1)
    {
      if(this.decision.urlTable!=null && this.decision.urlTable!="")
          {
            this.decision.stage = 9;
          }
            else {
              this.decision.stage = 1;
            }
      this.decisionInterface.setDecision(this.decision).subscribe(status=>
        {
          if(this.decision.urlTable!=null && this.decision.urlTable!="")
          {
            this.decision.stage = 9;
            this.router.navigate(['chooseCriteria']);
          }
          else {
            this.decision.stage = 1;
            this.router.navigate(['createCriteria', 1]);
          }
        });
    }
    else{
      if(this.path == 2)
      {
        this.decision.stage = 2;
        this.decisionInterface.setDecision(this.decision).subscribe(status=>
          {
              this.router.navigate(['fillValueCriteria']);
            
          });
      }
      else
      {
        this.router.navigate(['']);
      }
      
    }
  }

  goNext() {
    this.isLoaderView = true;
    if(this.decision.alternativeArray.length >= 2)
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
    this.isLoaderView = true;
    if(this.path == 1)
    {
      this.decision.stage = 1;
      this.decisionInterface.setDecision(this.decision).subscribe(status=>
        {
          this.router.navigate(['createTree']);
        });
      
    }
    else{
      if(this.path == 2)
      {
        this.decision.stage = 2;
        this.decisionInterface.setDecision(this.decision).subscribe(status=>
          {
              this.router.navigate(['fillValueCriteria']);
            
          });
      }
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }

}