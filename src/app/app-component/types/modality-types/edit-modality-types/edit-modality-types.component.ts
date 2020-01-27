import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray , FormControl, FormBuilder,
   Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Message } from '../../../../core/models';
import { ApiService } from '@core/service';
import { DeleteDialogComponent } from '../../../../shared';

@Component({
  selector: 'app-edit-modality-types',
  templateUrl: './edit-modality-types.component.html',
  styleUrls: ['./edit-modality-types.component.scss']
})
export class EditModalityTypesComponent implements OnInit {

  public modalityForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.initFormBuilder();
    this.apiService.get('/modalidades/' + this.route.snapshot.params.id)
    .subscribe(res => {
      if(res.status == 200){
        (<FormGroup>this.modalityForm).patchValue(res.model);
      }
    });

  }

  initFormBuilder() {
    this.modalityForm = this.formBuilder.group({
      id: null,
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(35)]],
      codigo: [' '],
      descripcion: null,
      montoMaximo: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(35)]],
      montoMinimo: ['', [Validators.required]],
      interes: [0.0, [Validators.required]],
      tipoCalculos: ['', [Validators.required]],
      periodoCapital: ['', [Validators.required]],
      periodoGracia: ['', [Validators.required]],
      vencimientoInteres: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.apiService.put('/modalidades/' + this.route.snapshot.params.id, this.modalityForm.value)
    .subscribe(res => {
        //this.snackBarService.openSnackBar('res');
    });
  }

  getValue(data: any, form : any): void {
    (<FormControl>this.modalityForm.get(form)).setValue(data);
  }

}
