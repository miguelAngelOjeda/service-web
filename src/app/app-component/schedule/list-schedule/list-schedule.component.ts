import { Component, OnInit, ViewChild, ElementRef, EventEmitter  } from '@angular/core';
import { Business, Message, Filter, Rules } from '../../../core/models';
import { ApiService } from '../../../core/services';
import { DeleteDialogComponent } from '../../../shared';
import { EditModalScheduleComponent } from '../modal-schedule/edit-modal-schedule';
import { AddModalScheduleComponent } from '../modal-schedule/add-modal-schedule';
import { ViewModalScheduleComponent } from '../modal-schedule/view-modal-schedule';
import {merge, fromEvent, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap, filter} from 'rxjs/operators';
import { FormGroup,FormControl, FormBuilder} from '@angular/forms';
import { MatPaginator, MatTableDataSource, MatDialog, MatSort, PageEvent, Sort, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-list-schedule',
  templateUrl: './list-schedule.component.html',
  styleUrls: ['./list-schedule.component.css']
})
export class ListScheduleComponent implements OnInit {
  public isMobile: Boolean;
  public filterForm: FormGroup;
  public rulesColumns  = ['funcionario.persona.primerNombre', 'cliente.persona.primerNombre', 'tipoCitas.nombre'];
  public displayedColumns = ['funcionario.persona.primerNombre', 'fechaConsulta', 'horaInicio', 'cliente.persona.primerNombre', 'tipoCitas.nombre', 'estadoCitas.nombre', 'cliente.persona.telefono', 'cliente.persona.email','opciones'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filterInput: ElementRef;
  @ViewChild("filterButton", { read: ElementRef, static: true}) filterButton: ElementRef;

  public dataSource = new MatTableDataSource<Business>();
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
    public dialog: MatDialog,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.initFormBuilder();
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.sort.active = 'id';
    this.sort.direction = 'desc';
    this.paginator.pageSize = this.pageSizeOptions[0];
    this.filters();
  }

  public initFormBuilder(){
    this.filterForm = this.formBuilder.group({
      fechaInicio: null,
      fechaFin: null,
      id: null,
      tipoCitas: [null],
      estadoCitas: [null],
      funcionario: [null],
      especialidad: [null],
      cliente: [null],
      observacion: null,
      recordatorio: null
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
            return this.apiService.getList('/citas', this.filterValue, this.rulesColumns,
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

  add(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(AddModalScheduleComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
        this.paginator._changePageSize(this.paginator.pageSize);
    });
  }

  edit(event:any){
    this.apiService.get('/citas/' + event.id)
    .subscribe(res => {
      if(res.status == 200){
        res.model.fechaConsulta = new Date(res.model.fechaConsulta);
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = res.model;
        const dialogRef = this.dialog.open(EditModalScheduleComponent,dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
          this.paginator._changePageSize(this.paginator.pageSize);
        });
      }
    });
  }

  view(event: any): void {
    this.apiService.get('/citas/' + event.id)
    .subscribe(res => {
      if(res.status == 200){
        res.model.fechaConsulta = new Date(res.model.fechaConsulta);
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.data = res.model;
        const dialogRef = this.dialog.open(ViewModalScheduleComponent,dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
          this.paginator._changePageSize(this.paginator.pageSize);
        });
      }
    });
  }

  delete(data: Business){
    if(data.id){
      const message = new Message;
      message.titulo = "Eliminar Registro"
      message.texto = "Esta seguro que desea eliminar el registro " + data.nombre;

      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = message;

      let dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.apiService.delete('/citas/' + data.id)
          .subscribe(res => {
              if(res.status == 200){
                this.paginator._changePageSize(this.paginator.pageSize);
              }
          });
        }
      })
    }
  }

  getValue(data: any, form : any): void {
    (<FormControl>this.filterForm.get(form)).setValue(data);
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
