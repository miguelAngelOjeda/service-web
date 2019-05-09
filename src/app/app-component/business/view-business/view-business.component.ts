import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Business, Subsidiary, Departments, Message } from '../../../core/models';
import { ApiService, UserService } from '../../../core/services';
import { DeleteDialogComponent } from '../../../shared';
import { ListSubsidiaryComponent } from '../../subsidiary/list-subsidiary';
import { AddDialogoSubsidiaryComponent } from './add-subsidiary';
import { EditDialogoSubsidiaryComponent } from './edit-subsidiary';
import { ViewDialogoSubsidiaryComponent } from './view-subsidiary';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { MatPaginator, MatTableDataSource, MatDialog, MatSort, PageEvent,
   Sort, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';
import * as $ from 'jquery';
import 'dropify';
declare var google: any;

@Component({
  selector: 'app-view-business',
  templateUrl: './view-business.component.html',
  styleUrls: ['./view-business.component.css']
})
export class ViewBusinessComponent implements OnInit {
  urlImage = environment.api_image_url;
  subsidiarys: Array<Subsidiary> = [];
  data = new Business();
  subsidiary = new Subsidiary();
  latitude: number;
  longitude: number;
  zoom: number;
  private geoCoder;
  public currentUser;

  secondFormGroup: FormGroup;

  formControl = new FormControl('', [Validators.required]);

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.userService.getUser().subscribe((data) => {
        this.currentUser = data;
    });
    console.log(this.currentUser);
    this.apiService.get('/empresas/' + this.route.snapshot.params.id)
    .subscribe(res => {
       this.data = res.model as Business;
       this.setCurrentLocation();
    });
    this.getListSubsidiary();
  }


  public getListSubsidiary(){
    this.subsidiarys = [];
    this.apiService.getPageList('/empresas/'+this.route.snapshot.params.id+'/sucursales',false,"", 'desc', 'id', 1, 10, true)
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

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.subsidiary;
    //dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(AddDialogoSubsidiaryComponent,dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.getListSubsidiary();
        }
    });
  }

  editSubsidiary(id: number) {
    this.apiService.get('/sucursales/' + id)
    .subscribe(res => {
       this.subsidiary = res.model as Subsidiary;

       const dialogConfig = new MatDialogConfig();
       dialogConfig.data = this.subsidiary;
       //dialogConfig.disableClose = true;
       dialogConfig.autoFocus = true;

       const dialogRef = this.dialog.open(EditDialogoSubsidiaryComponent, dialogConfig);

       dialogRef.afterClosed().subscribe(result => {
          if(result){
            this.getListSubsidiary();
          }
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
    const message = new Message;
    message.titulo = "Eliminar Registro"
    message.texto = "Esta seguro que desea eliminar el registro " + data.nombre;

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = message;

    let dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);
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
