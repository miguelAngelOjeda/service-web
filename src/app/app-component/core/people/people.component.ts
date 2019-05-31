import { Component, OnInit, EventEmitter, Output, Input, ElementRef } from '@angular/core';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators, ControlContainer, FormGroupDirective} from '@angular/forms';
import { MatDialog, PageEvent, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';
import { DeleteDialogComponent } from '../../../shared';
import { Estate, Message } from '../../../core/models';
import { UserService, ApiService, FormsService} from '../../../core/services';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class PeopleComponent implements OnInit {
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
      separacionBienes: '',
      email: [null, [Validators.required]],
      telefonoParticular: [null, [Validators.required]],
      telefonoSecundario: null,
      direccionParticular: [null, [Validators.required]],
      direccionDetallada: '',
      observacion: '',
      latitud: '',
      longitud: '',
      sucursal: '',
      activo: 'S',
      nacionalidad: [null, [Validators.required]],
      pais: [null, [Validators.required]],
      departamento: [null, [Validators.required]],
      ciudad: [null, [Validators.required]],
      barrio: '',
      conyuge: ""
    }));
    console.log(this.peopleForm.get('persona'));
  }

  //Egresos
  addFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: null ,
      avatar: null ,
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
      separacionBienes: '',
      email: [null, [Validators.required]],
      telefonoParticular: [null, [Validators.required]],
      telefonoSecundario: null,
      direccionParticular: [null, [Validators.required]],
      direccionDetallada: '',
      observacion: '',
      latitud: '',
      longitud: '',
      sucursal: '',
      activo: 'S',
      nacionalidad: [null, [Validators.required]],
      pais: [null, [Validators.required]],
      departamento: [null, [Validators.required]],
      ciudad: [null, [Validators.required]],
      barrio: '',
      conyuge: ""
    });
  }

  getValue(data: any, form : FormControl): void {
    form.setValue(data);
  }


}
