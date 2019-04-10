import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RelationsTypes } from '../../core/models';
import { ApiService } from '../../core/services';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-view-relations-types',
  templateUrl: './view-relations-types.component.html',
  styleUrls: ['./view-relations-types.component.scss']
})
export class ViewRelationsTypesComponent implements OnInit {


    private model: RelationsTypes;

    constructor(
      private apiService: ApiService,
      private route: ActivatedRoute
    ) {
      this.model = new RelationsTypes();
     }

    ngOnInit() {
      this.apiService.get('/tipos-vinculos/' + this.route.snapshot.params.id)
      .subscribe(res => {
         this.model = res.model as RelationsTypes;
      });

    }


}
