import { Component, OnInit, OnChanges, EventEmitter, Output, Input, ElementRef } from '@angular/core';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators, ControlContainer, FormGroupDirective} from '@angular/forms';
import { MatDialog, PageEvent, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';
import { DeleteDialogComponent } from '../../../shared';
import { HttpParams } from '@angular/common/http';
import { Estate, Message, Location } from '../../../core/models';
import { EditModalPeopleComponent } from './edit-modal-people';
import { AddModalPeopleComponent } from './add-modal-people';
import { ViewModalPeopleComponent } from './view-modal-people';
import { UserService, ApiService, PeopleService, FormsService } from '@core/service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class PeopleComponent implements OnInit{
  params = new HttpParams({fromObject : {'included' : 'inmuebles,vehiculos,referencias,ingresos,egresos,ocupaciones,vinculos'}});
  isSeparacionBienes = true;
  isDisabled = false;
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
    private peopleService: PeopleService,
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
      email: [null],
      profesion: [null, [Validators.required]],
      telefonoParticular: [null, [Validators.required]],
      telefonoSecundario: null,
      direccionParticular: [null, [Validators.required]],
      direccionDetallada: null,
      observacion: null,
      latitud: '',
      longitud: '',
      activo: 'S',
      entidad: null,
      personaSolicitud: null,
      imagePath: null,
      nacionalidad: [null, [Validators.required]],
      pais: [null, [Validators.required]],
      departamento: [null, [Validators.required]],
      ciudad: [null, [Validators.required]],
      barrio: null
    }));
    this.onChanges();
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

    (<FormGroup>this.peopleForm.get('persona')).controls['fechaNacimiento'].valueChanges.subscribe(
        (fecha) => {
          if(fecha){
            (<FormControl>this.peopleForm.get('persona')).get('fechaNacimiento').setValue(new Date(fecha), {emitEvent:false});
          }
        }
    );
  }

  onKeydown(documento) {
    this.apiService.get('/personas/documento/' + documento, this.params)
    .subscribe(res => {
      if(res.status == 200){
        res.model.avatar = null;
        this.peopleService.loadData(<FormGroup>this.peopleForm.get('persona'),res.model);
      }
    });
  }

  peopleCi() {
    this.apiService.get('/personas/documento/' + (<FormGroup>this.peopleForm.get('persona')).controls.documento.value, this.params)
    .subscribe(res => {
      if(res.status == 200){
        res.model.avatar = null;
        this.peopleService.loadData(<FormGroup>this.peopleForm.get('persona'),res.model);
      }
    });
  }

  conyugeCi(data: any) {
    (<FormGroup>this.peopleForm.get('persona').get('conyuge')).reset();
    this.apiService.get('/personas/documento/' + data)
    .subscribe(res => {
      if(res.status == 200){
        res.model.fechaNacimiento =  new Date(res.model.fechaNacimiento);
        res.model.nombre = (res.model.primerNombre == null ? '' : res.model.primerNombre) + ' '
                            + (res.model.segundoNombre == null ? '' : res.model.segundoNombre) + ' '
                            + (res.model.primerApellido == null ? '' : res.model.primerApellido) + ' ' + (res.model.segundoApellido == null ? '' : res.model.segundoApellido);

        (<FormGroup>this.peopleForm.get('persona').get('conyuge')).patchValue(res.model);
      }
    });
  }

  // peopleCi() {
  //   this.documentValue.emit((<FormGroup>this.peopleForm.get('persona')).controls.documento.value);
  // }

  peopleRuc() {
    this.rucValue.emit((<FormGroup>this.peopleForm.get('persona')).controls.documento.value);
  }

  getValue(data: any, form : any): void {
    (<FormControl>this.peopleForm.controls['persona'].get(form)).setValue(data);
  }

  // Get Current Location Coordinates
  getAddress(location: Location): void {
    (<FormGroup>this.peopleForm.get('persona')).controls['latitud'].setValue(location.lat);
    (<FormGroup>this.peopleForm.get('persona')).controls['longitud'].setValue(location.lng);
    (<FormGroup>this.peopleForm.get('persona')).controls['direccionParticular'].setValue(location.address);
  }


}
