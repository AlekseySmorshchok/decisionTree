import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from '../../../../model/user';
import { UserService } from '../../../../services/user-service';
import { HeaderComponent } from '../../header.component';
import { LoginStateCommunicationService } from '../../../../services/component-communication/login-state-communication.service';
import { DecisionInterfaceWithauthService } from '../../../../services/decision-interface-withauth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit{
 
  errorMessage: string;
  emailMessage: string;
  passwordMessage: string;
  isLoaderView = false;
  public change: boolean = false;
  public user: User = new User();
  
  constructor(private userServise: UserService,
              private decisionService: DecisionInterfaceWithauthService,
              private router: Router,
              private loginStateService : LoginStateCommunicationService) {
               
  }

  ngOnInit(): void {
    this.loginStateService.setData("Регистрация");
                this.loginStateService.sendData();
  }

  checkLogin() {
    this.emailMessage = "";
    if(this.user.email == "")
    {
      this.user.email = null;
      
    }
    this.user.email == null ? this.emailMessage = "Адрес электронной почты должен быть заполнен" : 
    this.user.email.search(new RegExp(".+@.+\..+")) == -1 ? this.emailMessage ="Неккоретный адрес электронной почты (user@example.com)": "";
    
  }

  checkPassword() {
    this.passwordMessage = "";
    if(this.user.password == "")
    {
      this.user.password = null;
    }
    this.user.password == null ? this.passwordMessage = "Пароль должен быть заполнен" : "";
  }

  login(data?: any) {
    this.errorMessage = "";
    this.isLoaderView = true;
    if(this.passwordMessage == "" && this.emailMessage == "")
    {
      this.checkLogin();
      this.checkPassword();
      if(this.emailMessage == "" && this.passwordMessage == "")
      {
        this.userServise.login(this.user.email, this.user.password)
        .flatMap(data => {
          return this.decisionService.getDecisions();
        })
        .subscribe(
          data => {
            localStorage.setItem('isUserHaveDecision', data.length > 0 ? 'true' : 'false');
            localStorage.removeItem('Decision');
            this.loginStateService.setData("Выйти");
            this.loginStateService.sendData();
            this.router.navigate(['']);
          },
          error => {
            this.isLoaderView = false;
            this.errorMessage = error.json().message;
          }
        );
      }
    }
    else
    {
      this.isLoaderView = false;
    }
    
  }

  clearMessage(messageForClear: string)
  {
    if(messageForClear == "email")
    {
      this.emailMessage = "";
    }
    else
    {
      this.passwordMessage = "";
    }
  }

  formReset(form: NgForm){
      form.reset();
  }
}
