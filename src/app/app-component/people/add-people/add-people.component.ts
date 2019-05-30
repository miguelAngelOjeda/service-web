import { Component, OnInit, Inject, ViewChild, NgZone, ElementRef  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { UserService, ApiService, FormsService} from '../../../core/services';
import { People, Role, Rules, Filter, Countries, DepartmentsCountri, Cities,
   Subsidiary, Departments, Nationalities, Location } from '../../../core/models';
import {merge, fromEvent,ReplaySubject, Subject, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap, filter, take, takeUntil} from 'rxjs/operators';
import {ErrorStateMatcher} from '@angular/material/core';
import * as $ from 'jquery';
import 'dropify';


@Component({
  selector: 'app-add-people',
  templateUrl: './add-people.component.html',
  styleUrls: ['./add-people.component.scss']
})
export class AddPeopleComponent implements OnInit {
    myForm: FormGroup;
    validateForm = true;
    private model = new People();
    //disableSelectDepartment = new FormControl(true);
    protected countries: Array<Countries> = [];
    isSeparacionBienes = true;
    hide = true;
    //Filter
    isfilter = false;

    /** list of DepartmentsCountri */
    protected departmentsCountri: Array<DepartmentsCountri> = [];
    @ViewChild('filterInputDepartmentsCountri') filterInputDepartmentsCountri: ElementRef;
    /** list of DepartmentsCountri */
    protected cities: Array<Cities> = [];
    @ViewChild('filterInputCities') filterInputCities: ElementRef;
    protected departments: Array<Departments> = [];

    formControl = new FormControl('', [Validators.required]);

    constructor(
      private formBuilder: FormBuilder,
      private ngZone: NgZone,
      private apiService: ApiService,
      private formsService: FormsService
    ) {
      this.model.conyuge = new People;
    }

    ngOnInit() {
      this.initFormBuilder();
    }

    onSubmit() {
      console.log(this.myForm.value);
      console.log(this.myForm);

    }

    protected initFormBuilder() {
      this.myForm = this.formBuilder.group({
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



    //Referencias
    addReferenciasFormGroup(): FormGroup {
      return this.formBuilder.group({
        id: [''],
        nombreContacto: ['', Validators.required],
        telefonoCelular : ['', Validators.required],
        telefono: [''],
        tipoReferencia : ['', Validators.required],
        activo: ['S']
      });
    }

    addButtonReferencias(): void {
      (<FormArray>this.myForm.get('referencias')).push(this.addReferenciasFormGroup());
    }

    deleteReferencias(data: any){
        (<FormArray>this.myForm.get('referencias')).removeAt(this.myForm.get('referencias').value.findIndex(dep => dep === data))
    }

    onClickSepaBienes($event){
      this.myForm.addControl('conyuge', this.peopleForms());
      console.log(this.myForm.get('separacionBienes').value);
      console.log(this.myForm.get('conyuge'));
    }

    getErrorMessage() {
      return this.formControl.hasError('required') ? 'Campo requerido' :
        this.formControl.hasError('email') ? 'Not a valid email' :
          '';
    }

    // Get Current Location Coordinates
    getAddress(location: Location): void {
      this.myForm.controls['latitud'].setValue(location.lat);
      this.myForm.controls['longitud'].setValue(location.lng);
      this.myForm.controls['direccionParticular'].setValue(location.address);
    }

    getAvatar(avatar: any): void {
      this.myForm.controls['avatar'].setValue(avatar);
    }

    getValue(data: any, form : FormControl): void {
      form.setValue(data);
    }

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
        activo: '',
        nacionalidad: [null, [Validators.required]],
        pais: [null, [Validators.required]],
        departamento: [null, [Validators.required]],
        ciudad: [null, [Validators.required]],
        barrio: ''
      });
    }


  }
