import { Component, OnInit, ViewChild, ElementRef, NgZone, Injectable} from '@angular/core';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Business, Location } from '../../../core/models';
import { ApiService } from '../../../core/services';

@Component({
  selector: 'app-add-business',
  templateUrl: './add-business.component.html',
  styleUrls: ['./add-business.component.css']
})
export class AddBusinessComponent implements OnInit {
  businessForm: FormGroup;
  accept = 'png jpg jpeg';

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.initFormBuilder();
  }

  onSubmit() {
    this.apiService.post('/empresas', this.businessForm.value)
    .subscribe(res => {
      if(res.status == 200){

      }
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
