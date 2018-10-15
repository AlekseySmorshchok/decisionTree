import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from '../user/user.component';

const routes: Routes = [
  {
    path: 'auth', component : UserComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  entryComponents: [UserComponent]
})    
export class HeaderRoutingModule { }
