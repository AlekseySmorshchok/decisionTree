import { Component, OnInit } from '@angular/core';
import { MatDialog } from '../../../../node_modules/@angular/material';
import { UserComponent } from './user/user.component';
import { Router } from '@angular/router';
import { LoginStateCommunicationService } from '../../services/component-communication/login-state-communication.service';
import { AuthConfigConsts } from 'angular2-jwt';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogin = false;
  constructor(private dialog: MatDialog,
    private router: Router,
    private loginStateService: LoginStateCommunicationService) { }

  ngOnInit() {
    this.isLogin = localStorage.getItem("currentUser") ? true : false;
    this.loginStateService.dataTransferEvent$.subscribe(data=>
      {
        this.isLogin = data;
      });
  }

  goAuth()
  {
    if(this.isLogin)
    {
      this.loginStateService.setData(false);
      this.loginStateService.sendData();
      localStorage.removeItem("currentUser");
      localStorage.removeItem(AuthConfigConsts.DEFAULT_TOKEN_NAME);
      this.router.navigate(['']);
    }
    else
    {
      this.router.navigate(['/auth']);
    }
  }

}
