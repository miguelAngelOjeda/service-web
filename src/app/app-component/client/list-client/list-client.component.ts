import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog, MatSort, PageEvent, Sort} from '@angular/material';
import { People } from '../../../core/models';
import { ApiService } from '../../../core/services';
import {merge, fromEvent, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap, filter} from 'rxjs/operators';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.scss']
})
export class ListClientComponent implements AfterViewInit {
  isMobile = false;
  public rulesColumns  = ['persona.documento', 'persona.ruc', 'persona.primerNombre', 'persona.segundoNombre', 'persona.primerApellido'];
  displayedColumns = ['persona.tipoPersona','persona.documento', 'persona.ruc', 'persona.primerNombre' , 'persona.email', 'sucursal.nombre', 'opciones'];


    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('filter') filterInput: ElementRef;

    public dataSource = new MatTableDataSource<any>();

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
              if(this.filterInput.nativeElement.textLength > 1){
                this.isfilter = true;
              }
              return this.apiService.getPageList('/clientes',this.isfilter,this.filterInput.nativeElement.value, this.rulesColumns,
              this.sort.direction,this.sort.active,this.paginator.pageIndex,this.paginator.pageSize);
            }),
            map(data => {
              // Flip flag to show that loading has finished.
              this.length = data.records;
              return data.rows as People[];;
            }),
            catchError(() => {
              return observableOf([]);
            })
          ).subscribe(data => this.dataSource.data = data);
    }

}
