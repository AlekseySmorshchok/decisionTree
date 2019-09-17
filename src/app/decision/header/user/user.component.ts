import { Component, OnInit } from '@angular/core';
import { SignInComponent } from './sign-in/sign-in.component';
import { Router } from '@angular/router';
import { LoginStateCommunicationService } from '../../../services/component-communication/login-state-communication.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [SignInComponent]
})
export class UserComponent implements OnInit{
  activeLinkLogin: boolean;
  activeLinkRegister: boolean;
  constructor(
            private loginStateService: LoginStateCommunicationService){}
  /*signIn: boolean = true;
  signUp: boolean = false;
  reset:boolean = false;*/

  ngOnInit(): void {
    this.activeLinkLogin = true;
    this.activeLinkRegister = false;
    this.loginStateService.dataTransferEvent$.subscribe(data=>
      {
        if(data == "Регистрация")
        {
          this.activeLinkLogin = true;
          this.activeLinkRegister = false;
        }
        else
        {
          if(data == "Войти")
          {

            this.activeLinkLogin = false;
            this.activeLinkRegister = true;
          }
        }
      });
  }
  changeActiveLogin(){
    this.activeLinkLogin = true;
    this.activeLinkRegister=false;
  }
  changeActiveRegister() {
    this.activeLinkRegister = true;
    this.activeLinkLogin = false;
  }

  /*userFunction()
  {
    console.log(this.signIn);
    console.log(this.signUp);
    console.log(this.reset);
  }*/

}