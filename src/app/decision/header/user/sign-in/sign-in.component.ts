import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from '../../../../model/user';
import { UserService } from '../../../../services/user-service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent{
  error: string;
  public change: boolean = false;
  public user: User = new User();
  constructor(private userServise: UserService,
              private router: Router) {
  }
  checkLogin() {}
  checkPassword() {}
  loading = false;
  returnUrl: string;
  errorMessage: string;
  login(data: any) {
    this.loading = true;
    this.errorMessage = null;
    this.userServise.login(this.user._email, this.user._password)
      .flatMap(data => {
        return this.userServise.getMe();
      })
      .subscribe(
        data => {
          localStorage.setItem('currentUser', JSON.stringify(data));
        },
        error => {
          this.loading = false;
          console.log(this.errorMessage = error.json().message);
        }
      );
  }
  formReset(form: NgForm){
      form.reset();
  }
}
