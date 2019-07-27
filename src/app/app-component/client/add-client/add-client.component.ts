import { Component, OnInit, Inject, ViewChild, NgZone, ElementRef  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { HttpParams } from '@angular/common/http';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { UserService, ApiService, FormsService} from '../../../core/services';
import {ErrorStateMatcher} from '@angular/material/core';


@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {
    myForm: FormGroup;
    validateForm = true;
    isSeparacionBienes = true;

    constructor(
      private formBuilder: FormBuilder,
      private apiService: ApiService
    ) {}

    ngOnInit() {
      this.initFormBuilder();
    }

    onSubmit() {
      if(this.myForm.value.persona.tipoPersona !== 'FISICA'){
        this.myForm.value.persona.documento = ' ';
        this.myForm.value.persona.fechaNacimiento = new Date();
        this.myForm.value.persona.primerApellido = ' ';
        this.myForm.value.persona.estadoCivil = ' ';
        this.myForm.value.persona.sexo = 'N';
      }

      this.apiService.post('/clientes', this.myForm.value)
      .subscribe(res => {
        if(res.status == 200){
          this.loadData(res.model);
        }
      });
    }

    protected initFormBuilder() {
      this.myForm = this.formBuilder.group({
        id: null ,
        activo: 'S'
      });
    }

    // Get Current Location Coordinates
    getAddress(location: any): void {
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

    protected loadData(response: any) {
      response.persona.fechaNacimiento =  new Date(response.persona.fechaNacimiento);
      this.myForm.patchValue(response);
      //Cargar Ocupaciones
      if(response.persona.ocupaciones != null &&  response.persona.ocupaciones.length > 0){
        const ocupaciones = (<FormArray>this.myForm.get('ocupaciones'));
        if(ocupaciones){
          while (ocupaciones.length) {
            ocupaciones.removeAt(0);
          }
        }

        response.persona.ocupaciones.forEach(staff => {
          staff.fechaIngreso = new Date(staff.fechaIngreso);
          if(staff.fechaSalida){
            staff.fechaSalida = new Date(staff.fechaSalida);
          }
          ocupaciones.push(this.formBuilder.group(staff));
        });
      }

      //Cargar Referencias
      if(response.persona.referencias != null && response.persona.referencias.length > 0){
        const referencias = (<FormArray>this.myForm.get('referencias'));
        if(referencias){
          while (referencias.length) {
            referencias.removeAt(0);
          }
        }
        response.persona.referencias.forEach(staff => {
          referencias.push(this.formBuilder.group(staff));
        });
      }

      //Cargar Inmuebles
      if(response.persona.bienesInmuebles != null && response.persona.bienesInmuebles.length > 0){
        const bienesInmuebles = (<FormArray>this.myForm.get('bienesInmuebles'));
        if(bienesInmuebles){
          while (bienesInmuebles.length) {
            bienesInmuebles.removeAt(0);
          }
        }
        response.persona.bienesInmuebles.forEach(staff => {
          bienesInmuebles.push(this.formBuilder.group(staff));
        });
      }

      //Cargar Vehiculos
      if(response.persona.bienesVehiculo != null && response.persona.bienesVehiculo.length > 0){
        const bienesVehiculo = (<FormArray>this.myForm.get('bienesVehiculo'));
        if(bienesVehiculo){
          while (bienesVehiculo.length) {
            bienesVehiculo.removeAt(0);
          }
        }

        response.persona.bienesVehiculo.forEach(staff => {
          bienesVehiculo.push(this.formBuilder.group(staff));
        });
      }

      //Cargar Ingresos
      if(response.persona.ingresos != null && response.persona.ingresos.length > 0){
        const ingresos = (<FormArray>this.myForm.get('ingresos'));
        if(ingresos){
          while (ingresos.length) {
            ingresos.removeAt(0);
          }
        }
        response.persona.ingresos.forEach(staff => {
          ingresos.push(this.formBuilder.group(staff));
        });
      }

      //Cargar Egresos
      if(response.persona.egresos != null && response.persona.egresos.length > 0){
        const egresos = (<FormArray>this.myForm.get('egresos'));
        if(egresos){
          while (egresos.length) {
            egresos.removeAt(0);
          }
        }
        response.persona.egresos.forEach(staff => {
          egresos.push(this.formBuilder.group(staff));
        });
      }

    }

  }
