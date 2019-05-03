import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ReferenceTypes, Filter, Rules  } from '../../../core/models';
import { ApiService } from '../../../core/services';
import {merge, fromEvent, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap, filter} from 'rxjs/operators';
import { MatPaginator, MatTableDataSource, MatDialog, MatSort, PageEvent, Sort } from '@angular/material';

@Component({
  selector: 'app-list-reference-types',
  templateUrl: './list-reference-types.component.html',
  styleUrls: ['./list-reference-types.component.scss']
})
export class ListReferenceTypesComponent implements AfterViewInit {
  public rulesColumns  = ['nombre'];
  public displayedColumns = ['nombre','opciones'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filterInput: ElementRef;

  public dataSource = new MatTableDataSource<ReferenceTypes>();

  //Filter
  isfilter = false;
  filter = new Filter;
  rules: Array<Rules> = [];
  // MatPaginator Inputs
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 25, 100];
  // MatPaginator Output
  pageEvent: PageEvent;

  isLoadingResults = true;
  isRateLimitReached = false;

  constructor(private apiService: ApiService) { }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page, fromEvent(this.filterInput.nativeElement, 'keyup'))
        .pipe(
          startWith({}),
          switchMap(() => {
            this.isfilter = false;
            if(this.filterInput.nativeElement.textLength > 3){
              this.isfilter = true;
              for (let i = 0; i < this.rulesColumns.length; i++)
              {
                this.rules.push({
                        field: this.rulesColumns[i],
                        op: "cn",
                        data: this.filterInput.nativeElement.value
                    });
              }
              this.filter.groupOp = 'OR';
              this.filter.rules = this.rules;
            }
            return this.apiService.getPageList('/tipos-referencias',this.isfilter,JSON.stringify(this.filter),this.sort.direction,this.sort.active,
            this.paginator.pageIndex,this.paginator.pageSize);
          }),
          map(data => {
            // Flip flag to show that loading has finished.
            this.isLoadingResults = false;
            this.isRateLimitReached = false;
            this.length = data.records;

            return data.rows as ReferenceTypes[];;
          }),
          catchError(() => {
            this.isLoadingResults = false;
            // Catch if reached its rate limit. Return empty data.
            this.isRateLimitReached = true;
            return observableOf([]);
          })
        ).subscribe(data => this.dataSource.data = data);
  }

}
