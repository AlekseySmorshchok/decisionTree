import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-delete-criteria',
  templateUrl: './delete-criteria.component.html',
  styleUrls: ['./delete-criteria.component.css']
})
export class DeleteCriteriaComponent {

  name = true;
  constructor(
    public dialogRef: MatDialogRef<DeleteCriteriaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.name = false;
    this.dialogRef.close();
  }

}
