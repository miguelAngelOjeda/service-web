import { Component, OnInit, Inject, ViewChild, NgZone, ElementRef  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { HttpParams } from '@angular/common/http';
import { FormGroup, FormArray , FormControl, FormBuilder,
   Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { UserService, ApiService, FormsService} from '../../../core/services';
import { ErrorStateMatcher} from '@angular/material/core';
import { PeopleService } from '../../shared/people';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {
    myForm: FormGroup;
    peopleForm: FormGroup;

    validateForm = true;
    isSeparacionBienes = true;

    constructor(
      private formBuilder: FormBuilder,
      private peopleService: PeopleService,
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
