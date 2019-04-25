import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subsidiary } from '../../../../core/models';
import { ApiService } from '../../../../core/services';
import { FormControl, Validators} from '@angular/forms';
import { MatPaginator, MatTableDataSource, MatDialog, MatSort, PageEvent,
   Sort, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-dialogo-subsidiary',
  templateUrl: './add-dialogo-subsidiary.component.html',
  styleUrls: ['./add-dialogo-subsidiary.component.css']
})
export class AddDialogoSubsidiaryComponent {

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

  model: Subsidiary;
  formControl = new FormControl('', [
    Validators.required
  // Validators.email,
  ]);

  constructor(
            //private viewEnterpriseComponent: ViewEnterpriseComponent,
            public dialogRef: MatDialogRef<AddDialogoSubsidiaryComponent>,
            private apiService: ApiService,
            @Inject(MAT_DIALOG_DATA) public data: Subsidiary) {
              this.model = data;

  }

  submit(form) {
    console.log(this.model);
    this.apiService.post('/sucursales', this.model)
    .subscribe(res => {
        this.model = res.model as Subsidiary;
        //this.snackBarService.openSnackBar('res');
    });
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
