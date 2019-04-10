import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentsTypes } from '../../core/models';
import { ApiService } from '../../core/services';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-view-payments-types',
  templateUrl: './view-payments-types.component.html',
  styleUrls: ['./view-payments-types.component.scss']
})
export class ViewPaymentsTypesComponent implements OnInit {


    private model: PaymentsTypes;

    constructor(
      private apiService: ApiService,
      private route: ActivatedRoute
    ) {
      this.model = new PaymentsTypes();
     }

    ngOnInit() {
      this.apiService.get('/tipos-pagos/' + this.route.snapshot.params.id)
      .subscribe(res => {
         this.model = res.model as PaymentsTypes;
      });

    }


}
