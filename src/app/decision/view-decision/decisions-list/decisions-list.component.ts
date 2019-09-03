import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { DataSource } from '@angular/cdk/collections';
import { MatSort } from '@angular/material';
import { MatPaginator } from '@angular/material';


import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { Decision } from '../../../model/decision';
import { DecisionCreateService } from '../../../services/decision-create.service';
import { DecisionInterfaceWithoutauthService } from '../../../services/decision-interface-withoutauth.service';
import { DecisionInterfaceWithauthService } from '../../../services/decision-interface-withauth.service';
import { DecisionInterface } from '../../../services/decisionInterface';

@Component({
  selector: 'app-decisions-list',
  templateUrl: './decisions-list.component.html',
  styleUrls: ['./decisions-list.component.css']
})
export class DecisionsListComponent implements OnInit {
  displayedColumns = ['decisionId', 'decisionName', /*'createDate', 'alternatives', 'criterion',*/ 'note'];
  decisions: Decision[];
  decisionData: DecisionData;
  dataSource: DecisionDataSource | null;
  decisionInterface : DecisionInterface;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private router: Router,
    private decisionService: DecisionCreateService,
    private decisionWithouAuth:DecisionInterfaceWithoutauthService,
              private decisionWithAuth: DecisionInterfaceWithauthService) {
    this.decisions = [];
  }

  ngOnInit() {
    this.decisionInterface = this.decisionWithAuth;
    this.decisionInterface.getDecision().subscribe(data=>
      {
        
        
          this.decisionData = new DecisionData(this.decisionInterface.getDecisions());
          this.dataSource = new DecisionDataSource(this.decisionData, this.sort, this.paginator);
          Observable.fromEvent(this.filter.nativeElement, 'keyup')
            .debounceTime(150)
            .distinctUntilChanged()
            .subscribe(() => {
              if (!this.dataSource) { return; }
              this.dataSource.filter = this.filter.nativeElement.value;
        
        });
        
      });
  }

  onSelect(decision: Decision) {
    this.router.navigate(['/viewdecision/', decision.id]);
  }
}

export class DecisionData {
  dataChange: BehaviorSubject<Decision[]> = new BehaviorSubject<Decision[]>([]);
  get data(): Decision[] { return this.dataChange.value; }

  constructor(private _observe: Observable<Decision[]>) {
    _observe.subscribe((decisions: Decision[]) => {
      for (const decision of decisions) {
        const copiedData = this.data.slice();
        copiedData.push(decision);
        this.dataChange.next(copiedData);
      }
    });
  }
}

export class DecisionDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  constructor(
    private _decisionData: DecisionData,
    private _sort: MatSort,
    private _paginator: MatPaginator) {
    super();
  }

  connect(): Observable<Decision[]> {
    const displayDataChanges = [
      this._decisionData.dataChange,
      this._filterChange,
      this._sort.sortChange,
      this._paginator.page
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;

      return this.getSortedData().splice(startIndex, this._paginator.pageSize);
    });
  }

  disconnect() {}

  getSortedData(): Decision[] {
    const data = this._decisionData.data.slice().filter((item: Decision) => {
      const searchStr = (/*item.title + */""+item.id).toLowerCase();
      return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
    });

    if (!this._sort.active || this._sort.direction === '') { return data; }

    return data.sort((a, b) => {
      let propertyA: number|string = '';
      let propertyB: number|string = '';

      switch (this._sort.active) {
        case 'decisionId': [propertyA, propertyB] = [a.id, b.id]; break;
        //case 'decisionName': [propertyA, propertyB] = [a.title, b.title]; break;
        //case 'alternatives': [propertyA, propertyB] = [a.decisionArray.length, b.decisionArray.length]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
