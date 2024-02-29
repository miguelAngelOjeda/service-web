import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentsTypes } from '../../../../core/models';
import { ApiService } from '../../../../core/services';
import { FormGroup, FormArray , FormControl, FormBuilder,
   Validators, NgForm, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-add-document-types',
  templateUrl: './add-document-types.component.html',
  styleUrls: ['./add-document-types.component.scss']
})
export class AddDocumentTypesComponent implements OnInit {
  myForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.initFormBuilder();
  }

  onSubmit() {
    this.apiService.post('/tipos-documentos', this.myForm.value)
    .subscribe(res => {
      if(res.status == 200){

      }
    });
  }

  protected initFormBuilder() {
    this.myForm = this.formBuilder.group({
      id: null ,
      nombre: [null, [Validators.required]],
      descripcion: [null],
      codigo: ' ',
      activo: 'S',
      tipificar: false,
      vence: false,
      validezDias: 999999
    });
  }

}
