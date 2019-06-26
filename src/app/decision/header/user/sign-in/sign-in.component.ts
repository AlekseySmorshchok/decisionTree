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
  login(data: any) {
    this.userServise.login(this.user.email, this.user.password)
      .flatMap(data => {
        return this.userServise.getMe();
      })
      .subscribe(
        data => {
          localStorage.setItem('currentUser', JSON.stringify(data));
        }
      );
      this.router.navigate(['']);
  }
  formReset(form: NgForm){
      form.reset();
  }
}
