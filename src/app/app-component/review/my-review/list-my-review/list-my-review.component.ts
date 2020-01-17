import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog, MatSort, PageEvent, Sort} from '@angular/material';
import { ApiService } from '../../../../core/services';
import {merge, fromEvent, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap, filter} from 'rxjs/operators';
import { FormGroup,FormControl, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-list-my-review',
  templateUrl: './list-my-review.component.html',
  styleUrls: ['./list-my-review.component.scss']
})
export class ListMyReviewComponent implements OnInit {
  public isMobile: Boolean;
  filterForm: FormGroup;
  public rulesColumns  = ['funcionarioAnalisis.persona.segundoNombre', 'propuestaSolicitud.cliente.persona.documento', 'funcionarioAnalisis.persona.primerApellido', 'estado.nombre'];
  public displayedColumns = ['id','propuestaSolicitud.tipoSolicitud.nombre','propuestaSolicitud.id','propuestaSolicitud.fechaPresentacion','fechaInicioAnalisis','fechaFinAnalisis' , 'propuestaSolicitud.montoSolicitado', 'sucursal', 'estado.nombre', 'opciones'];
  public dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filterInput: ElementRef;
  @ViewChild("filterButton", { read: ElementRef, static: true}) filterButton: ElementRef;

  // Advance Filter panel
  advanceFilterOpenState: boolean = false;
  filterValue = '';
  // MatPaginator Inputs
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 25, 100];
  // MatPaginator Output
  pageEvent: PageEvent;
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.initFormBuilder();
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.sort.active = 'id';
    this.sort.direction = 'desc';
    this.paginator.pageSize = this.pageSizeOptions[0];
    this.filters();
  }


  public initFormBuilder(){

    let fechaInicio = new Date();
    fechaInicio.setHours(0,0,0);
    let fechaFin = new Date();
    fechaFin.setHours(23,59,0);

    this.filterForm = this.formBuilder.group({
      fechaInicio: null,
      fechaFin: null,
      id: null,
      propuestaSolicitud: this.formBuilder.group({
        id: null,
        cliente: this.formBuilder.group({
          persona: this.formBuilder.group({
            documento: null,
            ruc: null
          })}),
      sucursal: null
      }),
      funcionarioAnalisis: [null],
      estado: null
    });
  }

  filters() {
    //Filtros Eventos
    let groupOp = "OR";

    const filterInp = fromEvent(this.filterInput.nativeElement, 'keyup').pipe(
            map((e: KeyboardEvent) => {
              return e.code;
            }),
            filter(val => {
              groupOp = "OR";
              this.filterValue = this.filterInput.nativeElement.value;
              return (!val.includes('Arrow') && !val.includes('Enter') && val.length > 3);
            }));

    const filterButton = fromEvent(this.filterButton.nativeElement, 'click').pipe(
            map((e: MouseEvent) => {
              return {
                x: e.clientX,
                y: e.clientY
              };
            }),
            filter(val => {
              groupOp = "AND";
              this.filterValue = JSON.stringify(this.filterForm.value);
              this.advanceFilterOpenState = false
              return true;
            }));

    merge(this.sort.sortChange, this.paginator.page, filterInp, filterButton)
        .pipe(
          startWith({}),
          switchMap((event: any) => {
            return this.apiService.getList('/analisis_solicitudes/mis-analisis', this.filterValue, this.rulesColumns,
            this.sort, this.paginator, false, groupOp);
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

  getValue(data: any, form : any): void {
    (<FormControl>this.filterForm.get(form)).setValue(data);
  }

  getValueSubsidiary(data: any, form : any): void {
    (<FormControl>this.filterForm.get("propuestaSolicitud")).get(form).setValue(data);
  }

  toggleAdvanceFilter() {
    this.advanceFilterOpenState = !this.advanceFilterOpenState
  }

  closeFilterAdvance() {
    this.advanceFilterOpenState = false
    //Inicializar valores del filtro
    this.filterValue = '';
    this.filterForm.reset({});
    this.paginator._changePageSize(this.paginator.pageSize);
  }

}
