import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CalculationTypes } from '../../../../core/models';
import { ApiService } from '../../../../core/services';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-calculation-types',
  templateUrl: './add-calculation-types.component.html',
  styleUrls: ['./add-calculation-types.component.scss']
})
export class AddCalculationTypesComponent implements OnInit {

  public model: CalculationTypes;
  formControl = new FormControl('', [
    Validators.required
  // Validators.email,
  ]);

  constructor(
    private apiService: ApiService
  ) {
    this.model = new CalculationTypes();
   }

  ngOnInit() {
  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Campo requerido' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
    this.apiService.post('/tipos-calculos', this.model)
    .subscribe(res => {
      if(res.status == 200){
        this.model = res.model as CalculationTypes;
      }
    });
  }

}
