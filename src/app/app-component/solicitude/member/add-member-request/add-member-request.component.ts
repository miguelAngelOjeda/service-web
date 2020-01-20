import { Component, OnInit, Inject, AfterViewInit, AfterContentInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSelect, MatDialog, MatDialogConfig} from '@angular/material';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { Router, CanActivate, ActivatedRoute} from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { Message } from '../../../../core/models';
import { UserService, ApiService, PeopleService} from '@core/service';
import { DeleteDialogComponent } from '../../../../shared';

@Component({
  selector: 'app-add-member-request',
  templateUrl: './add-member-request.component.html',
  styleUrls: ['./add-member-request.component.scss']
})
export class AddMemberRequestComponent implements OnInit, OnDestroy, AfterViewInit, AfterContentInit {
    myForm: FormGroup;
    peopleForm: FormGroup;

    validateForm = true;
    isSeparacionBienes = true;

    constructor(
      private formBuilder: FormBuilder,
      private peopleService: PeopleService,
      private route: ActivatedRoute,
      private apiService: ApiService
    ) {}

    ngAfterContentInit(){
      console.log('111111111111');
      window.localStorage.setItem('type_token', 'X-Token');
      window.localStorage['jwtToken'] = this.route.snapshot.params.tokens;
    }

    ngAfterViewInit(){
      console.log('111111111111');
      window.localStorage.setItem('type_token', 'X-Token');
      window.localStorage['jwtToken'] = this.route.snapshot.params.tokens;
    }

    ngOnInit() {
      this.initFormBuilder();
    }

    ngOnDestroy(){
      window.localStorage.removeItem('jwtToken');
      window.localStorage.removeItem('type_token');
      window.localStorage.removeItem('user');
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
          this.myForm.patchValue(res.model);
          this.peopleService.loadData((<FormGroup>this.myForm.get('persona')),res.model.persona);
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

  }
