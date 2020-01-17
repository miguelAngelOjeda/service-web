  import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
  import { MatPaginator, MatTableDataSource, MatDialog, MatDialogConfig, MatSort, PageEvent, Sort} from '@angular/material';
  import { ApiService } from '../../../../core/services';
  import { Message } from '../../../../core/models';
  import { DeleteDialogComponent } from '../../../../shared';
  import { merge, fromEvent, Observable, of as observableOf} from 'rxjs';
  import { catchError, map, startWith, switchMap, filter} from 'rxjs/operators';
  import { FormGroup, FormArray , FormControl, FormBuilder, Validators, NgForm, FormGroupDirective } from '@angular/forms';

  @Component({
    selector: 'app-list-credits',
    templateUrl: './list-credits.component.html',
    styleUrls: ['./list-credits.component.scss']
  })
  export class ListCreditsComponent implements OnInit {
    public isMobile: Boolean;
    filterForm: FormGroup;
    public rulesColumns  = ['cliente.persona.documento', 'cliente.persona.ruc', 'cliente.persona.primerNombre', 'cliente.persona.segundoNombre', 'cliente.persona.primerApellido', 'estado.nombre'];
    public displayedColumns = ['id','fechaPresentacion', 'cliente.persona.documento', 'cliente.persona.ruc', 'cliente.persona.primerNombre' ,
     'montoSolicitado', 'sucursal.nombre', 'estado.nombre', 'opciones'];
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
    groupOp = 'OR';

    constructor(
      private formBuilder: FormBuilder,
      private dialog: MatDialog,
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

    delete(data: any){
      if(data.id){
        const message = new Message;
        message.titulo = "Eliminar Registro"
        message.texto = "Esta seguro que desea eliminar el registro!! ";

        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = message;

        let dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
          if(result){
            this.apiService.delete('/solicitud_creditos/' + data.id)
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

    public initFormBuilder(){

      let fechaInicio = new Date();
      fechaInicio.setHours(0,0,0);
      let fechaFin = new Date();
      fechaFin.setHours(23,59,0);

      this.filterForm = this.formBuilder.group({
        fechaInicio: null,
        fechaFin: null,
        id: null,
        cliente: this.formBuilder.group({
          persona: this.formBuilder.group({
            documento: null,
            ruc: null
          })}),
        funcionario: [null],
        estado: null,
        sucursal: null
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
              return this.apiService.getList('/solicitud_creditos', this.filterValue, this.rulesColumns,
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
