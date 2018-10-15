import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkTableModule } from '@angular/cdk/table';
import { DecisionRoutingModule } from './decision-routing.module';
import { MatMenuModule, MatToolbarModule, MatListModule, MatIconModule, MatButtonModule, MatInputModule, MatGridListModule, MatTableModule, MatSortModule, MatExpansionModule, MatSnackBarModule, MatPaginatorModule, MatSelectModule, MatCheckboxModule, MatFormFieldModule, MatDialogModule, MatSnackBar } from '@angular/material';
import { HeaderRoutingModule } from '../header/header-routing/header-routing.module';

@NgModule({
  imports: [
    CommonModule,
    DecisionRoutingModule,
    HeaderRoutingModule,
    MatMenuModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatGridListModule,
    MatTableModule,
    CdkTableModule,
    MatSortModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatDialogModule
  ],
  exports: [
    MatMenuModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatGridListModule,
    MatTableModule,
    CdkTableModule,
    MatSnackBarModule,
    MatSortModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatSelectModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatDialogModule
  ],
  
})
export class DecisionModule { }
