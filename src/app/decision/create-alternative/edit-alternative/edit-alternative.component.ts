import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit-alternative',
  templateUrl: './edit-alternative.component.html',
  styleUrls: ['./edit-alternative.component.css']
})
export class EditAlternativeComponent implements OnInit {
  

  name = "";
  nameErrorMessage = "";
  constructor(
    public dialogRef: MatDialogRef<EditAlternativeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit(): void {
      this.name = this.data.name;
    }

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
