import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DestinationsTypes } from '../../../core/models';
import { ApiService } from '../../../core/services';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-view-destinations-types',
  templateUrl: './view-destinations-types.component.html',
  styleUrls: ['./view-destinations-types.component.scss']
})
export class ViewDestinationsTypesComponent implements OnInit {


    private model: DestinationsTypes;

    constructor(
      private apiService: ApiService,
      private route: ActivatedRoute
    ) {
      this.model = new DestinationsTypes();
     }

    ngOnInit() {
      this.apiService.get('/tipos-destinos/' + this.route.snapshot.params.id)
      .subscribe(res => {
         this.model = res.model as DestinationsTypes;
      });

    }


}
