import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PaymentsTypes } from '../../../../core/models';
import { ApiService } from '../../../../core/services';

@Component({
  selector: 'app-edit-horary-types',
  templateUrl: './edit-horary-types.component.html',
  styleUrls: ['./edit-horary-types.component.scss']
})
export class EditHoraryTypesComponent implements OnInit {

  public model: PaymentsTypes;

  formControl = new FormControl('', [
    Validators.required
  // Validators.email,
  ]);
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {
    this.model = new PaymentsTypes();
   }

  ngOnInit() {
    this.apiService.get('/tipos-estudios/' + this.route.snapshot.params.id)
    .subscribe(res => {
       this.model = res.model as PaymentsTypes;
    });

  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Campo requerido' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
    this.apiService.put('/tipos-estudios/' + this.route.snapshot.params.id, this.model)
    .subscribe(res => {
        //this.snackBarService.openSnackBar('res');
    });
  }

}
