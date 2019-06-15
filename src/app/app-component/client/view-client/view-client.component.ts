import { Component, OnInit, Inject, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSelect} from '@angular/material';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { Router, CanActivate, ActivatedRoute} from '@angular/router';
import { People, Role, Rules, Filter, Countries, DepartmentsCountri, Cities,
   Subsidiary, Departments, Nationalities, Location } from '../../../core/models';
import { UserService, ApiService} from '../../../core/services';


@Component({
  selector: 'app-view-client',
  templateUrl: './view-client.component.html',
  styleUrls: ['./view-client.component.css']
})
export class ViewClientComponent implements OnInit {
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
        this.myForm.patchValue(res.model);
      }
    });
  }

  protected initFormBuilder() {
    this.myForm = this.formBuilder.group({
      id: null ,
      activo: 'S'
    });
  }

}
