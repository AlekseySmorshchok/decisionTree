import { Component } from '@angular/core';
import { SignInComponent } from './sign-in/sign-in.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [SignInComponent]
})
export class UserComponent{
  activeLinkLogin: boolean = true;
  activeLinkRegister: boolean = false;
  constructor(){}
  /*signIn: boolean = true;
  signUp: boolean = false;
  reset:boolean = false;*/

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