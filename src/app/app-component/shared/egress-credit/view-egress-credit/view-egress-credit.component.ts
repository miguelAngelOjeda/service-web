import { Component, AfterViewInit, ViewChild, Input, ElementRef } from '@angular/core';
import { ApiService } from '../../../../core/services';
import {merge, fromEvent, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap, filter} from 'rxjs/operators';
import { MatPaginator, MatTableDataSource, MatDialog, MatSort, PageEvent, Sort } from '@angular/material';

@Component({
  selector: 'app-view-egress-credit',
  templateUrl: './view-egress-credit.component.html',
  styleUrls: ['./view-egress-credit.component.scss']
})
export class ViewEgressCreditComponent implements AfterViewInit {

  public isMobile: Boolean;
  public displayedColumns = ['nombreFinanciera','cuota','promedioAtraso', 'maximoAtraso','monto', 'observacion'];
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
            return this.apiService.getPageList('/egresosCreditos',false,null, null,
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
