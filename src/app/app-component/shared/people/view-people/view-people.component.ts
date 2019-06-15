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
  isDisabled = false;
  peopleForm: FormGroup;
  form: FormGroup;
  @Output() documentValue = new EventEmitter<String>();
  @Output() rucValue = new EventEmitter<String>();
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
    this.onChanges();
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

  onChanges(){
    (<FormGroup>this.peopleForm.get('persona')).controls['tipoPersona'].valueChanges
    .subscribe(tipoPersona => {
        if (tipoPersona != 'FISICA') {
            (<FormGroup>this.peopleForm.get('persona')).controls['ruc'].setValidators([Validators.required]); // or clearValidators()
            (<FormGroup>this.peopleForm.get('persona')).controls['ruc'].updateValueAndValidity();
            (<FormGroup>this.peopleForm.get('persona')).controls['documento'].patchValue('value', { onlySelf: true });
            (<FormGroup>this.peopleForm.get('persona')).controls['documento'].reset();
            (<FormGroup>this.peopleForm.get('persona')).controls['documento'].disable();
            (<FormGroup>this.peopleForm.get('persona')).controls['primerApellido'].reset();
            (<FormGroup>this.peopleForm.get('persona')).controls['primerApellido'].disable();
            (<FormGroup>this.peopleForm.get('persona')).controls['primerApellido'].setValue('  ');
            (<FormGroup>this.peopleForm.get('persona')).controls['segundoApellido'].reset();
            (<FormGroup>this.peopleForm.get('persona')).controls['segundoApellido'].disable();
            (<FormGroup>this.peopleForm.get('persona')).controls['fechaNacimiento'].reset();
            (<FormGroup>this.peopleForm.get('persona')).controls['fechaNacimiento'].disable();
            (<FormGroup>this.peopleForm.get('persona')).controls['sexo'].reset();
            (<FormGroup>this.peopleForm.get('persona')).controls['sexo'].disable();
            (<FormGroup>this.peopleForm.get('persona')).controls['numeroHijos'].reset();
            (<FormGroup>this.peopleForm.get('persona')).controls['numeroHijos'].disable();
            (<FormGroup>this.peopleForm.get('persona')).controls['numeroDependientes'].reset();
            (<FormGroup>this.peopleForm.get('persona')).controls['numeroDependientes'].disable();
            (<FormGroup>this.peopleForm.get('persona')).controls['estadoCivil'].reset();
            (<FormGroup>this.peopleForm.get('persona')).controls['estadoCivil'].disable();
            (<FormGroup>this.peopleForm.get('persona')).controls['profesion'].reset();
            (<FormGroup>this.peopleForm.get('persona')).controls['profesion'].disable();
            this.isDisabled = true;
        }
        else {
            (<FormGroup>this.peopleForm.get('persona')).controls['ruc'].setValidators([]); // or clearValidators()
            (<FormGroup>this.peopleForm.get('persona')).controls['ruc'].updateValueAndValidity();
            (<FormGroup>this.peopleForm.get('persona')).controls['documento'].enable();
            (<FormGroup>this.peopleForm.get('persona')).controls['primerApellido'].enable();
            (<FormGroup>this.peopleForm.get('persona')).controls['segundoApellido'].enable();
            (<FormGroup>this.peopleForm.get('persona')).controls['fechaNacimiento'].enable();
            (<FormGroup>this.peopleForm.get('persona')).controls['sexo'].enable();
            (<FormGroup>this.peopleForm.get('persona')).controls['numeroHijos'].enable();
            (<FormGroup>this.peopleForm.get('persona')).controls['numeroDependientes'].enable();
            (<FormGroup>this.peopleForm.get('persona')).controls['estadoCivil'].enable();
            this.isDisabled = false;
        }
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

  // peopleCi() {
  //   this.documentValue.emit((<FormGroup>this.peopleForm.get('persona')).controls.documento.value);
  // }

  peopleRuc() {
    this.rucValue.emit((<FormGroup>this.peopleForm.get('persona')).controls.documento.value);
  }

}
