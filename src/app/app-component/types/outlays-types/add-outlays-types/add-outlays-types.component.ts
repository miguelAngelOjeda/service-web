import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Message } from '../../../../core/models';
import { ApiService } from '@core/service';
import { DeleteDialogComponent } from '../../../../shared';
import { FormGroup, FormArray , FormControl, FormBuilder,
   Validators, NgForm, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-add-outlays-types',
  templateUrl: './add-outlays-types.component.html',
  styleUrls: ['./add-outlays-types.component.scss']
})
export class AddOutlaysTypesComponent implements OnInit {

  myForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.initFormBuilder();
  }

  onSubmit() {
    this.apiService.post('/tipos-desembolsos', this.myForm.value)
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
