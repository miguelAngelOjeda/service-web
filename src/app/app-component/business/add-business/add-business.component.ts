import { Component, OnInit, ViewChild, ElementRef, NgZone, Injectable} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Business, Location } from '../../../core/models';
import { ApiService } from '../../../core/services';

@Component({
  selector: 'app-add-business',
  templateUrl: './add-business.component.html',
  styleUrls: ['./add-business.component.css']
})
export class AddBusinessComponent implements OnInit {
  accept = 'png jpg jpeg';
  private model = new Business();
  url: string;
  formControl = new FormControl('', [Validators.required]);

  constructor(
    private apiService: ApiService
  ) {}

  ngOnInit() {
  }

  submit(form) {
    this.apiService.post('/empresas', this.model)
    .subscribe(res => {
      if(res.status == 200){
        this.model = res.model as Business;
      }
    });
  }

  // Get Current Location Coordinates
  getAddress(location: Location): void {
    this.model.latitud = location.lat;
    this.model.longitud = location.lng;
    this.model.direccion = location.address;
  }

  getAvatar(avatar: any): void {
    this.model.avatar = avatar;
  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Campo requerido' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

}
