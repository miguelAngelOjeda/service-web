import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Filter, Rules, Message  } from '../../../../core/models';
import { ApiService } from '@core/service';
import { DeleteDialogComponent } from '../../../../shared';
import {merge, fromEvent, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap, filter} from 'rxjs/operators';
import { MatPaginator, MatTableDataSource, MatDialog, MatSort, PageEvent, Sort, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-list-functionary-types',
  templateUrl: './list-functionary-types.component.html',
  styleUrls: ['./list-functionary-types.component.scss']
})
export class ListFunctionaryTypesComponent implements AfterViewInit {
  public isMobile: Boolean;
  public rulesColumns  = ['nombre'];
  public displayedColumns = ['nombre','opciones'];
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
    private apiService: ApiService
  ) { }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page, fromEvent(this.filterInput.nativeElement, 'keyup'))
        .pipe(
          startWith({}),
          switchMap(() => {
            this.isfilter = false;
            if(this.filterInput.nativeElement.value.length  > 3){
              this.isfilter = true;
            }
            return this.apiService.getPageList('/tipos-funcionarios',this.isfilter,this.filterInput.nativeElement.value, this.rulesColumns,
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
          this.apiService.delete('/tipos-funcionarios/' + data.id)
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
