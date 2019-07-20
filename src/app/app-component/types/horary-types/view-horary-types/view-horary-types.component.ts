import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentsTypes } from '../../../../core/models';
import { ApiService } from '../../../../core/services';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-view-horary-types',
  templateUrl: './view-horary-types.component.html',
  styleUrls: ['./view-horary-types.component.scss']
})
export class ViewHoraryTypesComponent implements OnInit {


    public model: PaymentsTypes;

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


}
