import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CalculationTypes } from '../../core/models';
import { ApiService } from '../../core/services';
import { MatPaginator, MatTableDataSource, MatDialog, MatSort, PageEvent, Sort } from '@angular/material';

@Component({
  selector: 'app-list-calculation-types',
  templateUrl: './list-calculation-types.component.html',
  styleUrls: ['./list-calculation-types.component.scss']
})
export class ListCalculationTypesComponent implements OnInit {

  public displayedColumns = ['codigo','nombre','opciones'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  public dataSource = new MatTableDataSource<CalculationTypes>();
  // MatPaginator Inputs
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 25, 100];
  // MatPaginator Output
  pageEvent: PageEvent;

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
    this.apiService.getPageList('/tipos-calculos',false,sidx,sort,index,rows)
    .subscribe(res => {
      this.length = res.records;
      this.dataSource.data = res.rows as CalculationTypes[];
    })
  }

  public sortData(sort: Sort) {
    let index = this.pageEvent == null ? 1 :  this.pageEvent.pageIndex + 1;
    let rows = this.pageEvent == null ? 10 :  this.pageEvent.pageSize;
    this.apiService.getPageList('/tipos-calculos',false,sort.direction,sort.active,index,rows)
    .subscribe(res => {
      this.length = res.records;
      this.dataSource.data = res.rows as CalculationTypes[];
    })
  }

}
