import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Message } from '../../../../core/models';
import { ApiService } from '@core/service';
import { FormGroup, FormArray , FormControl, FormBuilder,
   Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { DeleteDialogComponent } from '../../../../shared';

@Component({
  selector: 'app-add-exit-types',
  templateUrl: './add-exit-types.component.html',
  styleUrls: ['./add-exit-types.component.scss']
})
export class AddExitTypesComponent implements OnInit {
  myForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.initFormBuilder();
  }

  onSubmit() {
    this.apiService.post('/tipos-motivos-retiro', this.myForm.value)
    .subscribe(res => {
      if(res.status == 200){
        this.myForm.patchValue(res.model);
      }
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
