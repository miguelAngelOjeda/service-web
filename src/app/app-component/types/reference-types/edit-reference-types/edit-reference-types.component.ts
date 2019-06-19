import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ReferenceTypes } from '../../../../core/models';
import { ApiService } from '../../../../core/services';

@Component({
  selector: 'app-edit-reference-types',
  templateUrl: './edit-reference-types.component.html',
  styleUrls: ['./edit-reference-types.component.scss']
})
export class EditReferenceTypesComponent implements OnInit {

  public model: ReferenceTypes;

  formControl = new FormControl('', [
    Validators.required
  // Validators.email,
  ]);
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {
    this.model = new ReferenceTypes();
   }

  ngOnInit() {
    this.apiService.get('/tipos-referencias/' + this.route.snapshot.params.id)
    .subscribe(res => {
       this.model = res.model as ReferenceTypes;
    });

  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Campo requerido' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
    this.apiService.put('/tipos-referencias/' + this.route.snapshot.params.id, this.model)
    .subscribe(res => {
        //this.snackBarService.openSnackBar('res');
    });
  }

}
