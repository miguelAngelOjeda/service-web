import { Component, OnInit, EventEmitter, Output, Input, ElementRef } from '@angular/core';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators, ControlContainer, FormGroupDirective} from '@angular/forms';
import { MatDialog, PageEvent, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';
import { DeleteDialogComponent } from '../../../shared';
import { Estate, Message, Location } from '../../../core/models';
import { UserService, ApiService, FormsService} from '../../../core/services';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class PeopleComponent implements OnInit {
  isSeparacionBienes = true;
  peopleForm: FormGroup;
  form: FormGroup;
  @Input() urlFilter;
  @Input()
  set fkFilterModel(model: any) {
    if(model){

    }
  }

  constructor(
    private controlContainer: ControlContainer,
    private parentF: FormGroupDirective,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    public dialog: MatDialog
  ) {

   }

  ngOnInit() {
    this.peopleForm = this.parentF.form;
    this.peopleForm.addControl('persona', this.formBuilder.group({
      id: null ,
      avatar: null ,
      primerNombre: [null, [Validators.required]],
      segundoNombre: null,
      primerApellido: [null, [Validators.required]],
      segundoApellido: null,
      documento: [null, [Validators.required]],
      ruc: null,
      fechaNacimiento: [null, [Validators.required]],
      tipoPersona: [null, [Validators.required]],
      sexo: [null, [Validators.required]],
      numeroHijos: null,
      numeroDependientes: null,
      estadoCivil: [null, [Validators.required]],
      separacionBienes: null,
      email: [null, [Validators.required]],
      profesion: [null, [Validators.required]],
      telefonoParticular: [null, [Validators.required]],
      telefonoSecundario: null,
      direccionParticular: [null, [Validators.required]],
      direccionDetallada: null,
      observacion: null,
      latitud: '',
      longitud: '',
      activo: 'S',
      imagePath: null,
      nacionalidad: [null, [Validators.required]],
      pais: [null, [Validators.required]],
      departamento: [null, [Validators.required]],
      ciudad: [null, [Validators.required]],
      barrio: null,
      conyuge: null
    }));
  }

  //Egresos
  addFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: null ,
      avatar: null ,
      primerNombre: [null, [Validators.required]],
      segundoNombre: null,
      primerApellido: [null, [Validators.required]],
      segundoApellido: null,
      documento: [null, [Validators.required]],
      ruc: null,
      fechaNacimiento: [null, [Validators.required]],
      tipoPersona: [null, [Validators.required]],
      sexo: [null, [Validators.required]],
      numeroHijos: null,
      numeroDependientes: null,
      estadoCivil: [null, [Validators.required]],
      separacionBienes: null,
      email: [null, [Validators.required]],
      telefonoParticular: [null, [Validators.required]],
      telefonoSecundario: null,
      direccionParticular: [null, [Validators.required]],
      direccionDetallada: '',
      observacion: '',
      latitud: null,
      longitud: null,
      activo: 'S',
      nacionalidad: [null, [Validators.required]],
      pais: [null, [Validators.required]],
      departamento: [null, [Validators.required]],
      ciudad: [null, [Validators.required]],
      barrio: null,
      conyuge: null
    });
  }

  peopleCi() {
    this.apiService.get('/personas/documento/' + (<FormGroup>this.peopleForm.get('persona')).controls.documento.value)
    .subscribe(res => {
      if(res.status == 200){
        res.model.avatar = null;
        res.model.conyuge = null;
        res.model.fechaNacimiento =  new Date(res.model.fechaNacimiento);
        (<FormGroup>this.peopleForm.get('persona')).setValue(res.model);
      }
    });
  }

  getValue(data: any, form : FormControl): void {
    form.setValue(data);
  }

  // Get Current Location Coordinates
  getAddress(location: Location): void {
    (<FormGroup>this.peopleForm.get('persona')).controls['latitud'].setValue(location.lat);
    (<FormGroup>this.peopleForm.get('persona')).controls['longitud'].setValue(location.lng);
    (<FormGroup>this.peopleForm.get('persona')).controls['direccionParticular'].setValue(location.address);
  }


}
