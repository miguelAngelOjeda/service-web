import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog, MatSort, PageEvent, Sort} from '@angular/material';
import { Users, Filter, Rules } from '../../../../core/models';
import { ApiService } from '../../../../core/services';
import {merge, fromEvent, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap, filter} from 'rxjs/operators';

@Component({
  selector: 'app-list-functionary',
  templateUrl: './list-functionary.component.html',
  styleUrls: ['./list-functionary.component.scss']
})
export class ListFunctionaryComponent implements AfterViewInit {
    public isMobile: Boolean;
    public rulesColumns  = ['persona.documento', 'alias', 'persona.primerNombre', 'persona.segundoNombre', 'persona.primerApellido'];
    public displayedColumns = ['alias', 'persona.tipoPersona','persona.documento', 'persona.ruc', 'persona.primerNombre' , 'email', 'sucursal.nombre', 'opciones'];
    public dataSource = new MatTableDataSource<any>();

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild('filter', { static: true }) filterInput: ElementRef;

    //Filter
    isfilter = false;
    // MatPaginator Inputs
    length = 0;
    pageSize = 10;
    pageSizeOptions: number[] = [10, 25, 100];
    // MatPaginator Output
    pageEvent: PageEvent;

    constructor(
      private apiService: ApiService) {}

    ngAfterViewInit() {
      this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
      merge(this.sort.sortChange, this.paginator.page, fromEvent(this.filterInput.nativeElement, 'keyup'))
          .pipe(
            startWith({}),
            switchMap(() => {
              this.isfilter = false;
              if(this.filterInput.nativeElement.value.length > 3){
                this.isfilter = true;
              }
              return this.apiService.getPageList('/funcionarios',this.isfilter,this.filterInput.nativeElement.value, this.rulesColumns,
              this.sort.direction,this.sort.active,this.paginator.pageIndex,this.paginator.pageSize);
            }),
            map(data => {
              // Flip flag to show that loading has finished.
              console.log(data.rows);
              this.length = data.records;
              return data.rows as Users[];;
            }),
            catchError(() => {
              return observableOf([]);
            })
          ).subscribe(data => this.dataSource.data = data);
    }

}
