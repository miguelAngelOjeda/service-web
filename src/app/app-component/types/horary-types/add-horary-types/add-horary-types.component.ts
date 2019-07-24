import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentsTypes } from '../../../../core/models';
import { ApiService } from '../../../../core/services';
import { FormGroup, FormArray , FormControl, FormBuilder,
   Validators, NgForm, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-add-horary-types',
  templateUrl: './add-horary-types.component.html',
  styleUrls: ['./add-horary-types.component.scss']
})
export class AddHoraryTypesComponent implements OnInit {

  public model: PaymentsTypes;
  formControl = new FormControl('', [
    Validators.required
  // Validators.email,
  ]);

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {
    this.model = new PaymentsTypes();
   }

  ngOnInit() {
  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Campo requerido' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  onSubmit() {
    this.apiService.post('/tipos-estudios', this.model)
    .subscribe(res => {
      if(res.status == 200){
        this.model = res.model as PaymentsTypes;
      }
    });
  }

}
