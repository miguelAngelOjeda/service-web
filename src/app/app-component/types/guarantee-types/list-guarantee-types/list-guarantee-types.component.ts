import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CalculationTypes, Filter, Rules  } from '../../../../core/models';
import { ApiService } from '../../../../core/services';
import {merge, fromEvent, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap, filter} from 'rxjs/operators';
import { MatPaginator, MatTableDataSource, MatDialog, MatSort, PageEvent, Sort } from '@angular/material';

@Component({
  selector: 'app-list-guarantee-types',
  templateUrl: './list-guarantee-types.component.html',
  styleUrls: ['./list-guarantee-types.component.scss']
})
export class ListGuaranteeTypesComponent implements AfterViewInit {
  public isMobile: Boolean;
  public rulesColumns  = ['codigo','nombre'];
  public displayedColumns = ['codigo','nombre','codeudor','hipoteca','opciones'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filterInput: ElementRef;

  public dataSource = new MatTableDataSource<any>();

  //Filter
  isfilter = false;
  // MatPaginator Inputs
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 25, 100];
  // MatPaginator Output
  pageEvent: PageEvent;

  constructor(private apiService: ApiService) { }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page, fromEvent(this.filterInput.nativeElement, 'keyup'))
        .pipe(
          startWith({}),
          switchMap(() => {
            this.isfilter = false;
            if(this.filterInput.nativeElement.value.length  > 3){
              this.isfilter = true;
            }
            return this.apiService.getPageList('/tipos-garantias',this.isfilter,this.filterInput.nativeElement.value, this.rulesColumns,
            this.sort.direction,this.sort.active,this.paginator.pageIndex,this.paginator.pageSize);
          }),
          map(data => {
            if(data.status == 200){
              this.length = data.records;
              return data.rows;
            }
            return observableOf([]);
          }),
          catchError(() => {
            return observableOf([]);
          })
        ).subscribe(data => this.dataSource.data = data);
  }

}
