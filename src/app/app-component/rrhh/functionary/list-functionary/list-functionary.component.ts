import { Component, ElementRef, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog,
   MatDialogConfig, MatSort, PageEvent, Sort} from '@angular/material';
import { Users, Filter, Rules, Message } from '../../../../core/models';
import { ApiService } from '../../../../core/services';
import {merge, fromEvent, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap, filter} from 'rxjs/operators';
import { DeleteDialogComponent } from '../../../../shared';
import { FormGroup,FormControl, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-list-functionary',
  templateUrl: './list-functionary.component.html',
  styleUrls: ['./list-functionary.component.scss']
})
export class ListFunctionaryComponent implements OnInit {
    public isMobile: Boolean;
    public filterForm: FormGroup;
    public rulesColumns  = ['persona.documento', 'alias', 'persona.primerNombre', 'persona.segundoNombre', 'persona.primerApellido'];
    public displayedColumns = ['alias', 'nroLegajo', 'persona.tipoPersona','persona.documento', 'persona.ruc', 'persona.primerNombre' , 'email', 'sucursal.nombre', 'opciones'];
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
      private dialog: MatDialog,
      private apiService: ApiService) {}

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
            this.apiService.delete('/funcionarios/' + data.id)
            .subscribe(res => {
                if(res.status == 200){
                  this.paginator._changePageSize(this.paginator.pageSize);
                }
            });
          }
        })
      }
    }

    public initFormBuilder(){
      this.filterForm = this.formBuilder.group({
        fechaInicio: null,
        fechaFin: null,
        id: null,
        alias: [null],
        cargo: [null],
        sucursal: [null],
        rol: [null],
        nroLegajo: [null],
        persona: this.formBuilder.group({
          documento: null,
          ruc: null
        }),
        retirado: null
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
              return this.apiService.getList('/funcionarios', this.filterValue, this.rulesColumns,
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
