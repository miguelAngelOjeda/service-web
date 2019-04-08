import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CalculationTypes } from '../../core/models';
import { ApiService } from '../../core/services';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-view-calculation-types',
  templateUrl: './view-calculation-types.component.html',
  styleUrls: ['./view-calculation-types.component.scss']
})
export class ViewCalculationTypesComponent implements OnInit {


    private model: CalculationTypes;

    formControl = new FormControl('', [
      Validators.required
    // Validators.email,
    ]);
    constructor(
      private apiService: ApiService,
      private route: ActivatedRoute
    ) {
      this.model = new CalculationTypes();
     }

    ngOnInit() {
      this.apiService.get('/tipos-calculos/' + this.route.snapshot.params.id)
      .subscribe(res => {
         this.model = res.model as CalculationTypes;
      });

    }

    getErrorMessage() {
      return this.formControl.hasError('required') ? 'Campo requerido' :
        this.formControl.hasError('email') ? 'Not a valid email' :
          '';
    }

}
