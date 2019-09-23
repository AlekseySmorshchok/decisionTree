import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DecisionCreateService } from '../../services/decision-create.service';
import { Decision } from '../../model/decision';
import { Http } from '@angular/http';
import { environment } from '../../../environments/environment';
import { AuthConfigConsts } from 'angular2-jwt';
import { LoginStateCommunicationService } from '../../services/component-communication/login-state-communication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Decision App';
  isLogIn = false;
  host : string ;
  constructor(private router: Router, 
              private loginStateService : LoginStateCommunicationService,
              private http: Http){
                this.host = environment.host;}

  goCreateDesicion() {
    this.router.navigate(['createTree']);
  }

  viewDecisionList() {
    this.router.navigate(['decisionViewList']);
  }
  
  ngOnInit() {
    this.isLogIn = localStorage.getItem(AuthConfigConsts.DEFAULT_TOKEN_NAME) ? true : false;
    this.loginStateService.dataTransferEvent$.subscribe(data=>
      {
        if(data == "Выйти")
        {
          this.isLogIn = true;
        }
        else
        {
          this.isLogIn = false;
        }
      });
  }
}
