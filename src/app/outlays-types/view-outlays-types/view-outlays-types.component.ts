import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OutlaysTypes } from '../../core/models';
import { ApiService } from '../../core/services';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-view-outlays-types',
  templateUrl: './view-outlays-types.component.html',
  styleUrls: ['./view-outlays-types.component.scss']
})
export class ViewOutlaysTypesComponent implements OnInit {


    private model: OutlaysTypes;

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

}
