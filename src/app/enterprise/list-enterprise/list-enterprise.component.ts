import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Enterprise } from '../../core/models';
import { ApiService } from '../../core/services';
import { MatPaginator, MatTableDataSource, MatDialog, MatSort, PageEvent, Sort } from '@angular/material';

@Component({
  selector: 'app-list-enterprise',
  templateUrl: './list-enterprise.component.html',
  styleUrls: ['./list-enterprise.component.css']
})
export class ListEnterpriseComponent implements OnInit {
  public displayedColumns = ['nombre', 'ruc', 'direccion', 'telefono', 'email','opciones'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  public dataSource = new MatTableDataSource<Enterprise>();
  // MatPaginator Inputs
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 25, 100];
  // MatPaginator Output
  pageEvent: PageEvent;

  private _fixed = false;
  public open = false;
  public spin = false;
  public direction = 'right';
  public animationMode = 'fling';

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getList(null);
    this.dataSource.sort = this.sort;
  }

  public getList(event?:PageEvent){
    let index = event == null ? 1 :  event.pageIndex + 1;
    let rows = event == null ? 10 :  event.pageSize;
    let sidx = this.sort.direction == null ? 'desc' :  this.sort.direction;
    let sort = this.sort.active == null ? 'id' :  this.sort.active;
    this.apiService.getPageList('/empresas',false,sidx,sort,index,rows)
    .subscribe(res => {
      this.length = res.records;
      this.dataSource.data = res.rows as Enterprise[];
    })
  }

  public sortData(sort: Sort) {
    let index = this.pageEvent == null ? 1 :  this.pageEvent.pageIndex + 1;
    let rows = this.pageEvent == null ? 10 :  this.pageEvent.pageSize;
    this.apiService.getPageList('/empresas',false,sort.direction,sort.active,index,rows)
    .subscribe(res => {
      this.length = res.records;
      this.dataSource.data = res.rows as Enterprise[];
    })
  }

  get fixed(): boolean {
        return this._fixed;
  }

  set fixed(fixed: boolean) {
      this._fixed = fixed;
      if (this._fixed) {
          this.open = true;
      }
  }

  public stopPropagation(event: Event): void {
      // Prevent the click to propagate to document and trigger
      // the FAB to be closed automatically right before we toggle it ourselves
      event.stopPropagation();
  }

  public doAction(event: any) {
      console.log(event);
  }

}
