import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-redirect-with-message',
  templateUrl: './redirect-with-message.component.html',
  styleUrls: ['./redirect-with-message.component.css']
})

export class RedirectWithMessageComponent {
  name = "";
  constructor(
    public dialogRef: MatDialogRef<RedirectWithMessageComponent>) { }
}
