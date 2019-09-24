import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from '../../../../model/user';
import { UserService } from '../../../../services/user-service';
import { ValidationData } from '../../../../services/validationData';
import { LoginStateCommunicationService } from '../../../../services/component-communication/login-state-communication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent  implements OnInit{
  ngOnInit(): void {
    this.loginStateService.setData("Войти");
                this.loginStateService.sendData();
  }
  public user: User = new User();
  public errorMessage: string;
  form: FormGroup;
  nameMessage = "";
  emailMessage = "";
  passwordMessage ="";
  confirmPasswordMessage = "";
  passwordConfirm = "";
  constructor(private userService: UserService,
              private validationService:ValidationData,
              private router: Router,
              private loginStateService : LoginStateCommunicationService)
  {}

    checkName()
    {
      this.nameMessage = "";
      if(this.user.username == "")
      {
        this.user.username = null;
      }
      this.user.username == null ? this.nameMessage = "Имя должно быть заполненно" : "";
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
      this.user.password == null ? this.passwordMessage = "Пароль должен быть заполнен" : 
      this.user.password.search(new RegExp("(^[A-Za-z0-9]+$)")) == -1 ? this.passwordMessage ="Пароль должен содержать только латинские символы и цифры":
      this.user.password.search(new RegExp("((?=.*[0-9]).(?=.*[a-z A-z]).{7,})")) == -1 ? this.passwordMessage ="Пароль должен содержать минимум 8 символов,одну латинскую букву и одну цифру": "";
    }

    checkConfirmPassword() {
      this.confirmPasswordMessage = "";
      if(this.passwordConfirm == "")
      {
        this.passwordConfirm = null;
      }
      this.passwordConfirm == null ? this.confirmPasswordMessage = "Пароли не совпадают" : 
      this.user.password != this.passwordConfirm ?  this.confirmPasswordMessage = "Пароли не совпадают" : "";
    }

  register() {

    this.errorMessage = null;
    this.checkName();
    this.checkLogin();
    this.checkPassword();
    this.checkConfirmPassword();
    if(this.nameMessage == "" && this.emailMessage == "" && this.passwordMessage =="" && this.confirmPasswordMessage == "")
    {
      this.userService.register(this.user).subscribe(
        data =>{
          this.userService.login(this.user.email, this.user.password)
          .flatMap(data => {
            return this.userService.getMe();
          })
            .subscribe(
              data => {
                localStorage.setItem('currentUser', JSON.stringify(data));
                localStorage.removeItem('Decision');
                this.loginStateService.setData("Выйти");
                this.loginStateService.sendData();
                this.router.navigate(['']);
              },
              error => {
                this.errorMessage = error.json().message;
              }
            );
         
        },
        error => {
          this.errorMessage = error.json().message;
        })
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
      if(messageForClear == "username")
      {
        this.nameMessage = "";
      }
      else
      {
        if(messageForClear == "password")
        {
          this.passwordMessage = "";
        }
        else
        {
          if(messageForClear == "passwordConfirm")
          {
            this.confirmPasswordMessage = "";
          }
        }
      }
    }
  }

}