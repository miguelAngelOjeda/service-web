import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentsTypes } from '../../../../core/models';
import { ApiService } from '../../../../core/services';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-view-document-types',
  templateUrl: './view-document-types.component.html',
  styleUrls: ['./view-document-types.component.scss']
})
export class ViewDocumentTypesComponent implements OnInit {


    public model: PaymentsTypes;

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
