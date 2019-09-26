import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit-criteria',
  templateUrl: './edit-criteria.component.html',
  styleUrls: ['./edit-criteria.component.css']
})
export class EditCriteriaComponent implements OnInit {
  

  name = "";
  nameErrorMessage = "";
  ngOnInit(): void {
    this.name = this.data.name;
  }

  constructor(
    public dialogRef: MatDialogRef<EditCriteriaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  clearNameErrorMessage()
  {
    this.nameErrorMessage = "";
  }

  checkName()
  {
    this.nameErrorMessage = "";
    if(this.name)
    {
      this.dialogRef.close(this.name);
    }
    else
    {
      this.nameErrorMessage = "Введите новое наименование альтернативы";
    }
  }

}
