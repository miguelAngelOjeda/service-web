import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Enterprise, Subsidiary } from '../../core/models';
import { ApiService } from '../../core/services';
import { ListSubsidiaryComponent } from '../../subsidiary/list-subsidiary';
import { FormControl, Validators} from '@angular/forms';
import { MatPaginator, MatTableDataSource, MatDialog, MatSort, PageEvent,
   Sort, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-view-enterprise',
  templateUrl: './view-enterprise.component.html',
  styleUrls: ['./view-enterprise.component.css']
})
export class ViewEnterpriseComponent implements OnInit {
  public displayedColumns = ['codigoSucursal', 'nombre', 'direccion', 'telefono', 'email','opciones'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  public dataSource = new MatTableDataSource<Subsidiary>();
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

  data: Enterprise;
  formControl = new FormControl('', [
    Validators.required
  // Validators.email,
  ]);

  constructor(
    public dialog: MatDialog,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
      this.apiService.get('/empresas/' + this.route.snapshot.params.id)
      .subscribe(res => {
         this.data = res.model as Enterprise;
      });
      this.getListFk(null, this.route.snapshot.params.id);
  }


  public getListFk(event?:PageEvent, idEmpresa?:string){
    let index = event == null ? 1 :  event.pageIndex + 1;
    let rows = event == null ? 10 :  event.pageSize;
    let sidx = this.sort.direction == null ? 'desc' :  this.sort.direction;
    let sort = this.sort.active == null ? 'id' :  this.sort.active;
    this.apiService.getPageList('/empresas/sucursales',false, sidx, sort, index, rows, false, idEmpresa)
    .subscribe(res => {
      this.length = res.records;
      this.dataSource.data = res.rows as Subsidiary[];
    })
  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Campo requerido' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

}
