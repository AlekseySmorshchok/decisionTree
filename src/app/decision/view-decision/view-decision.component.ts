import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-view-decision',
  templateUrl: './view-decision.component.html',
  styleUrls: ['./view-decision.component.css']
})
export class ViewDecisionComponent implements OnInit {
  title = 'View Decisions';

  constructor(
    private router: Router,
    private location: Location
  ) { }

  goBack() {
    this.location.back();
  }

  ngOnInit() {}

}
