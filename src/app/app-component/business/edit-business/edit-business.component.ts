import { Component, OnInit, ViewChild, ElementRef, NgZone, Injectable } from '@angular/core';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators} from '@angular/forms';
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
  businessForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.initFormBuilder();
    this.apiService.get('/empresas/' + this.route.snapshot.params.id)
    .subscribe(res => {
      if(res.status == 200){
        res.model.avatar = null;
        (<FormGroup>this.businessForm).setValue(res.model);
      }
    });
  }

  onSubmit() {
    this.apiService.put('/empresas/' + this.route.snapshot.params.id, this.businessForm.value)
    .subscribe(res => {
        //this.snackBarService.openSnackBar('res');
    });
  }

  initFormBuilder() {
    this.businessForm = this.formBuilder.group({
      id: null,
      avatar: null ,
      descripcion: null,
      telefonoMovil: null,
      fax: null,
      observacion: null,
      activo: null,
      latitud: null,
      longitud: null,
      imagePath: null,
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(35)]],
      nombreFantasia: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(35)]],
      ruc: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(35)]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      email: ['', [Validators.required]],
      pais: [null, [Validators.required]],
      departamento: [null, [Validators.required]],
      ciudad: [null, [Validators.required]],
      barrio: null
    });
  }

  // Get Current Location Coordinates
  getAddress(location: Location): void {
    this.businessForm.controls['latitud'].setValue(location.lat);
    this.businessForm.controls['longitud'].setValue(location.lng);
    this.businessForm.controls['direccion'].setValue(location.address);
  }

  getValue(data: any, form : FormControl): void {
    form.setValue(data);
  }
}
