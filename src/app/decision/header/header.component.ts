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
  buttonText = "";
  constructor(private dialog: MatDialog,
    private router: Router,
    private loginStateService: LoginStateCommunicationService) { }

  ngOnInit() {
    this.isLogin = localStorage.getItem("currentUser") ? true : false;
    this.buttonText = this.isLogin  ? "Выйти" : "Войти";
    this.loginStateService.dataTransferEvent$.subscribe(data=>
      {
        this.buttonText = data;
        if(this.buttonText == "Выйти")
        {
          this.isLogin = true;
        }
        else
        {
          this.isLogin = false;
        }
      });
  }

  goAuth()
  {
    if(this.buttonText == "Войти" || this.buttonText == "Регистрация")
    {
      if(this.buttonText == "Регистрация")
      {
        this.loginStateService.setData("Войти");
        this.loginStateService.sendData();
      }
      else
      {
        this.loginStateService.setData("Регистрация");
        this.loginStateService.sendData();
      }
      
      this.router.navigate(['/auth']);
    }
    else
    {
      this.loginStateService.setData("Войти");
      this.loginStateService.sendData();
          localStorage.removeItem("currentUser");
          localStorage.removeItem("idDecision");
          localStorage.removeItem(AuthConfigConsts.DEFAULT_TOKEN_NAME);
          this.router.navigate(['']);
      
    }
  }

}
