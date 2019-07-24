import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray , FormControl, FormBuilder,
   Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IngressTypes } from '../../../../core/models';
import { ApiService } from '../../../../core/services';

@Component({
  selector: 'app-edit-ingress-types',
  templateUrl: './edit-ingress-types.component.html',
  styleUrls: ['./edit-ingress-types.component.scss']
})
export class EditIngressTypesComponent implements OnInit {

  myForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initFormBuilder();
    this.apiService.get('/tipos-ingresos/' + this.route.snapshot.params.id)
    .subscribe(res => {
      if(res.status == 200){
        this.myForm.patchValue(res.model);
      }
    });

  }

  onSubmit() {
    this.apiService.put('/tipos-ingresos/' + this.route.snapshot.params.id, this.myForm.value)
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
