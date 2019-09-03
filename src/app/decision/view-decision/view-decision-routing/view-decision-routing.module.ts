import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ViewDecisionComponent } from '../view-decision.component';
import { DecisionsListComponent } from '../decisions-list/decisions-list.component';
/*import { DecisionDetailComponent } from '../decision-detail/decision-detail.component';*/

const viewDecisionRouting: Routes = [
  { path: 'decisionViewList',
    component: ViewDecisionComponent,
    children: [
      {
        path: '',
        component: DecisionsListComponent
      }/*,
      {
        path: ':id',
        component: DecisionDetailComponent
      },*/
    ]}
];

@NgModule({
  imports: [
    RouterModule.forChild(viewDecisionRouting)
  ],
  exports: [RouterModule]
})
export class ViewDecisionRoutingModule { }
