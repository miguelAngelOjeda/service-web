import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EgressTypes } from '../../../../core/models';
import { ApiService } from '../../../../core/services';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-egress-types',
  templateUrl: './add-egress-types.component.html',
  styleUrls: ['./add-egress-types.component.scss']
})
export class AddEgressTypesComponent implements OnInit {

  public model: EgressTypes;
  formControl = new FormControl('', [
    Validators.required
  // Validators.email,
  ]);

  constructor(
    private apiService: ApiService
  ) {
    this.model = new EgressTypes();
   }

  ngOnInit() {
  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Campo requerido' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
    this.apiService.post('/tipos-egresos', this.model)
    .subscribe(res => {
      if(res.status == 200){
        this.model = res.model as EgressTypes;
      }
    });
  }

}
