import { Component, OnInit } from '@angular/core';
import { MatDialog } from '../../../../node_modules/@angular/material';
import { UserComponent } from './user/user.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dialog: MatDialog,
    private router: Router,) { }

  ngOnInit() {
  }

  goAuth()
  {
    this.router.navigate(['/auth']);
  }

}
