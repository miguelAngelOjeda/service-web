import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Message } from '../../../../core/models';
import { ApiService } from '@core/service';
import { FormGroup, FormArray , FormControl, FormBuilder,
   Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { DeleteDialogComponent } from '../../../../shared';

@Component({
  selector: 'app-view-calculation-types',
  templateUrl: './view-calculation-types.component.html',
  styleUrls: ['./view-calculation-types.component.scss']
})
export class ViewCalculationTypesComponent implements OnInit {
    myForm: FormGroup;

    constructor(
      private formBuilder: FormBuilder,
      private apiService: ApiService,
      private route: ActivatedRoute
    ) {}

    ngOnInit() {
      this.initFormBuilder();
      this.apiService.get('/tipos-calculos/' + this.route.snapshot.params.id)
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
        descripcion: [null],
        codigo: ' ',
        activo: 'S'
      });
    }


}
