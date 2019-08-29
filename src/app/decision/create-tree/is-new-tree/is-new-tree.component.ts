import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-is-new-tree',
  templateUrl: './is-new-tree.component.html',
  styleUrls: ['./is-new-tree.component.css']
})
export class IsNewTreeComponent{

  answer = true;
  constructor(
    public dialogRef: MatDialogRef<IsNewTreeComponent>) { }

  onNoClick(): void {
    this.answer = false;
    this.dialogRef.close();
  }

}
