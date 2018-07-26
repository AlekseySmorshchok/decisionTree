import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule} from '@angular/router';

const appRoutes: Routes = []

@NgModule({
  imports: [ RouterModule.forRoot(
    appRoutes , { enableTracing: true })],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
