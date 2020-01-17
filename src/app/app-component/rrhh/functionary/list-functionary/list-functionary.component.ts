import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
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
export class ListFunctionaryComponent implements AfterViewInit {
    public isMobile: Boolean;
    public filterForm: FormGroup;
    public rulesColumns  = ['persona.documento', 'alias', 'persona.primerNombre', 'persona.segundoNombre', 'persona.primerApellido'];
    public displayedColumns = ['alias', 'nroLegajo', 'persona.tipoPersona','persona.documento', 'persona.ruc', 'persona.primerNombre' , 'email', 'sucursal.nombre', 'opciones'];
    public dataSource = new MatTableDataSource<any>();

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild('filter', { static: true }) filterInput: ElementRef;

    // Advance Filter panel
    advanceFilterOpenState: boolean = false;
    filterValue = '';
    isfilter = false;
    // MatPaginator Inputs
    length = 0;
    pageSize = 10;
    pageSizeOptions: number[] = [10, 25, 100];
    // MatPaginator Output
    pageEvent: PageEvent;

    constructor(
      private dialog: MatDialog,
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
