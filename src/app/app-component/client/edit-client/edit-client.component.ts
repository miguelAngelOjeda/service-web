import { Component, OnInit, Inject, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSelect} from '@angular/material';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { Router, CanActivate, ActivatedRoute} from '@angular/router';
import { People, Role, Rules, Filter, Countries, DepartmentsCountri, Cities,
   Subsidiary, Departments, Nationalities, Location } from '../../../core/models';
import { UserService, ApiService} from '../../../core/services';


@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit{
  myForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initFormBuilder();
    this.apiService.get('/clientes/' + this.route.snapshot.params.id)
    .subscribe(res => {
      if(res.status == 200){
        res.model.persona.fechaNacimiento =  new Date(res.model.persona.fechaNacimiento);
        this.loadModel(res.model);
      }
    });
  }

  onSubmit() {
    console.log(this.myForm.value);
    if(this.myForm.value.persona.tipoPersona !== 'FISICA'){
      this.myForm.value.persona.documento = ' ';
      this.myForm.value.persona.fechaNacimiento = new Date();
      this.myForm.value.persona.primerApellido = ' ';
      this.myForm.value.persona.sexo = 'N';
    }

    this.apiService.post('/clientes', this.myForm.value)
    .subscribe(res => {

    });
  }

  protected initFormBuilder() {
    this.myForm = this.formBuilder.group({
      id: null ,
      activo: 'S'
    });
  }

  loadModel(model:any) {
    const ingresos = this.myForm.get('ingresos') as FormArray;
    const egresos = this.myForm.get('egresos') as FormArray;
    const bienesInmuebles = this.myForm.get('bienesInmuebles') as FormArray;
    const bienesVehiculo = this.myForm.get('bienesVehiculo') as FormArray;
    const ocupaciones = this.myForm.get('ocupaciones') as FormArray;
    const referencias = this.myForm.get('referencias') as FormArray;

    // empty form array
    while (ingresos.length) {
      ingresos.removeAt(0);
    }
    // empty form array
    while (egresos.length) {
      egresos.removeAt(0);
    }
    // empty form array
    while (bienesInmuebles.length) {
      bienesInmuebles.removeAt(0);
    }
    // empty form array
    while (bienesVehiculo.length) {
      bienesVehiculo.removeAt(0);
    }
    // empty form array
    while (ocupaciones.length) {
      ocupaciones.removeAt(0);
    }
    // empty form array
    while (referencias.length) {
      referencias.removeAt(0);
    }
    // use patchValue instead of setValue
    this.myForm.patchValue(model);
    // add form array values in a loop
    if(model.ingresos != null
        || model.ingresos.length > 0){
      model.ingresos.forEach(staff => ingresos.push(this.formBuilder.group(staff)));
    }
    // add form array values in a loop
    if(model.egresos != null
        || model.egresos.length > 0){
      model.egresos.forEach(staff => egresos.push(this.formBuilder.group(staff)));
    }
    // add form array values in a loop
    if(model.bienesInmuebles != null
        || model.bienesInmuebles.length > 0){
      model.bienesInmuebles.forEach(staff => bienesInmuebles.push(this.formBuilder.group(staff)));
    }
    // add form array values in a loop
    if(model.bienesVehiculo != null
        || model.bienesVehiculo.length > 0){
      model.bienesVehiculo.forEach(staff => bienesVehiculo.push(this.formBuilder.group(staff)));
    }
    // add form array values in a loop
    if(model.ocupaciones != null
        || model.ocupaciones.length > 0){
      model.ocupaciones.forEach(staff => ocupaciones.push(this.formBuilder.group(staff)));
    }
    // add form array values in a loop
    if(model.referencias != null
        || model.referencias.length > 0){
      model.referencias.forEach(staff => ocupaciones.push(this.formBuilder.group(staff)));
    }
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
}
