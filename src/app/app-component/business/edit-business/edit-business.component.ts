import { Component, OnInit, ViewChild, ElementRef, NgZone, Injectable } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Business } from '../../../core/models';
import { ApiService, UserService } from '../../../core/services';
import {MatSnackBar} from '@angular/material';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { environment } from '../../../../environments/environment';
import * as $ from 'jquery';
import 'dropify';
declare var google: any;

@Component({
  selector: 'app-edit-business',
  templateUrl: './edit-business.component.html',
  styleUrls: ['./edit-business.component.css']
})
export class EditBusinessComponent implements OnInit {
  urlImage = environment.api_image_url;
  private model = new Business;
  public currentUser;
  private geoCoder;
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  imageUrl: string;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  formControl = new FormControl('', [Validators.required]);

  constructor(
    private snackBar: MatSnackBar,
    private apiService: ApiService,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    //Obtener datos del usuario
    this.userService.getUser().subscribe((data) => {
        this.currentUser = data;
    });

    this.apiService.get('/empresas/' + this.route.snapshot.params.id)
    .subscribe(res => {
       this.model = res.model as Business;
       (<any>$('.dropify-render img') ).attr('src',this.urlImage + this.currentUser.idEmpresa + '/Empresas/' + this.model.id);
       this.setCurrentLocation();
    });

    this.onInitDropify();
  }

  submit(form) {
    this.apiService.put('/empresas/' + this.route.snapshot.params.id, this.model)
    .subscribe(res => {
        //this.snackBarService.openSnackBar('res');
    });
  }

  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.model.avatar ={
          filename: file.name,
          filetype: file.type,
          value: reader.result.toString().split(',')[1]
        };
      };
    }
  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = this.model.latitud == null ? position.coords.latitude : this.model.latitud;
        this.longitude = this.model.longitud == null ? position.coords.longitude : this.model.longitud;
        this.zoom = 15;
        //this.getAddress(this.latitude, this.longitude);
      });
    }
  }


  markerDragEnd($event: MouseEvent) {
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.model.latitud = this.latitude;
    this.model.longitud = this.longitude;
    //this.getAddress(this.latitude, this.longitude);
  }

  onInitDropify() {
    (<any>$('.dropify') ).dropify({
        messages: {
                default: 'Arrastre un archivo o haga clic aquí',
                replace: 'Arrastre un archivo o haga clic en reemplazar',
                remove: 'Eliminar',
                error: 'Lo sentimos, el archivo demasiado grande'
        }
    });
  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Campo requerido' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }
}
