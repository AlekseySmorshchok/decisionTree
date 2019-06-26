import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Decision } from '../../model/decision';
import { DecisionInterface } from '../../services/decisionInterface';
import { DecisionInterfaceWithoutauthService } from '../../services/decision-interface-withoutauth.service';
import { DecisionInterfaceWithauthService } from '../../services/decision-interface-withauth.service';

@Component({
  selector: 'app-create-tree',
  templateUrl: './create-tree.component.html',
  styleUrls: ['./create-tree.component.css']
})
export class CreateTreeComponent implements OnInit{

  decision: Decision;
  decisionInterface : DecisionInterface;
  buttonName: string;
  constructor(public snackBar: MatSnackBar,
              private router: Router,
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
          if(this.decision == null || this.decision == undefined) {
            this.decision = new Decision();
            this.buttonName = "Создать";
          }
          else
          {
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
    this.openSnackBar(this.decision.name, 'Create');
     this.decisionInterface.setDecision(this.decision).subscribe(status=>
      {
        if(status == 'OK')
        {
        this.router.navigate(['createAlternative', 1]);
        }
        else
        {
          this.router.navigate(['']);
        }
      });
    
  }

}
