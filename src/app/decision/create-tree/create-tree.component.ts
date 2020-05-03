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

  decision: Decision = new Decision();
  decisionInterface: DecisionInterface;
  buttonName: string = "Создать";
  isnewDecision = true;
  decisionErrorMessage = "";
  decisionUrlErrorMessage = "";
  isLoaderView = false;
  constructor(public snackBar: MatSnackBar,
              private router: Router,
              private dialog: MatDialog,
              private decisionWithouAuth:DecisionInterfaceWithoutauthService,
              private decisionWithAuth: DecisionInterfaceWithauthService) { }

  ngOnInit() {
    this.isLoaderView = true;
    if (localStorage.getItem('token') != null) {
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
                this.decisionInterface.getDecision().subscribe(
                  data=>{
                    this.decision  =  new Decision().deserialize(data);
                        if(this.decision.stage == 0)
                        {
                          this.router.navigate(['createAlternative', 1]);
                        }
                        else
                        {
                          if(this.decision.stage == 1)
                          {
                            this.router.navigate(['createCriteria', 1]);
                          }
                          else
                          {
                            if(this.decision.stage == 2)
                            {
                              this.router.navigate(['fillValueCriteria']);
                            }
                            else
                            {
                              if(this.decision.stage == 3)
                              {
                                this.router.navigate(['createAlternative', 2]);
                              }
                              else
                              {
                                if(this.decision.stage == 4)
                                {
                                  this.router.navigate(['createCriteria', 2]);
                                }
                                else
                                {
                                  if(this.decision.stage == 5)
                                  {
                                    this.router.navigate(['instruction']);
                                  }
                                  else
                                  {
                                    if(this.decision.stage == 6)
                                    {
                                      this.router.navigate(['pairedComparisonCriteriaValue']);
                                    }
                                    else
                                    {
                                      if(this.decision.stage == 7)
                                      {
                                        this.router.navigate(['pairedComparisonCriteria']);
                                      }
                                      else
                                      {
                                        if(this.decision.stage == 8)
                                        {
                                          this.router.navigate(['endTree']);
                                        }
                                        else
                                        {
                                          this.initForm();
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      });
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

  checkDecisionUrl()
  {
      this.decision.url != "" && this.decision.url.search("catalog.onliner.by/compare/") <=0 ? this.decisionUrlErrorMessage = "Введен некорректный адрес" : this.decisionUrlErrorMessage = "";
  }

  clearDecisionUrlErrorMEssage()
  {
    this.decisionUrlErrorMessage = "";
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
        
        this.isLoaderView = false;
      });
    
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  goNext() {
    this.checkDecisionName();
    this.isLoaderView = true;
    if(this.decisionErrorMessage == "")
    {
      if(this.isnewDecision == true)
            {
              
              this.decisionInterface.createDecision(this.decision.name, this.decision.note).subscribe(status=>
                {
                  this.router.navigate(['createAlternative', 1]);
                  this.openSnackBar(this.decision.name, 'Решение создано');
                  if (localStorage.getItem('token') != null) {
                    localStorage.setItem('isUserHaveDecision', 'true');
                  }
                },
                error=>
                {
                  this.decisionErrorMessage = error;
                  this.isLoaderView = false;
                  
                });
            }
            else
            {
              this.decision.stage = 0;
              this.decisionInterface.setDecision(this.decision).subscribe( data=>
              {
                if (localStorage.getItem('token') != null) {
                  localStorage.setItem('isUserHaveDecision', 'true');
                }
                this.openSnackBar(this.decision.name, 'Решение обновлено');
                this.router.navigate(['createAlternative', 1]);
              },
              error=>
              {
                this.decisionErrorMessage = error;
                this.isLoaderView = false;
                
              });
            }
        
     
     
    } 
  }

}
