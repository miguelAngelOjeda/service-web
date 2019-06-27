import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators} from '@angular/forms';
import { ApiService } from '../../../../core/services';

@Component({
  selector: 'app-add-modality-types',
  templateUrl: './add-modality-types.component.html',
  styleUrls: ['./add-modality-types.component.scss']
})
export class AddModalityTypesComponent implements OnInit {

  public modalityForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.initFormBuilder();
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
      tipoCalculos: ['', [Validators.required]]
    });
  }


  onSubmit() {
    this.apiService.post('/modalidades', this.modalityForm.value)
    .subscribe(res => {
      if(res.status == 200){

      }
    });
  }

  getValue(data: any, form : any): void {
    (<FormControl>this.modalityForm.get(form)).setValue(data);
  }

}
