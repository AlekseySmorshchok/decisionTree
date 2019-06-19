import { Component, OnInit } from '@angular/core';
import { DecisionCreateService } from '../../services/decision-create.service';
import {  Decision} from '../../model/decision';
import { MatDialog, MatSnackBar, throwMatDialogContentAlreadyAttachedError } from '@angular/material';
import { RedirectWithMessageComponent } from '../create-alternative/redirect-with-message/redirect-with-message.component';
import { Router } from '@angular/router';
import { EditCriteriaComponent } from './edit-criteria/edit-criteria.component';
import { DeletAlternativeComponent } from '../create-alternative/delet-alternative/delet-alternative.component';
import { DeleteCriteriaComponent } from './delete-criteria/delete-criteria.component';
import { Criteria } from '../../model/criteria';
import { DecisionInterface } from '../../services/decisionInterface';
import { DecisionServiceWithAuth } from '../../services/decisionServiceWithAuth';
import { DecisionServiceWithoutAuth } from '../../services/decisonServiceWithoutAuth';

@Component({
  selector: 'app-create-criteria',
  templateUrl: './create-criteria.component.html',
  styleUrls: ['./create-criteria.component.css']
})
export class CreateCriteriaComponent implements OnInit {
  
  title = 'Create Criterion';
  newCriteriaName: string = '';
  path: number;
  decision : Decision;
  criteriaArray: Criteria[] = [];
  decisionInterface : DecisionInterface;

  constructor(private decisionCreateService: DecisionCreateService,
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
    if( this.decision.getName == undefined)
    {
      this.redirectWithMessage();
    }
    if(this.decision.alternativeArray != null && this.decision.alternativeArray != undefined && this.decision.alternativeArray.length >0 
        && this.decision.alternativeArray[0].criteriaArray != null && this.decision.alternativeArray[0].criteriaArray != undefined)
    {
      this.criteriaArray = this.decision.alternativeArray[0].criteriaArray;
    }
  }

  create()
  {
    this.decision = this.decisionInterface.addCriteria(this.newCriteriaName);
    this.criteriaArray = this.decision.alternativeArray[0].criteriaArray;
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

  editCriteria(criteria : Criteria): void {
    let dialogRef = this.dialog.open(EditCriteriaComponent, {
      width: '250px',
      data: { name: criteria.getName}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined)
      {
        this.decision = this.decisionInterface.editCriteria(criteria,result);
        this.criteriaArray = this.decision.alternativeArray[0].criteriaArray;
      }
    });
  }

  delete(criteria : Criteria) {
    let dialogRef = this.dialog.open(DeleteCriteriaComponent, {
      width: '250px',
      data: { name: '' }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.decision = this.decisionInterface.deleteCriteria(criteria);
      this.criteriaArray = this.decision.alternativeArray[0].criteriaArray;
    }
  );
}


  goNext()
  {
    if(this.criteriaArray.length>=2)
    {
        this.decision.setStage = 2;
        this.router.navigate(['fillValueCriteria']);
    }
    else{
      this.openSnackBar("Для сравнения нужны как минимум 2 критерия","");
    }
  }

  goBack(){
      if(this.path==1)
      {
        this.router.navigate(['createAlternative',1]);
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
