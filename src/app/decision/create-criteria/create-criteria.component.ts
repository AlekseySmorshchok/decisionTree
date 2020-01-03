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
import { DecisionInterfaceWithoutauthService } from '../../services/decision-interface-withoutauth.service';
import { DecisionInterfaceWithauthService } from '../../services/decision-interface-withauth.service';

@Component({
  selector: 'app-create-criteria',
  templateUrl: './create-criteria.component.html',
  styleUrls: ['./create-criteria.component.css']
})
export class CreateCriteriaComponent implements OnInit {
  
  newCriteriaName: string = '';
  path: number;
  decision : Decision;
  criteriaArray: Criteria[] = [];
  decisionInterface : DecisionInterface;
  criteriaErrorMessage = "";
  isLoaderView = false;
  constructor(private decisionCreateService: DecisionCreateService,
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
        this.decision  =  new Decision().deserialize(data);
        if(!this.decision || this.decision.name == undefined  )
        {
          this.redirectWithMessage();
        }
        if(this.decision.alternativeArray != null && this.decision.alternativeArray != undefined && this.decision.alternativeArray.length >0 
            && this.decision.alternativeArray[0].criteriaArray != null && this.decision.alternativeArray[0].criteriaArray != undefined)
        {
          this.criteriaArray = this.decision.alternativeArray[0].criteriaArray;
        }
      })
    
  }

  create()
  {
    this.isLoaderView = true;
    this.criteriaErrorMessage=="";
    if( this.decision == null)
    {
      this.redirectWithMessage();
    }
    if(this.newCriteriaName)
    {
      if(!this.isDuplicateName(this.newCriteriaName)){
        this.decisionInterface.addCriteria(this.newCriteriaName).subscribe(data=>{
          this.decision = new Decision().deserialize(data);
          this.criteriaArray = this.decision.alternativeArray[0].criteriaArray;
          this.isLoaderView = false;
        });
      }
      else
      {
        this.criteriaErrorMessage = "Наименование критерия должно быть уникальным";
        this.isLoaderView = false;
      }
    }
    else
    {
      this.criteriaErrorMessage = "Введите наименование критерия";
      this.isLoaderView = false;
    }
    
  }

  isDuplicateName(name: string)
  {
    for( let criteria of this.decision.alternativeArray[0].criteriaArray)
    {
      if(name == criteria.name)
      {
        return true;
      }
    }
    return false;
    
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
      data: { name: criteria.name}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined)
      {
        this.isLoaderView = true;
        if(!this.isDuplicateName(result)){
        this.decisionInterface.editCriteria(criteria,result).subscribe(data=>
          {
            this.decision = new Decision().deserialize(data);
            this.criteriaArray = this.decision.alternativeArray[0].criteriaArray;
            this.openSnackBar("Критерий изменен","");
            this.isLoaderView = false;
          });}
          else
          {
            this.isLoaderView = false;
            this.openSnackBar("Наименование критерия должно быть уникальным","");
          }
      }
    });
  }

  delete(criteria : Criteria) {
    let dialogRef = this.dialog.open(DeleteCriteriaComponent, {
      width: '250px',
      data: { name: '' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result)
      {
        this.isLoaderView = true;
        this.decisionInterface.deleteCriteria(criteria).subscribe(data=>
          {
            this.decision = new Decision().deserialize(data);
            this.criteriaArray = this.decision.alternativeArray[0].criteriaArray;
            this.openSnackBar("Критерий удален","");
            this.isLoaderView = false;
          });
      }
      
    }
  );
}


  goNext()
  {
    this.isLoaderView = true;
    if(this.criteriaArray.length>=2)
    {
        this.decision.stage = 2;
        this.decisionInterface.setDecision(this.decision).subscribe(status=>
          {
              this.router.navigate(['fillValueCriteria']);
            
          });
    }
    else{
      this.openSnackBar("Для сравнения нужны как минимум 2 критерия","");
      this.isLoaderView = false;
    }
  }

  goBack(){
    this.isLoaderView = true;
      if(this.path==1)
      {
        this.decision.stage = 0;
        this.decisionInterface.setDecision(this.decision).subscribe(status=>
          {
            this.router.navigate(['createAlternative',1]);
            
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

  clearCriteriaErrorMessage()
  {
    this.criteriaErrorMessage = "";
  }

}
