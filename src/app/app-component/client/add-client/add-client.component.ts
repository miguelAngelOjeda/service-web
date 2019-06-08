import { Component, OnInit, Inject, ViewChild, NgZone, ElementRef  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { UserService, ApiService, FormsService} from '../../../core/services';
import { People, Role, Rules, Filter, Countries, DepartmentsCountri, Cities,
   Subsidiary, Departments, Nationalities, Location } from '../../../core/models';
import {merge, fromEvent,ReplaySubject, Subject, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap, filter, take, takeUntil} from 'rxjs/operators';
import {ErrorStateMatcher} from '@angular/material/core';


@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {
    myForm: FormGroup;
    validateForm = true;
    private model = new People();
    isSeparacionBienes = true;
    hide = true;
    //Filter
    isfilter = false;

    constructor(
      private formBuilder: FormBuilder,
      private apiService: ApiService
    ) {
      this.model.conyuge = new People;
    }

    ngOnInit() {
      this.initFormBuilder();
    }

    onSubmit() {
      console.log(this.myForm.value);
      console.log(this.myForm);
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
