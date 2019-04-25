import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog, MatSort, PageEvent, Sort} from '@angular/material';
import { User} from '../../../core/models';
import { ApiService } from '../../../core/services';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('filter') filter: ElementRef;

    public dataSource = new MatTableDataSource<User>();
    // MatPaginator Inputs
    length = 0;
    pageSize = 10;
    pageSizeOptions: number[] = [10, 25, 100];
    // MatPaginator Output
    pageEvent: PageEvent;

    displayedColumns = ['documento', 'alias', 'primerNombre', 'segundoNombre', 'primerApellido' , 'email', 'telefono', 'opciones'];

    constructor(
      private apiService: ApiService) {

    }

    ngOnInit() {
      this.getList(null);
      this.dataSource.sort = this.sort;
    }


    public getList(event?:PageEvent){
      let index = event == null ? 1 :  event.pageIndex + 1;
      let rows = event == null ? 10 :  event.pageSize;
      let sidx = this.sort.direction == null ? 'desc' :  this.sort.direction;
      let sort = this.sort.active == null ? 'id' :  this.sort.active;
      this.apiService.getPageList('/usuarios',false,sidx,sort,index,rows)
      .subscribe(res => {
        this.length = res.records;
        this.dataSource.data = res.rows as User[];
      })
    }

    public sortData(sort: Sort) {
      let index = this.pageEvent == null ? 1 :  this.pageEvent.pageIndex + 1;
      let rows = this.pageEvent == null ? 10 :  this.pageEvent.pageSize;
      this.apiService.getPageList('/usuarios',false,sort.direction,sort.active,index,rows)
      .subscribe(res => {
        this.length = res.records;
        this.dataSource.data = res.rows as User[];
      })
    }

}
