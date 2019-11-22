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

  //Filter
  isfilter = false;
  // MatPaginator Inputs
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 25, 100];
  // MatPaginator Output
  pageEvent: PageEvent;
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

    merge(this.sort.sortChange, this.paginator.page, fromEvent(this.filterInput.nativeElement, 'keyup'))//, fromEvent(this.filterButton.nativeElement, 'click'),)
        .pipe(
          startWith({}),
          switchMap(() => {
            let groupOp = 'OR';
            let value;
            this.isfilter = false;
            // if(this.filterButton.nativeElement.value ==='button'){
            //   this.isfilter = true;
            //   groupOp = 'AND'
            //   value = this.filterForm.value;
            // }
            if(this.filterInput.nativeElement.value.length > 3){
              this.isfilter = true;
              value = this.filterInput.nativeElement.value;
            }
            return this.apiService.getPageList('/solicitud_creditos', this.isfilter, value, this.rulesColumns,
            this.sort.direction, this.sort.active, this.paginator.pageIndex, this.paginator.pageSize, false, null, groupOp);
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
    this.filterForm = this.formBuilder.group({
      fechaInicio: new Date(),
      fechaFin: new Date(),
      documento: null,
      ruc: null,
      nroSolicitud: null,
      estado: null,
      sucursal: null,
    });
  }

}
