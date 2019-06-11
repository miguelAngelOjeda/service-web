import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OutlaysTypes } from '../../../core/models';
import { ApiService } from '../../../core/services';

@Component({
  selector: 'app-edit-outlays-types',
  templateUrl: './edit-outlays-types.component.html',
  styleUrls: ['./edit-outlays-types.component.scss']
})
export class EditOutlaysTypesComponent implements OnInit {

  public model: OutlaysTypes;

  formControl = new FormControl('', [
    Validators.required
  // Validators.email,
  ]);
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {
    this.model = new OutlaysTypes();
   }

  ngOnInit() {
    this.apiService.get('/tipos-desembolsos/' + this.route.snapshot.params.id)
    .subscribe(res => {
       this.model = res.model as OutlaysTypes;
    });

  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Campo requerido' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
    this.apiService.put('/tipos-desembolsos/' + this.route.snapshot.params.id, this.model)
    .subscribe(res => {
        //this.snackBarService.openSnackBar('res');
    });
  }

}
