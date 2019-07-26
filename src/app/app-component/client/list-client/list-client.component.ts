import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog,
   MatDialogConfig, MatSort, PageEvent, Sort} from '@angular/material';
import { People, Message } from '../../../core/models';
import { ApiService } from '../../../core/services';
import {merge, fromEvent, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap, filter} from 'rxjs/operators';
import { DeleteDialogComponent } from '../../../shared';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.scss']
})
export class ListClientComponent implements AfterViewInit {
  public isMobile: Boolean;
  public rulesColumns  = ['persona.documento', 'persona.ruc', 'persona.primerNombre', 'persona.segundoNombre', 'persona.primerApellido'];
  public displayedColumns = ['persona.tipoPersona','persona.documento', 'persona.ruc', 'persona.primerNombre' , 'persona.email', 'sucursal.nombre', 'opciones'];
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
    private dialog: MatDialog,
    private apiService: ApiService) {}

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page, fromEvent(this.filterInput.nativeElement, 'keyup'))
        .pipe(
          startWith({}),
          switchMap(() => {
            this.isfilter = false;
            if(this.filterInput.nativeElement.value > 1){
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
          this.apiService.delete('/clientes/' + data.id)
          .subscribe(res => {
              if(res.status == 200){
                this.paginator._changePageSize(this.paginator.pageSize);
              }
          });
        }
      })
    }
  }

}
