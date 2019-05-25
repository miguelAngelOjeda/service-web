import { Component, OnInit, ViewChild, ElementRef, NgZone, Injectable} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Business, Location } from '../../../core/models';
import { ApiService } from '../../../core/services';
import * as $ from 'jquery';
import 'dropify';

@Component({
  selector: 'app-add-business',
  templateUrl: './add-business.component.html',
  styleUrls: ['./add-business.component.css']
})
export class AddBusinessComponent implements OnInit {
  private model = new Business();
  url: string;
  formControl = new FormControl('', [Validators.required]);

  constructor(
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
    this.onInitDropify();
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
  getAddress(location: Location): void {
    this.model.latitud = location.lat;
    this.model.longitud = location.lng;
    this.model.direccion = location.address;
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
