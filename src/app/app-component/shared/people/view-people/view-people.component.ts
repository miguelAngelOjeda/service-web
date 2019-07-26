import { Component, OnInit, OnChanges, EventEmitter, Output, Input, ElementRef } from '@angular/core';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators, ControlContainer, FormGroupDirective} from '@angular/forms';
import { MatDialog, PageEvent, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';
import { UserService, ApiService, FormsService} from '../../../../core/services';

@Component({
  selector: 'app-view-people',
  templateUrl: './view-people.component.html',
  styleUrls: ['./view-people.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class ViewPeopleComponent implements OnInit{
  isSeparacionBienes = true;
  isRelationShip = false;
  peopleForm: FormGroup;
  form: FormGroup;

  @Output() documentValue = new EventEmitter<String>();

  @Output() rucValue = new EventEmitter<String>();

  @Input()
  set fkFilterModel(model: any) {
    if(model){

    }
  }

  @Input()
  set relationShip(model: any) {
    this.isRelationShip = true;
  }

  constructor(
    private controlContainer: ControlContainer,
    private parentF: FormGroupDirective,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    public dialog: MatDialog
  ) {}


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
      ruc: new FormControl(),
      fechaNacimiento: [null, [Validators.required]],
      tipoPersona: ['FISICA', [Validators.required]],
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
      tipoPersona: ['FISICA', [Validators.required]],
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

  // peopleCi() {
  //   this.documentValue.emit((<FormGroup>this.peopleForm.get('persona')).controls.documento.value);
  // }

  peopleRuc() {
    this.rucValue.emit((<FormGroup>this.peopleForm.get('persona')).controls.documento.value);
  }

}
