import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit-alternative',
  templateUrl: './edit-alternative.component.html',
  styleUrls: ['./edit-alternative.component.css']
})
export class EditAlternativeComponent {

  name = "";
  constructor(
    public dialogRef: MatDialogRef<EditAlternativeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
