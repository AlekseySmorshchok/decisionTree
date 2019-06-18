import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from '../user/user.component';
import { HomeComponent } from '../../home/home.component';

const routes: Routes = [
  {
    path: 'auth', component : UserComponent
  },
  {
    path:'', component : HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  entryComponents: [UserComponent, HomeComponent]
})    
export class HeaderRoutingModule { }
