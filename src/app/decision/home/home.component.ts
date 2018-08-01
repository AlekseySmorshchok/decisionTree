import { Component, OnInit } from '@angular/core';
import { DecisionService } from '../../services/decision-service.service';
import { Router } from '@angular/router';
import { DecisionCreateService } from '../../services/decision-create.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Decision App';
  constructor(private router: Router, 
              private decisionCreateService: DecisionCreateService) { }

  goCreateDesicion() {
    this.router.navigate(['createTree']);
  }

  viewDecisionList() {
    this.router.navigate(['decisionViewList']);
  }
  
  ngOnInit() {
  
  }
}
