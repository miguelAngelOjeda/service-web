import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IngressTypes } from '../../../core/models';
import { ApiService } from '../../../core/services';

@Component({
  selector: 'app-edit-ingress-types',
  templateUrl: './edit-ingress-types.component.html',
  styleUrls: ['./edit-ingress-types.component.scss']
})
export class EditIngressTypesComponent implements OnInit {

  private model: IngressTypes;

  formControl = new FormControl('', [
    Validators.required
  // Validators.email,
  ]);
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {
    this.model = new IngressTypes();
   }

  ngOnInit() {
    this.apiService.get('/tipos-ingresos/' + this.route.snapshot.params.id)
    .subscribe(res => {
       this.model = res.model as IngressTypes;
    });

  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Campo requerido' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit(form) {
    this.apiService.put('/tipos-ingresos/' + this.route.snapshot.params.id, this.model)
    .subscribe(res => {
        //this.snackBarService.openSnackBar('res');
    });
  }

}
