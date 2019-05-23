import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators} from '@angular/forms';
import * as $ from 'jquery';
import 'dropify';

@Injectable()
export class FormsService {

  constructor(
    private formBuilder: FormBuilder
  ) {}

  peopleForms(): FormGroup{
    return this.formBuilder.group({
      id: null ,
      primerNombre: [null, [Validators.required]],
      segundoNombre: '',
      primerApellido: [null, [Validators.required]],
      segundoApellido: '',
      documento: [null, [Validators.required]],
      ruc: '',
      fechaNacimiento: [null, [Validators.required]],
      tipoPersona: [null, [Validators.required]],
      sexo: [null, [Validators.required]],
      numeroHijos: '',
      numeroDependientes: '',
      estadoCivil: [null, [Validators.required]],
      separacionBienes: [null, [Validators.required]],
      email: [null, [Validators.required]],
      telefonoParticular: [null, [Validators.required]],
      telefonoSecundario: null,
      direccionParticular: [null, [Validators.required]],
      direccionDetallada: '',
      observacion: '',
      latitud: '',
      longitud: '',
      sucursal: '',
      activo: '',
      nacionalidad: [null, [Validators.required]],
      pais: [null, [Validators.required]],
      departamento: [null, [Validators.required]],
      ciudad: [null, [Validators.required]],
      barrio: '',
      conyuge: ''
    });
  }

}
