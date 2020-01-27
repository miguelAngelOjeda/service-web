import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray , FormControl, FormBuilder,
   Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DeleteDialogComponent } from '../../../../shared';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../../../../core/models';
import { ApiService } from '@core/service';

@Component({
  selector: 'app-edit-tryst-types',
  templateUrl: './edit-tryst-types.component.html',
  styleUrls: ['./edit-tryst-types.component.scss']
})
export class EditTrystTypesComponent implements OnInit {

  myForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initFormBuilder();
    this.apiService.get('/tipos-citas/' + this.route.snapshot.params.id)
    .subscribe(res => {
      if(res.status == 200){
        this.myForm.patchValue(res.model);
      }
    });

  }

  onSubmit() {
    this.apiService.put('/tipos-citas/' + this.route.snapshot.params.id, this.myForm.value)
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
