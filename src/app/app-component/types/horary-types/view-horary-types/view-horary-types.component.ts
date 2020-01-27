import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Message } from '../../../../core/models';
import { ApiService } from '@core/service';
import { FormGroup, FormArray , FormControl, FormBuilder,
   Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { DeleteDialogComponent } from '../../../../shared';

@Component({
  selector: 'app-view-horary-types',
  templateUrl: './view-horary-types.component.html',
  styleUrls: ['./view-horary-types.component.scss']
})
export class ViewHoraryTypesComponent implements OnInit {
    constructor(
      private formBuilder: FormBuilder,
      private apiService: ApiService,
      private route: ActivatedRoute
    ) {}

    ngOnInit() {
      this.apiService.get('/tipos-estudios/' + this.route.snapshot.params.id)
      .subscribe(res => {
      });
    }


}
