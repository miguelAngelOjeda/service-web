import { Component, AfterViewInit, ViewChild, ElementRef, EventEmitter  } from '@angular/core';
import { Business, Message, Filter, Rules } from '../../../core/models';
import { ApiService } from '../../../core/services';
import { DeleteDialogComponent } from '../../../shared';
import {merge, fromEvent, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap, filter} from 'rxjs/operators';
import { MatPaginator, MatTableDataSource, MatDialog, MatSort, PageEvent, Sort, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-list-business',
  templateUrl: './list-business.component.html',
  styleUrls: ['./list-business.component.css']
})
export class ListBusinessComponent implements AfterViewInit {
  public isMobile: Boolean;
  public rulesColumns  = ['nombre', 'ruc', 'direccion'];
  public displayedColumns = ['nombre', 'ruc', 'direccion', 'telefono', 'email','opciones'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filterInput: ElementRef;

  public dataSource = new MatTableDataSource<Business>();
  //Filter
  isfilter = false;
  filter = new Filter;
  rules: Array<Rules> = [];
  // MatPaginator Inputs
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 25, 100];
  // MatPaginator Output
  pageEvent: PageEvent;

  isLoadingResults = true;
  isRateLimitReached = false;

  constructor(
    public dialog: MatDialog,
    private apiService: ApiService
  ) {}

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
            return this.apiService.getPageList('/empresas',this.isfilter,this.filterInput.nativeElement.value, this.rulesColumns,
            this.sort.direction, this.sort.active, this.paginator.pageIndex, this.paginator.pageSize);
          }),
          map(data => {
            // Flip flag to show that loading has finished.
            this.length = data.records;
            return data.rows as Business[];;
          }),
          catchError(() => {
            return observableOf([]);
          })
        ).subscribe(data => this.dataSource.data = data);
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
          this.apiService.delete('/empresas/' + data.id)
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
