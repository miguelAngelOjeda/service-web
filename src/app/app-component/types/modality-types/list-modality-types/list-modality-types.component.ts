import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CalculationTypes, Filter, Rules  } from '../../../../core/models';
import { ApiService } from '../../../../core/services';
import {merge, fromEvent, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap, filter} from 'rxjs/operators';
import { MatPaginator, MatTableDataSource, MatDialog, MatSort, PageEvent, Sort } from '@angular/material';

@Component({
  selector: 'app-list-modality-types',
  templateUrl: './list-modality-types.component.html',
  styleUrls: ['./list-modality-types.component.scss']
})
export class ListModalityTypesComponent implements AfterViewInit {
  public isMobile: Boolean;
  public rulesColumns  = ['codigo','nombre'];
  public displayedColumns = ['codigo','nombre','montoMaximo','montoMinimo','interes','tipoCalculos.nombre','opciones'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filterInput: ElementRef;

  public dataSource = new MatTableDataSource<CalculationTypes>();

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
            return this.apiService.getPageList('/modalidades',this.isfilter,this.filterInput.nativeElement.value, this.rulesColumns,
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
