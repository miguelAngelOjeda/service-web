import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentsTypes } from '../../../../core/models';
import { ApiService } from '../../../../core/services';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-payments-types',
  templateUrl: './add-payments-types.component.html',
  styleUrls: ['./add-payments-types.component.scss']
})
export class AddPaymentsTypesComponent implements OnInit {

  public model: PaymentsTypes;
  formControl = new FormControl('', [
    Validators.required
  // Validators.email,
  ]);

  constructor(
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

  submit() {
    this.apiService.post('/tipos-pagos', this.model)
    .subscribe(res => {
      if(res.status == 200){
        this.model = res.model as PaymentsTypes;
      }
    });
  }

}
