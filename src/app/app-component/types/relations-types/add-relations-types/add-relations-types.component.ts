import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RelationsTypes } from '../../../../core/models';
import { ApiService } from '../../../../core/services';
import { FormGroup, FormArray , FormControl, FormBuilder,
   Validators, NgForm, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-add-relations-types',
  templateUrl: './add-relations-types.component.html',
  styleUrls: ['./add-relations-types.component.scss']
})
export class AddRelationsTypesComponent implements OnInit {

  myForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.initFormBuilder();
  }

  onSubmit() {
    this.apiService.post('/tipos-vinculos', this.myForm.value)
    .subscribe(res => {


    });
  }

  protected initFormBuilder() {
    this.myForm = this.formBuilder.group({
      id: null ,
      nombre: [null, [Validators.required]],
      activo: 'S'
    });
  }

}
