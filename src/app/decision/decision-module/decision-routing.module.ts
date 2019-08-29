import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { CreateTreeComponent } from '../create-tree/create-tree.component';
import { CreateCriteriaComponent } from '../create-criteria/create-criteria.component';
import { CreateAlternativeComponent } from '../create-alternative/create-alternative.component';
import { RedirectWithMessageComponent } from '../create-alternative/redirect-with-message/redirect-with-message.component';
import { EditAlternativeComponent } from '../create-alternative/edit-alternative/edit-alternative.component';
import { DeletAlternativeComponent } from '../create-alternative/delet-alternative/delet-alternative.component';
import { EditCriteriaComponent } from '../create-criteria/edit-criteria/edit-criteria.component';
import { DeleteCriteriaComponent } from '../create-criteria/delete-criteria/delete-criteria.component';
import { FillValueCriteriaComponent } from '../fill-value-criteria/fill-value-criteria.component';
import { InstructionComponent } from '../instruction/instruction.component';
import { PairedComparisonCriteriaComponent } from '../paired-comparison-criteria/paired-comparison-criteria.component';
import { PairedComparisonCriteriaValueComponent } from '../paired-comparison-criteria-value/paired-comparison-criteria-value.component';
import { EndTreeComponent } from '../end-tree/end-tree.component';
import { UserComponent } from '../header/user/user.component';
import { IsNewTreeComponent } from '../create-tree/is-new-tree/is-new-tree.component';
import { AppComponent } from '../../app.component';

const routes: Routes = [
  {
    path:'#', component: AppComponent
  },
  {
    path:'', component : HomeComponent
  },
  {
    path:'editTree', component: CreateTreeComponent
  },
  {
    path:'createTree', component: CreateTreeComponent
  },
  {
    path:'createCriteria', component: CreateCriteriaComponent,
    children:[
        {
          path: ':path', component: CreateCriteriaComponent
        }
    ]
  },
  {
    path:'createAlternative', component: CreateAlternativeComponent,
    children:[
      {
        path: ':path', component: CreateAlternativeComponent
      }
    ]
  },
  {
    path:'fillValueCriteria', component: FillValueCriteriaComponent
  },
  {
    path:'instruction', component: InstructionComponent
  },
  {
    path:'pairedComparisonCriteria', component: PairedComparisonCriteriaComponent
  },
  {
    path:'endTree', component: EndTreeComponent
  },
  {
    path:'pairedComparisonCriteriaValue', component: PairedComparisonCriteriaValueComponent,
    children: [
      {
        path: ':numberOfNote',
        component: PairedComparisonCriteriaValueComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  entryComponents: [RedirectWithMessageComponent, EditAlternativeComponent, DeletAlternativeComponent, EditCriteriaComponent,
                    DeleteCriteriaComponent, IsNewTreeComponent]
})      
export class DecisionRoutingModule { }
