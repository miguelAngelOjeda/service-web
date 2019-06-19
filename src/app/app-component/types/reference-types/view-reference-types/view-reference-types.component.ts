import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReferenceTypes } from '../../../../core/models';
import { ApiService } from '../../../../core/services';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-view-reference-types',
  templateUrl: './view-reference-types.component.html',
  styleUrls: ['./view-reference-types.component.scss']
})
export class ViewReferenceTypesComponent implements OnInit {


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

}
