import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-delet-alternative',
  templateUrl: './delet-alternative.component.html',
  styleUrls: ['./delet-alternative.component.css']
})
export class DeletAlternativeComponent{

  name = true;
  constructor(
    public dialogRef: MatDialogRef<DeletAlternativeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.name = false;
    this.dialogRef.close();
  }


}
