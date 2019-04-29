import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Business, Subsidiary } from '../../../core/models';
import { ApiService } from '../../../core/services';
import { ListSubsidiaryComponent } from '../../subsidiary/list-subsidiary';
import { AddDialogoSubsidiaryComponent } from './add-subsidiary';
import { EditDialogoSubsidiaryComponent } from './edit-subsidiary';
import { ViewDialogoSubsidiaryComponent } from './view-subsidiary';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { FormControl, Validators} from '@angular/forms';
import { MatPaginator, MatTableDataSource, MatDialog, MatSort, PageEvent,
   Sort, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import * as $ from 'jquery';
import 'dropify';
declare var google: any;

@Component({
  selector: 'app-view-business',
  templateUrl: './view-business.component.html',
  styleUrls: ['./view-business.component.css']
})
export class ViewBusinessComponent implements OnInit {
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;

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

  data: Business;
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
    this.data = new Business();
    this.subsidiary = new Subsidiary();
    this.apiService.get('/empresas/' + this.route.snapshot.params.id)
    .subscribe(res => {
       this.data = res.model as Business;
       this.setCurrentLocation();
    });
    (<any>$('.dropify') ).dropify({
        tpl: {
            wrap:            '<div class="dropify-wrapper"></div>',
            loader:          '<div class="dropify-loader"></div>',
            message:         '<div class="dropify-message"><span class="file-icon" /> <p>{{ default }}</p></div>',
            preview:         '<div class="dropify-preview"><span class="dropify-render"></span><div class="dropify-infos"><div class="dropify-infos-inner"><p class="dropify-infos-message">{{ replace }}</p></div></div></div>',
            filename:        '<p class="dropify-filename"><span class="file-icon"></span> <span class="dropify-filename-inner"></span></p>',
            clearButton:     '<button type="button" class="dropify-clear">{{ remove }}</button>',
            errorLine:       '<p class="dropify-error">{{ error }}</p>',
            errorsContainer: '<div class="dropify-errors-container"><ul></ul></div>'
        }
    });
  }

  ngOnInit() {
      //this.getListFk(null, this.route.snapshot.params.id);
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
      this.subsidiary.empresa = new Business();
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

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = this.data.latitud == null ? position.coords.latitude : this.data.latitud;
        this.longitude = this.data.longitud == null ? position.coords.longitude : this.data.longitud;
        this.zoom = 15;
        //this.getAddress(this.latitude, this.longitude);
      });
    }
  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Campo requerido' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

}
