import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReferenceTypes } from '../../../core/models';
import { ApiService } from '../../../core/services';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-reference-types',
  templateUrl: './add-reference-types.component.html',
  styleUrls: ['./add-reference-types.component.scss']
})
export class AddReferenceTypesComponent implements OnInit {

  public model: ReferenceTypes;
  formControl = new FormControl('', [
    Validators.required
  // Validators.email,
  ]);

  constructor(
    private apiService: ApiService
  ) {
    this.model = new ReferenceTypes();
   }

  ngOnInit() {
  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Campo requerido' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
    this.apiService.post('/tipos-referencias', this.model)
    .subscribe(res => {
        this.model = res.model as ReferenceTypes;
        //this.snackBarService.openSnackBar('res');

    });
  }

}
