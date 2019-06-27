import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RelationsTypes } from '../../../../core/models';
import { ApiService } from '../../../../core/services';

@Component({
  selector: 'app-edit-relations-types',
  templateUrl: './edit-relations-types.component.html',
  styleUrls: ['./edit-relations-types.component.scss']
})
export class EditRelationsTypesComponent implements OnInit {

  public model: RelationsTypes;

  formControl = new FormControl('', [
    Validators.required
  // Validators.email,
  ]);
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {
    this.model = new RelationsTypes();
   }

  ngOnInit() {
    this.apiService.get('/tipos-vinculos/' + this.route.snapshot.params.id)
    .subscribe(res => {
       this.model = res.model as RelationsTypes;
    });

  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Campo requerido' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
    this.apiService.put('/tipos-vinculos/' + this.route.snapshot.params.id, this.model)
    .subscribe(res => {
        //this.snackBarService.openSnackBar('res');
    });
  }

}
