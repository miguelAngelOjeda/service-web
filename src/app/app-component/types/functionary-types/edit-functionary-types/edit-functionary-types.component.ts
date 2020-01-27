import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray , FormControl, FormBuilder,
   Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Message } from '../../../../core/models';
import { ApiService } from '@core/service';
import { DeleteDialogComponent } from '../../../../shared';

@Component({
  selector: 'app-edit-functionary-types',
  templateUrl: './edit-functionary-types.component.html',
  styleUrls: ['./edit-functionary-types.component.scss']
})
export class EditFunctionaryTypesComponent implements OnInit {

  myForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initFormBuilder();
    this.apiService.get('/tipos-funcionarios/' + this.route.snapshot.params.id)
    .subscribe(res => {
      if(res.status == 200){
        this.myForm.patchValue(res.model);
      }
    });

  }

  onSubmit() {
    this.apiService.put('/tipos-funcionarios/' + this.route.snapshot.params.id, this.myForm.value)
    .subscribe(res => {
        //this.snackBarService.openSnackBar('res');
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
