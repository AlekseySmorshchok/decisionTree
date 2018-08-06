import { Component, OnInit } from '@angular/core';
import { SignInComponent } from './sign-in/sign-in.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [SignInComponent]
})
export class UserComponent{

  constructor(private signInComponent:SignInComponent){}
  activeLinkLogin: boolean = true;
  activeLinkRegister: boolean = false;

  changeActiveLogin(){
    this.activeLinkLogin = true;
    this.activeLinkRegister=false;
  }
  changeActiveRegister() {
    this.activeLinkRegister = true;
    this.activeLinkLogin = false;
  }
}