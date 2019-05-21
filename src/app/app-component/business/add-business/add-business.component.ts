import { Component, OnInit, ViewChild, ElementRef, NgZone, Injectable } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Business } from '../../../core/models';
import { ApiService } from '../../../core/services';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import * as $ from 'jquery';
import 'dropify';
declare var google: any;

@Component({
  selector: 'app-add-business',
  templateUrl: './add-business.component.html',
  styleUrls: ['./add-business.component.css']
})
export class AddBusinessComponent implements OnInit {
  private model = new Business();
  url: string;
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;

  formControl = new FormControl('', [Validators.required]);

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private apiService: ApiService
  ) {
    this.model.avatar = {
      filename: null,
      filetype: null,
      value: null
    };
  }

  ngOnInit() {
    //load Places Autocomplete
    this.setCurrentLocation();
    this.onInitDropify();
    // this.mapsAPILoader.load().then(() => {
    //   this.setCurrentLocation();
    //   this.geoCoder = new google.maps.Geocoder;
    //
    //   let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
    //     types: ["address"]
    //   });
    //   autocomplete.addListener("place_changed", () => {
    //     this.ngZone.run(() => {
    //       //get the place result
    //       let place: google.maps.places.PlaceResult = autocomplete.getPlace();
    //
    //       //verify result
    //       if (place.geometry === undefined || place.geometry === null) {
    //         return;
    //       }
    //
    //       //set latitude, longitude and zoom
    //       this.latitude = place.geometry.location.lat();
    //       this.longitude = place.geometry.location.lng();
    //       this.zoom = 12;
    //     });
    //   });
    // });
  }

  submit(form) {
    this.apiService.post('/empresas', this.model)
    .subscribe(res => {
      if(res.status == 200){
        this.model = res.model as Business;
      }
    });
  }

  showpreview(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.model.avatar ={
          filename: file.name,
          filetype: file.type,
          url: reader.result,
          value: reader.result.toString().split(',')[1]
        };
      };
    }
  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
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

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }


  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Campo requerido' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
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

}
