import { Component, OnInit } from '@angular/core';
import { Decision, Alternative } from '../../model/decision';
import { DecisionCreateService } from '../../services/decision-create.service';
import { MatDialog } from '@angular/material';
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
  decision : Decision;

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
    this.decision = this.decisionCreateService.createAlternative(this.newAlternativeName);
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

  goNext() {
    this.router.navigate(['createCriteria']);
    this.decision.setStage = 1;
  }


}
