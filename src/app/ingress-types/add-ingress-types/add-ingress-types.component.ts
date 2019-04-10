import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IngressTypes } from '../../core/models';
import { ApiService } from '../../core/services';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-ingress-types',
  templateUrl: './add-ingress-types.component.html',
  styleUrls: ['./add-ingress-types.component.scss']
})
export class AddIngressTypesComponent implements OnInit {

  private model: IngressTypes;
  formControl = new FormControl('', [
    Validators.required
  // Validators.email,
  ]);

  constructor(
    private apiService: ApiService
  ) {
    this.model = new IngressTypes();
   }

  ngOnInit() {
  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Campo requerido' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit(form) {
    this.apiService.post('/tipos-ingresos', this.model)
    .subscribe(res => {
        this.model = res.model as IngressTypes;
        //this.snackBarService.openSnackBar('res');

    });
  }

}
