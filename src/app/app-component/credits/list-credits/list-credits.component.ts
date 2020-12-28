import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog, MatDialogConfig, MatSort, PageEvent, Sort} from '@angular/material';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ApiService } from '../../../core/services';
import { Message } from '../../../core/models';
import { DeleteDialogComponent } from '../../../shared';
import { FilterSheetComponent } from './filter-sheet/filter-sheet.component';
import { merge, fromEvent, Observable, of as observableOf} from 'rxjs';
import { catchError, map, startWith, switchMap, filter} from 'rxjs/operators';


@Component({
  selector: 'app-list-credits',
  templateUrl: './list-credits.component.html',
  styleUrls: ['./list-credits.component.scss']
})
export class ListCreditsComponent implements OnInit {
  public isMobile: Boolean;

  public rulesColumns  = ['propuestaSolicitud.cliente.persona.documento', 'propuestaSolicitud.cliente.persona.ruc', 'propuestaSolicitud.cliente.persona.primerNombre', 'propuestaSolicitud.cliente.persona.segundoNombre', 'propuestaSolicitud.cliente.persona.primerApellido'];
  public displayedColumns = ['id','propuestaSolicitud.id','documentoCliente', 'nombreCliente','montoCapital', 'montoInteres', 'saldoCapital', 'saldoInteres' ,
   'plazoOperacion', 'fechaGeneracion', 'fechaDesembolso', 'sucursal', 'estado.nombre', 'opciones'];
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
    private dialog: MatDialog,
    private _bottomSheet: MatBottomSheet,
    private apiService: ApiService
  ) { }

  ngOnInit() {
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
            if(this.filterInput.nativeElement.value.length >= 3){
              this.isfilter = true;
              value = this.filterInput.nativeElement.value;
            }
            return this.apiService.getPageList('/creditos', this.isfilter, value, this.rulesColumns,
            this.sort.direction, this.sort.active, this.paginator.pageIndex, this.paginator.pageSize, false, null, groupOp);
          }),
          map(data => {
            // Flip flag to show that loading has finished.
            this.length = data.records;
            //console.log(data.rows);
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

  openBottomSheet(): void {
    this._bottomSheet.open(FilterSheetComponent);
  }

}
