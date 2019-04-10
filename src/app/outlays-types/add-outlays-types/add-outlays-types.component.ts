import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OutlaysTypes } from '../../core/models';
import { ApiService } from '../../core/services';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-outlays-types',
  templateUrl: './add-outlays-types.component.html',
  styleUrls: ['./add-outlays-types.component.scss']
})
export class AddOutlaysTypesComponent implements OnInit {

  private model: OutlaysTypes;
  formControl = new FormControl('', [
    Validators.required
  // Validators.email,
  ]);

  constructor(
    private apiService: ApiService
  ) {
    this.model = new OutlaysTypes();
   }

  ngOnInit() {
  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Campo requerido' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit(form) {
    this.apiService.post('/tipos-desembolsos', this.model)
    .subscribe(res => {
        this.model = res.model as OutlaysTypes;
        //this.snackBarService.openSnackBar('res');

    });
  }

}
