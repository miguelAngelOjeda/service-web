import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Message } from '../../../../core/models';
import { DeleteDialogComponent } from '../../../../shared';
import { ApiService } from '@core/service';
import { FormGroup, FormArray , FormControl, FormBuilder,
   Validators, NgForm, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-add-tryst-types',
  templateUrl: './add-tryst-types.component.html',
  styleUrls: ['./add-tryst-types.component.scss']
})
export class AddTrystTypesComponent implements OnInit {

  myForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.initFormBuilder();
  }

  onSubmit() {
    this.apiService.post('/tipos-citas', this.myForm.value)
    .subscribe(res => {


    });
  }

  protected initFormBuilder() {
    this.myForm = this.formBuilder.group({
      id: null ,
      nombre: [null, [Validators.required]],
      descripcion: [null],
      codigo: ' ',
      activo: 'S'
    });
  }

}
