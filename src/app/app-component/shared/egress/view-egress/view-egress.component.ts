import { Component, AfterViewInit, ViewChild, Input, ElementRef } from '@angular/core';
import { ApiService } from '../../../../core/services';
import {merge, fromEvent, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap, filter} from 'rxjs/operators';
import { MatPaginator, MatTableDataSource, MatDialog, MatSort, PageEvent, Sort } from '@angular/material';

@Component({
  selector: 'app-view-egresss',
  templateUrl: './view-egress.component.html',
  styleUrls: ['./view-egress.component.scss']
})
export class ViewEgressComponent implements AfterViewInit {
  public isMobile: Boolean;
  public displayedColumns = ['monto','tipoIngresosEgresos.nombre'];
  public dataSource = new MatTableDataSource<any>();
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @Input()
  set fkFilterModel(id: any) {
    if(id){
      this.onChangesFkModel(id);
    }
  }

  constructor(private apiService: ApiService) { }

  ngAfterViewInit() {

  }

  onChangesFkModel(id:any){
    merge(this.sort.sortChange)
        .pipe(
          startWith({}),
          switchMap(() => {
            return this.apiService.getPageList('/egresos',false,null, null,
            this.sort.direction,this.sort.active,0,100, false,id);
          }),
          map(data => {
            return data.rows;
          }),
          catchError(() => {
            return observableOf([]);
          })
        ).subscribe(data => this.dataSource.data = data);
  }

}
