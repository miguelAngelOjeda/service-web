import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog, MatSort, PageEvent, Sort} from '@angular/material';
import { ApiService } from '../../../core/services';
import {merge, fromEvent, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap, filter} from 'rxjs/operators';

@Component({
  selector: 'app-list-review',
  templateUrl: './list-review.component.html',
  styleUrls: ['./list-review.component.scss']
})
export class ListReviewComponent implements OnInit {
  public isMobile: Boolean;
  public rulesColumns  = ['funcionarioAnalisis.persona.segundoNombre', 'propuestaSolicitud.cliente.persona.documento', 'funcionarioAnalisis.persona.primerApellido', 'estado.nombre'];
  public displayedColumns = ['id','propuestaSolicitud.tipoSolicitud.nombre','propuestaSolicitud.id','propuestaSolicitud.fechaPresentacion','fechaInicioAnalisis','fechaFinAnalisis',  'funcionarioAnalisis.alias' , 'propuestaSolicitud.montoSolicitadoOriginal', 'sucursal', 'estado.nombre', 'opciones'];
  public dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filterInput: ElementRef;

  //Filter
  isfilter = false;
  // MatPaginator Inputs
  length = 0;
  pageSize = 25;
  pageSizeOptions: number[] = [25, 50, 100];
  // MatPaginator Output
  pageEvent: PageEvent;
  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.sort.active = 'id';
    this.sort.direction = 'desc';
    merge(this.sort.sortChange, this.paginator.page, fromEvent(this.filterInput.nativeElement, 'keyup'))
        .pipe(
          startWith({}),
          switchMap(() => {
            this.isfilter = false;
            if(this.filterInput.nativeElement.value.length > 3){
              this.isfilter = true;
            }
            return this.apiService.getPageList('/analisis_solicitudes',this.isfilter,this.filterInput.nativeElement.value, this.rulesColumns,
            this.sort.direction,this.sort.active,this.paginator.pageIndex,this.paginator.pageSize);
          }),
          map(data => {
            // Flip flag to show that loading has finished.
            this.length = data.records;
            return data.rows;
          }),
          catchError(() => {
            return observableOf([]);
          })
        ).subscribe(data => this.dataSource.data = data);
  }

}
