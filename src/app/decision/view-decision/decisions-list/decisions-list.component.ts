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
import { DecisionInterfaceWithauthService } from '../../../services/decision-interface-withauth.service';
import { Alternative } from '../../../model/alternative';
import { Criteria } from '../../../model/criteria';
@Component({
  selector: 'app-decisions-list',
  templateUrl: './decisions-list.component.html',
  styleUrls: ['./decisions-list.component.css']
})
export class DecisionsListComponent implements OnInit {
  displayedColumns = [/*'decisionId'*/, 'decisionName', 'createDate', 'alternatives', 'criterion', 'note'];
  decisions: Decision[];
  decisionData: DecisionData;
  dataSource: DecisionDataSource = null;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private router: Router,
    private decisionService: DecisionInterfaceWithauthService) {
    this.decisions = [];
  }

  ngOnInit() {
    this.decisionData = new DecisionData(this.decisionService.getDecisions());
    this.dataSource = new DecisionDataSource(this.decisionData, this.sort, this.paginator);
     Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) { return; }
        this.dataSource.filter = this.filter.nativeElement.value;
    });
    
    
     
  }

  onSelect(decision: Decision) {
    console.log(decision);
    localStorage.setItem("idDecision",decision.id.toString());
    if(decision.stage = 8)
    {
        this.router.navigate(['endTree']);
    }
    else
    {
      if(decision.alternativeArray.length!=0 && decision.alternativeArray[0].criteriaArray.length!=0)
      {
        this.router.navigate(['fillValueCriteria']);
      }
      else
      {
        if(decision.alternativeArray.length==0)
        {
          this.router.navigate(['createAlternative',1]);
        }
        else
        {
          if(decision.alternativeArray[0].criteriaArray.length==0)
          {
            this.router.navigate(['createCriteria',1]);
          }
        }
      }
    }
    
    
  }

  public getAlternativeNames(array: Array<Alternative>): string {
    return array.map(item=> item['name']).join("; ");
  }

  public getCriteriaNames(array: Array<Criteria>): string {
    return array.map(item=> item['name']).join("; ");
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

  public getAlternativeNames(array: Array<Alternative>): string {
    return array.map(item=> item['name']).join("; ");
  }

  public getCriteriaNames(array: Array<Criteria>): string {
    return array.map(item=> item['name']).join("; ");
  }

  public dateConvert(date: Date)
  {
    let day = 0;
    let month = 0;
    let year = 0;
    let convertDate = new Date(date);
    day = convertDate.getUTCDate();
    month = (convertDate.getUTCMonth() + 1);
    year = convertDate.getUTCFullYear();
    return (day > 9 ? day : ("0"+ day)) + "." +( month>9 ? month : "0"+month) + "." + year;
  }

  getSortedData(): Decision[] {
    const data = this._decisionData.data.slice().filter((item: Decision) => {
      
      let  searchStr = (item.name + item.note + 
        (item.dateCreate!= undefined && item.dateCreate != null ? this.dateConvert(item.dateCreate): '')
        + this.getAlternativeNames(item.alternativeArray) + 
      (item.alternativeArray!=undefined && item.alternativeArray.length>0 ? this.getCriteriaNames(item.alternativeArray[0].criteriaArray) : "")).toLowerCase();
      return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
    });

    if (!this._sort.active || this._sort.direction === '') { return data; }

    return data.sort((a, b) => {
      let propertyA: number|string = '';
      let propertyB: number|string = '';

      switch (this._sort.active) {
        case 'decisionId': [propertyA, propertyB] = [a.id, b.id]; break;
        //case 'decisionName': [propertyA, propertyB] = [a.title, b.title]; break;
        //case 'alternatives': [propertyA, propertyB] = [a.decisionArray.length, b._decisionArray.length]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}