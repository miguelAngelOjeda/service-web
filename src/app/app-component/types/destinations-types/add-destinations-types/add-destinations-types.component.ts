import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DestinationsTypes } from '../../../../core/models';
import { ApiService } from '../../../../core/services';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-destinations-types',
  templateUrl: './add-destinations-types.component.html',
  styleUrls: ['./add-destinations-types.component.scss']
})
export class AddDestinationsTypesComponent implements OnInit {

  public model: DestinationsTypes;
  formControl = new FormControl('', [
    Validators.required
  // Validators.email,
  ]);

  constructor(
    private apiService: ApiService
  ) {
    this.model = new DestinationsTypes();
   }

  ngOnInit() {
  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Campo requerido' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
    this.apiService.post('/tipos-destinos', this.model)
    .subscribe(res => {
        this.model = res.model as DestinationsTypes;
        //this.snackBarService.openSnackBar('res');

    });
  }

}
