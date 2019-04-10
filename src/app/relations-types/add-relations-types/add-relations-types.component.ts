import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RelationsTypes } from '../../core/models';
import { ApiService } from '../../core/services';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-relations-types',
  templateUrl: './add-relations-types.component.html',
  styleUrls: ['./add-relations-types.component.scss']
})
export class AddRelationsTypesComponent implements OnInit {

  private model: RelationsTypes;
  formControl = new FormControl('', [
    Validators.required
  // Validators.email,
  ]);

  constructor(
    private apiService: ApiService
  ) {
    this.model = new RelationsTypes();
   }

  ngOnInit() {
  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Campo requerido' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit(form) {
    this.apiService.post('/tipos-vinculos', this.model)
    .subscribe(res => {
        this.model = res.model as RelationsTypes;
        //this.snackBarService.openSnackBar('res');

    });
  }

}
