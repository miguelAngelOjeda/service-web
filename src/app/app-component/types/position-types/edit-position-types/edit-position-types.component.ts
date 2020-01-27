import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray , FormControl, FormBuilder,
   Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Message } from '../../../../core/models';
import { DeleteDialogComponent } from '../../../../shared';
import { ApiService } from '@core/service';

@Component({
  selector: 'app-edit-position-types',
  templateUrl: './edit-position-types.component.html',
  styleUrls: ['./edit-position-types.component.scss']
})
export class EditPositionTypesComponent implements OnInit {
  myForm: FormGroup;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initFormBuilder();
    this.apiService.get('/tipos-cargos/' + this.route.snapshot.params.id)
    .subscribe(res => {
      if(res.status == 200){
        this.myForm.patchValue(res.model);
      }
    });
  }

  onSubmit() {
    this.apiService.put('/tipos-cargos/' + this.route.snapshot.params.id, this.myForm.value)
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
