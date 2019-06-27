import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DestinationsTypes } from '../../../../core/models';
import { ApiService } from '../../../../core/services';

@Component({
  selector: 'app-edit-destinations-types',
  templateUrl: './edit-destinations-types.component.html',
  styleUrls: ['./edit-destinations-types.component.scss']
})
export class EditDestinationsTypesComponent implements OnInit {

  public model: DestinationsTypes;

  formControl = new FormControl('', [
    Validators.required
  // Validators.email,
  ]);
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {
    this.model = new DestinationsTypes();
   }

  ngOnInit() {
    this.apiService.get('/tipos-destinos/' + this.route.snapshot.params.id)
    .subscribe(res => {
       this.model = res.model as DestinationsTypes;
    });

  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Campo requerido' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
    this.apiService.put('/tipos-destinos/' + this.route.snapshot.params.id, this.model)
    .subscribe(res => {
        //this.snackBarService.openSnackBar('res');
    });
  }

}
