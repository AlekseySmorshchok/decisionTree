import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from '../../../../model/user';
import { UserService } from '../../../../services/user-service';
import { ValidationData } from '../../../../services/validationData';

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
              private validationService:ValidationData)
  {}

  checkFirstName(){}
  checkLastName(){}
  checkEmail(){}
  checkNick(){}

  static setErrors(answer: string) {
    return answer === null;
  }
  
  checkPasswordConfirm(){
    this.formErrors.passwordConfirm = this.validationService.confirmPassword(this.user._password, this.passwordConfirm);
    this.isPasswordConfirm = SignUpComponent.setErrors(this.formErrors.passwordConfirm);
  }
  register(data: any) {
    this.userService.register(this.user).subscribe(
      error =>{
        console.log(this.errorMessage = error.json().message);
      })
  }
}