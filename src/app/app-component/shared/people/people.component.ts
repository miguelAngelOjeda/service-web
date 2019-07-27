import { Component, OnInit, OnChanges, EventEmitter, Output, Input, ElementRef } from '@angular/core';
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
export class PeopleComponent implements OnInit{
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
      barrio: null
    }));
    this.onChanges();
  }

  //Persona
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
      estadoCivil: ['CASADO/A', [Validators.required]],
      separacionBienes: null,
      email: [null, [Validators.required]],
      profesion: [null, [Validators.required]],
      telefonoParticular: [null, [Validators.required]],
      telefonoSecundario: null,
      direccionParticular: [null, [Validators.required]],
      direccionDetallada: '',
      observacion: '',
      activo: 'S',
      nacionalidad: [null, [Validators.required]],
      pais: [null, [Validators.required]],
      departamento: [null, [Validators.required]],
      ciudad: [null, [Validators.required]],
      barrio: null
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
        res.model.fechaNacimiento =  new Date(res.model.fechaNacimiento);
        (<FormGroup>this.peopleForm.get('persona')).patchValue(res.model);
      }
    });
  }

  protected loadData(response: any) {
    response.fechaNacimiento =  new Date(response.fechaNacimiento);
    (<FormGroup>this.peopleForm.get('persona')).patchValue(response);
    //Cargar Ocupaciones
    if(response.ocupaciones != null &&  response.ocupaciones.length > 0){
      const ocupaciones = (<FormArray>this.peopleForm.get('ocupaciones'));
      if(ocupaciones){
        while (ocupaciones.length) {
          ocupaciones.removeAt(0);
        }
      }

      response.ocupaciones.forEach(staff => {
        staff.fechaIngreso = new Date(staff.fechaIngreso);
        if(staff.fechaSalida){
          staff.fechaSalida = new Date(staff.fechaSalida);
        }
        ocupaciones.push(this.formBuilder.group(staff));
      });
    }

    //Cargar Referencias
    if(response.referencias != null && response.referencias.length > 0){
      const referencias = (<FormArray>this.peopleForm.get('referencias'));
      if(referencias){
        while (referencias.length) {
          referencias.removeAt(0);
        }
      }
      response.referencias.forEach(staff => {
        referencias.push(this.formBuilder.group(staff));
      });
    }

    //Cargar Inmuebles
    if(response.bienesInmuebles != null && response.bienesInmuebles.length > 0){
      const bienesInmuebles = (<FormArray>this.peopleForm.get('bienesInmuebles'));
      if(bienesInmuebles){
        while (bienesInmuebles.length) {
          bienesInmuebles.removeAt(0);
        }
      }
      response.bienesInmuebles.forEach(staff => {
        bienesInmuebles.push(this.formBuilder.group(staff));
      });
    }

    //Cargar Vehiculos
    if(response.bienesVehiculo != null && response.bienesVehiculo.length > 0){
      const bienesVehiculo = (<FormArray>this.peopleForm.get('bienesVehiculo'));
      if(bienesVehiculo){
        while (bienesVehiculo.length) {
          bienesVehiculo.removeAt(0);
        }
      }

      response.bienesVehiculo.forEach(staff => {
        bienesVehiculo.push(this.formBuilder.group(staff));
      });
    }

    //Cargar Ingresos
    if(response.ingresos != null && response.ingresos.length > 0){
      const ingresos = (<FormArray>this.peopleForm.get('ingresos'));
      if(ingresos){
        while (ingresos.length) {
          ingresos.removeAt(0);
        }
      }
      response.ingresos.forEach(staff => {
        ingresos.push(this.formBuilder.group(staff));
      });
    }

    //Cargar Egresos
    if(response.egresos != null && response.egresos.length > 0){
      const egresos = (<FormArray>this.peopleForm.get('egresos'));
      if(egresos){
        while (egresos.length) {
          egresos.removeAt(0);
        }
      }
      response.egresos.forEach(staff => {
        egresos.push(this.formBuilder.group(staff));
      });
    }
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
