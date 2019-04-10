import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EgressTypes } from '../../core/models';
import { ApiService } from '../../core/services';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { MatPaginator, MatTableDataSource, MatDialog, MatSort, PageEvent, Sort } from '@angular/material';

@Component({
  selector: 'app-list-egress-types',
  templateUrl: './list-egress-types.component.html',
  styleUrls: ['./list-egress-types.component.scss']
})
export class ListEgressTypesComponent implements OnInit {

  public displayedColumns = ['codigo','nombre','opciones'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  public dataSource = new MatTableDataSource<EgressTypes>();
  // MatPaginator Inputs
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 25, 100];
  // MatPaginator Output
  pageEvent: PageEvent;

  isLoadingResults = true;
  isRateLimitReached = false;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
        .pipe(
          startWith({}),
          switchMap(() => {
            this.isLoadingResults = true;
            return this.apiService.getPageList('/tipos-egresos',false,this.sort.direction,this.sort.active,
            this.paginator.pageIndex,this.paginator.pageSize);
          }),
          map(data => {
            // Flip flag to show that loading has finished.
            this.isLoadingResults = false;
            this.isRateLimitReached = false;
            this.length = data.records;

            return data.rows as EgressTypes[];;
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
