import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IngressTypes } from '../../../../core/models';
import { ApiService } from '../../../../core/services';
import { FormGroup, FormArray , FormControl, FormBuilder,
   Validators, NgForm, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-add-ingress-types',
  templateUrl: './add-ingress-types.component.html',
  styleUrls: ['./add-ingress-types.component.scss']
})
export class AddIngressTypesComponent implements OnInit {

  myForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.initFormBuilder();
  }


  onSubmit() {
    this.apiService.post('/tipos-ingresos', this.myForm.value)
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
