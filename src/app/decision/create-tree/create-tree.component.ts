import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Decision } from '../../model/decision';
import { DecisionInterface } from '../../services/decisionInterface';
import { DecisionInterfaceWithoutauthService } from '../../services/decision-interface-withoutauth.service';
import { DecisionInterfaceWithauthService } from '../../services/decision-interface-withauth.service';
import { IsNewTreeComponent } from './is-new-tree/is-new-tree.component';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-create-tree',
  templateUrl: './create-tree.component.html',
  styleUrls: ['./create-tree.component.css']
})
export class CreateTreeComponent implements OnInit{

  decision: Decision;
  decisionInterface: DecisionInterface;
  buttonName: string;
  isnewDecision = true;
  decisionErrorMessage = "";
  constructor(public snackBar: MatSnackBar,
              private router: Router,
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
    if(this.router.url == "/createTree")
    {
      this.decisionInterface.isNewDecision().subscribe( data=>
        {
          setTimeout(() => {
            if(data)
          {
            let dialogRef = this.dialog.open(IsNewTreeComponent, {
              width: '500px'
            });
        
            dialogRef.afterClosed().subscribe(result => {
              if(result)
              {
                this.decisionInterface.deleteDecisionFromInterface().subscribe(data=>
                  {
                    this.initForm();
                  });
              }
              else
              {
                this.initForm();
              }
            });
          }
          else
          {
            this.initForm();
          }
          }, )
        });
    }
    else
    {
      this.initForm();
    }
    
   
  }
  
  checkDecisionName()
  {
    this.decisionErrorMessage = "";
    
    if(this.decision.name == "")
    {
      this.decision.name = null;
    }
    this.decision.name == null ? this.decisionErrorMessage = "Введите название решения" : "";
  }

  clearDecisionErrorMEssage()
  {
    this.decisionErrorMessage = "";
  }

  initForm()
  {
    this.decisionInterface.getDecision().subscribe(
      data=>{
        this.decision  =  new Decision().deserialize(data);
        if(this.decision == null || this.decision == undefined) {
          this.decision = new Decision();
          this.buttonName = "Создать";
        }
        else
        {
          this.isnewDecision = false;
          this.buttonName = "Далее";
        }
        }
    );
    
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  goNext() {
    this.checkDecisionName();
    if(this.decisionErrorMessage == "")
    {
      if(this.isnewDecision == true)
            {
              this.openSnackBar(this.decision.name, 'Решение создано');
              this.decisionInterface.createDecision(this.decision.name, this.decision.note).subscribe(status=>
                {
                  this.router.navigate(['createAlternative', 1]);
                },
                error=>
                {
                  this.decisionErrorMessage = error;
                  
                });
            }
            else
            {
              this.decisionInterface.setDecision(this.decision).subscribe( data=>
              {

                this.openSnackBar(this.decision.name, 'Решение обновлено');
                this.router.navigate(['createAlternative', 1]);
              });
            }
        
     
     
    } 
  }

}
