import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Message } from '../../../../core/models';
import { ApiService } from '@core/service';
import { DeleteDialogComponent } from '../../../../shared';
import { FormGroup, FormArray , FormControl, FormBuilder,
   Validators, NgForm, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-view-payments-types',
  templateUrl: './view-payments-types.component.html',
  styleUrls: ['./view-payments-types.component.scss']
})
export class ViewPaymentsTypesComponent implements OnInit {
    myForm: FormGroup;

    constructor(
      private formBuilder: FormBuilder,
      private apiService: ApiService,
      private route: ActivatedRoute
    ) {}

    ngOnInit() {
      this.initFormBuilder();
      this.apiService.get('/tipos-pagos/' + this.route.snapshot.params.id)
      .subscribe(res => {
        if(res.status == 200){
          this.myForm.patchValue(res.model);
        }
      });

    }

    protected initFormBuilder() {
      this.myForm = this.formBuilder.group({
        id: null ,
        nombre: [null, [Validators.required]],
        codigo: '',
        activo: 'S'
      });
    }


}
