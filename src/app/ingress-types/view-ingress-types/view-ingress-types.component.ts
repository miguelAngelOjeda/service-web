import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IngressTypes } from '../../core/models';
import { ApiService } from '../../core/services';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-view-ingress-types',
  templateUrl: './view-ingress-types.component.html',
  styleUrls: ['./view-ingress-types.component.scss']
})
export class ViewIngressTypesComponent implements OnInit {


    private model: IngressTypes;

    formControl = new FormControl('', [
      Validators.required
    // Validators.email,
    ]);
    constructor(
      private apiService: ApiService,
      private route: ActivatedRoute
    ) {
      this.model = new IngressTypes();
     }

    ngOnInit() {
      this.apiService.get('/tipos-ingresos/' + this.route.snapshot.params.id)
      .subscribe(res => {
         this.model = res.model as IngressTypes;
      });

    }

    getErrorMessage() {
      return this.formControl.hasError('required') ? 'Campo requerido' :
        this.formControl.hasError('email') ? 'Not a valid email' :
          '';
    }

}
