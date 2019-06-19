import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EgressTypes } from '../../../../core/models';
import { ApiService } from '../../../../core/services';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-view-egress-types',
  templateUrl: './view-egress-types.component.html',
  styleUrls: ['./view-egress-types.component.scss']
})
export class ViewEgressTypesComponent implements OnInit {


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

}
