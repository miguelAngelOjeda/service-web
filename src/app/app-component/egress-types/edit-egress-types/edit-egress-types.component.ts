import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EgressTypes } from '../../../core/models';
import { ApiService } from '../../../core/services';

@Component({
  selector: 'app-edit-egress-types',
  templateUrl: './edit-egress-types.component.html',
  styleUrls: ['./edit-egress-types.component.scss']
})
export class EditEgressTypesComponent implements OnInit {

  public model: EgressTypes;

  formControl = new FormControl('', [
    Validators.required
  // Validators.email,
  ]);
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {
    this.model = new EgressTypes();
   }

  ngOnInit() {
    this.apiService.get('/tipos-egresos/' + this.route.snapshot.params.id)
    .subscribe(res => {
       this.model = res.model as EgressTypes;
    });

  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Campo requerido' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
    this.apiService.put('/tipos-egresos/' + this.route.snapshot.params.id, this.model)
    .subscribe(res => {
        //this.snackBarService.openSnackBar('res');
    });
  }

}
