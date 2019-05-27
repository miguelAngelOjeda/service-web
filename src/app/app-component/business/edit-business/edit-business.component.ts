import { Component, OnInit, ViewChild, ElementRef, NgZone, Injectable } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Business, Location } from '../../../core/models';
import { ApiService, UserService } from '../../../core/services';
import {MatSnackBar} from '@angular/material';
import { MapsAPILoader, MouseEvent } from '@agm/core';

@Component({
  selector: 'app-edit-business',
  templateUrl: './edit-business.component.html',
  styleUrls: ['./edit-business.component.css']
})
export class EditBusinessComponent implements OnInit {
  accept = 'png jpg jpeg';
  private model = new Business;
  public currentUser;

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
    });
  }

  submit(form) {
    this.apiService.put('/empresas/' + this.route.snapshot.params.id, this.model)
    .subscribe(res => {
        //this.snackBarService.openSnackBar('res');
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
