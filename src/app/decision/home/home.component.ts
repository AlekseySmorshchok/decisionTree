import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DecisionCreateService } from '../../services/decision-create.service';
import { Decision } from '../../model/decision';
import { Http } from '@angular/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Decision App';

  host : string ;
  constructor(private router: Router, 
              private decisionCreateService: DecisionCreateService,
              private http: Http){
                this.host = environment.host;}

  goCreateDesicion() {
    this.decisionCreateService.setDecision(new Decision());
    this.router.navigate(['createTree']);
  }

  viewDecisionList() {
    this.router.navigate(['decisionViewList']);
  }
  
  ngOnInit() {
  
  }
}
