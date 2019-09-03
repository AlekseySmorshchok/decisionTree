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
export class SignUpComponent  {
  public user: User = new User();
  isPasswordConfirm = false;
  passwordConfirm: string;
  public errorMessage: string;
  form: FormGroup;
  formErrors = {
    passwordConfirm: ''
  };
  constructor(private userService: UserService,
              private validationService:ValidationData,
              private router: Router,
              private loginStateService : LoginStateCommunicationService)
  {}

  static setErrors(answer: string) {
    return answer === null;
  }
  
  checkPasswordConfirm(){
    this.formErrors.passwordConfirm = this.validationService.confirmPassword(this.user.password, this.passwordConfirm);
    this.isPasswordConfirm = SignUpComponent.setErrors(this.formErrors.passwordConfirm);
  }
  register() {
    this.userService.register(this.user).subscribe(
      data =>{
        console.log(data.toString());
        
        this.userService.login(this.user.email, this.user.password)
          .flatMap(data => {
            return this.userService.getMe();
          })
          .subscribe(
            data => {
              localStorage.setItem('currentUser', JSON.stringify(data));
              this.loginStateService.setData(true);
              this.loginStateService.sendData();
              this.router.navigate(['']);
            }
          );
       
      })
  }
}