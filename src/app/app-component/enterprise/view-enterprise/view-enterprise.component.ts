import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Enterprise, Subsidiary } from '../../../core/models';
import { ApiService } from '../../../core/services';
import { ListSubsidiaryComponent } from '../../subsidiary/list-subsidiary';
import { AddDialogoSubsidiaryComponent } from './add-subsidiary';
import { EditDialogoSubsidiaryComponent } from './edit-subsidiary';
import { ViewDialogoSubsidiaryComponent } from './view-subsidiary';
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

  data: Enterprise;
  subsidiary: Subsidiary;
  formControl = new FormControl('', [
    Validators.required
  // Validators.email,
  ]);

  constructor(
    public dialog: MatDialog,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {
    this.data = new Enterprise();
    this.subsidiary = new Subsidiary();
    this.apiService.get('/empresas/' + this.route.snapshot.params.id)
    .subscribe(res => {
       this.data = res.model as Enterprise;
    });
  }

  ngOnInit() {
      this.getListFk(null, this.route.snapshot.params.id);
  }


  public sortData(sort: Sort) {
    let index = this.pageEvent == null ? 1 :  this.pageEvent.pageIndex + 1;
    let rows = this.pageEvent == null ? 10 :  this.pageEvent.pageSize;
    this.apiService.getPageList('/sucursales/'+this.route.snapshot.params.id+'/empresa',false, sort.direction, sort.active, index, rows, false)
    .subscribe(res => {
      this.length = res.records;
      this.dataSource.data = res.rows as Subsidiary[];
    })
  }

  public getListFk(event?:PageEvent, idEmpresa?:string){
    let index = event == null ? 1 :  event.pageIndex + 1;
    let rows = event == null ? 10 :  event.pageSize;
    // let sidx = this.sort.direction == null ? 'desc' :  this.sort.direction;
    // let sort = this.sort.active == null ? 'id' :  this.sort.active;
    this.apiService.getPageList('/sucursales/'+this.route.snapshot.params.id+'/empresa',false, 'desc', 'id', index, rows, false)
    .subscribe(res => {
      this.length = res.records;
      this.dataSource.data = res.rows as Subsidiary[];
    })
  }

  addSubsidiary() {
      this.subsidiary = new Subsidiary();
      this.subsidiary.empresa = new Enterprise();
      this.subsidiary.empresa.id = this.route.snapshot.params.id;

      const dialogRef = this.dialog.open(AddDialogoSubsidiaryComponent, {
          data: this.subsidiary
        });

      dialogRef.afterClosed().subscribe(result => {
        this.getListFk(null, this.route.snapshot.params.id);
      });
  }

  editSubsidiary(id: number) {
    this.apiService.get('/sucursales/' + id)
    .subscribe(res => {
       this.subsidiary = res.model as Subsidiary;

       const dialogRef = this.dialog.open(EditDialogoSubsidiaryComponent, {
           data: this.subsidiary
         });

       dialogRef.afterClosed().subscribe(result => {
           this.getListFk(null, this.route.snapshot.params.id);
       });

    });
  }

  viewSubsidiary(id: number) {
    this.apiService.get('/sucursales/' + id)
    .subscribe(res => {
       this.subsidiary = res.model as Subsidiary;
       const dialogRef = this.dialog.open(ViewDialogoSubsidiaryComponent, {
           data: this.subsidiary
         });
    });
  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Campo requerido' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

}
