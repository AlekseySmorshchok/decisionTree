import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ViewDecisionComponent } from './view-decision.component';
import { DecisionsListComponent } from './decisions-list/decisions-list.component';
/*import { DecisionDetailComponent } from './decision-detail/decision-detail.component';*/

import { ViewDecisionRoutingModule } from './view-decision-routing/view-decision-routing.module';
import { DecisionCreateService } from '../../services/decision-create.service';
import { DecisionModule } from '../decision-module/decision.module';


@NgModule({
  imports: [
    CommonModule,
    DecisionModule,
    ViewDecisionRoutingModule
  ],
  declarations: [
    ViewDecisionComponent,
    DecisionsListComponent/*,
    DecisionDetailComponent*/
  ],
  providers: [DecisionCreateService]
})
export class ViewDecisionModule { }
