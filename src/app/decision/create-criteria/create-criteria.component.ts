import { Component, OnInit } from '@angular/core';
import { DecisionCreateService } from '../../services/decision-create.service';
import { Criteria, Decision} from '../../model/decision';
import { MatDialog } from '@angular/material';
import { RedirectWithMessageComponent } from '../create-alternative/redirect-with-message/redirect-with-message.component';
import { Router } from '@angular/router';
import { EditCriteriaComponent } from './edit-criteria/edit-criteria.component';
import { DeletAlternativeComponent } from '../create-alternative/delet-alternative/delet-alternative.component';
import { DeleteCriteriaComponent } from './delete-criteria/delete-criteria.component';

@Component({
  selector: 'app-create-criteria',
  templateUrl: './create-criteria.component.html',
  styleUrls: ['./create-criteria.component.css']
})
export class CreateCriteriaComponent implements OnInit {
  
  title = 'Create Criterion';
  newCriteriaName: string = '';
  decision : Decision;
  criteriaArray: Criteria[] = [];

  constructor(private decisionCreateService : DecisionCreateService,
              private dialog: MatDialog,
              private router: Router) { }

  ngOnInit() {
    this.decision = this.decisionCreateService.getDecision();
    if( this.decision.getName == undefined)
      {
        this.redirectWithMessage();
      }
  }

  create()
  {
    let criteria: Criteria = new Criteria();
    criteria.setName = this.newCriteriaName;
    this.criteriaArray.push(criteria);
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

  editCriteria(criteria : Criteria): void {
    let dialogRef = this.dialog.open(EditCriteriaComponent, {
      width: '250px',
      data: { name: criteria.getName}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined)
      {
        criteria.setName = result;
        
      }
    });
  }

  delete(criteria : Criteria) {
    let dialogRef = this.dialog.open(DeleteCriteriaComponent, {
      width: '250px',
      data: { name: '' }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.decisionCreateService.deleteCriteria(criteria, this.criteriaArray);
    }
  );
}

  goNext()
  {
    let j = 0;
      for(let alternative of this.decision.getAlternative )
      {
        let i =0;
       let criteriaArray : Criteria[ ] = [];
        for(let criteria of this.criteriaArray)
        {
          let tmp: Criteria = new Criteria();
          tmp.setName = criteria.getName;
          tmp.setId = i + 1 + this.criteriaArray.length*j;
          criteriaArray.push(tmp);
          i++;
        }
        alternative.setCriteriaArray = criteriaArray;
        j++;
      }
      this.decision.setStage = 2;
      this.router.navigate(['fillValueCriteria']);
  }



}
