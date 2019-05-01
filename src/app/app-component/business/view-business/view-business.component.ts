import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Business, Subsidiary, Departments } from '../../../core/models';
import { ApiService } from '../../../core/services';
import { DialogComponent } from '../../../shared';
import { ListSubsidiaryComponent } from '../../subsidiary/list-subsidiary';
import { AddDialogoSubsidiaryComponent } from './add-subsidiary';
import { EditDialogoSubsidiaryComponent } from './edit-subsidiary';
import { ViewDialogoSubsidiaryComponent } from './view-subsidiary';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { MatPaginator, MatTableDataSource, MatDialog, MatSort, PageEvent,
   Sort, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';
import * as $ from 'jquery';
import 'dropify';
declare var google: any;
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-view-business',
  templateUrl: './view-business.component.html',
  styleUrls: ['./view-business.component.css']
})
export class ViewBusinessComponent implements OnInit {
  subsidiarys: Array<Subsidiary> = [];
  data: Business;
  subsidiary: Subsidiary;
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  color: string = '#f6f6f9';
  private geoCoder;

  secondFormGroup: FormGroup;

  formControl = new FormControl('', [
    Validators.required
  // Validators.email,
  ]);

  constructor(
    public dialog: MatDialog,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private _formBuilder: FormBuilder
  ) {
    this.data = new Business();
    this.subsidiary = new Subsidiary();
  }

  ngOnInit() {
    this.apiService.get('/empresas/' + this.route.snapshot.params.id)
    .subscribe(res => {
       this.data = res.model as Business;
       this.setCurrentLocation();
    });
    this.getListSubsidiary();
  }


  public getListSubsidiary(){
    this.subsidiarys = [];
    this.apiService.getPageList('/empresas/'+this.route.snapshot.params.id+'/sucursales',false, 'desc', 'id', 1, 10, true)
    .subscribe(res => {
        if(res.records > 0){
          this.subsidiarys = res.rows;
         //  res.rows.forEach(obj=> {
         //    this.subsidiarys.push(obj);
         // });
        }
    });

  }

  addSubsidiary() {
    this.subsidiary = new Subsidiary;
    this.subsidiary.empresa = this.data;
    const dialogRef = this.dialog.open(AddDialogoSubsidiaryComponent, {
        data: this.subsidiary
      });
      dialogRef.afterClosed().subscribe(result => {
          this.getListSubsidiary();
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
           this.getListSubsidiary();
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

  deleteSubsidiary(data: Subsidiary) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = "eliminar  la Sucursal " +data.nombre;
    let dialogRef = this.dialog.open(DialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.apiService.delete('/sucursales/' + data.id)
        .subscribe(res => {
          this.getListSubsidiary();
        });
      }
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
