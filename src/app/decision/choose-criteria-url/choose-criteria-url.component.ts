import { Component, OnInit } from '@angular/core';
import { DecisionCreateService } from '../../services/decision-create.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { DecisionInterfaceWithoutauthService } from '../../services/decision-interface-withoutauth.service';
import { DecisionInterfaceWithauthService } from '../../services/decision-interface-withauth.service';
import { Decision } from '../../model/decision';
import { DecisionInterface } from '../../services/decisionInterface';
import { ChooseCriteriaUrl } from '../../model/choose-criteria-url';

@Component({
  selector: 'app-choose-criteria-url',
  templateUrl: './choose-criteria-url.component.html',
  styleUrls: ['./choose-criteria-url.component.css']
})
export class ChooseCriteriaUrlComponent implements OnInit {

  decision : Decision;
  criteriaName: ChooseCriteriaUrl[];
  decisionInterface : DecisionInterface;
  isAllCheckBoxCheck = false;
  buttonName = "";

  constructor(private decisionCreateService : DecisionCreateService,
    private dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar,
    private decisionWithAuth: DecisionInterfaceWithauthService) { }

  ngOnInit() {
    this.decisionInterface = this.decisionWithAuth;
    
    this.decisionCreateService.getCriteriaNameFromUrl(parseInt( localStorage.getItem("idDecision"),10)).subscribe( data =>
      {
        
          this.criteriaName = data;
          for(let criteriaElement of this.criteriaName)
      {
        if(criteriaElement.choose == false)
        {
          this.isAllCheckBoxCheck = false;
          this.buttonName = "Выбрать все";
          break;
        }
      }
      if(this.isAllCheckBoxCheck == true)
      {
        this.buttonName = "Снять все отметки";
      }
      });
      
  }
  goBack()
  {
    /*this.decision.stage = 1;
    this.decisionInterface.setDecision(this.decision).subscribe(status=>
      {
        this.router.navigate(['createTree']);
      });*/
  }
  goNext()
  {
    this.decisionCreateService.setCriteriaNameFromUrl(parseInt(localStorage.getItem("idDecision"),10),this.criteriaName).subscribe(data =>
      {
        this.router.navigate(['fillValueCriteria']);
      });
  }

  chooseCheckBox()
  {
    for(let criteriaElement of this.criteriaName)
    {
      if(this.isAllCheckBoxCheck)
      {
       
      criteriaElement.choose = false;
      }
      else
      {
        
      criteriaElement.choose = true;
      }
      
    }
    
      if(this.isAllCheckBoxCheck)
      {
        this.isAllCheckBoxCheck = false;
        this.buttonName = "Выбрать все";
      }
      else
      {
        this.isAllCheckBoxCheck = true;
        this.buttonName = "Снять все отметки";
      }
      
  }
}
