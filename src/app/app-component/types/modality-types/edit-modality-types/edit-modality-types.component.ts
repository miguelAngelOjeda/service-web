import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CalculationTypes } from '../../../../core/models';
import { ApiService } from '../../../../core/services';

@Component({
  selector: 'app-edit-modality-types',
  templateUrl: './edit-modality-types.component.html',
  styleUrls: ['./edit-modality-types.component.scss']
})
export class EditModalityTypesComponent implements OnInit {

  public model: CalculationTypes;

  formControl = new FormControl('', [
    Validators.required
  // Validators.email,
  ]);
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {
    this.model = new CalculationTypes();
   }

  ngOnInit() {
    this.apiService.get('/tipos-calculos/' + this.route.snapshot.params.id)
    .subscribe(res => {
       this.model = res.model as CalculationTypes;
    });

  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Campo requerido' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
    this.apiService.put('/tipos-calculos/' + this.route.snapshot.params.id, this.model)
    .subscribe(res => {
        //this.snackBarService.openSnackBar('res');
    });
  }

}
