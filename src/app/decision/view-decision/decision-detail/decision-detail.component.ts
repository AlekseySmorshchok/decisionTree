import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';



import 'rxjs/add/operator/switchMap';
import { Decision } from '../../../model/decision';
import { DecisionCreateService } from '../../../services/decision-create.service';
import { DecisionInterfaceWithauthService } from '../../../services/decision-interface-withauth.service';

@Component({
  selector: 'app-decision-detail',
  templateUrl: './decision-detail.component.html',
  styleUrls: ['./decision-detail.component.css']
})
export class DecisionDetailComponent implements OnInit {
  decision : Decision;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private decisionService: DecisionInterfaceWithauthService
  ) {}

  ngOnInit() {
     this.route.paramMap
      .switchMap((params: ParamMap) => this.decisionService.getDecisionById( +params.get('id') ))
      .subscribe( (decision: Decision) => {
      this.decision = decision;
    });
    
  }
}
