import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../../../../core/models';
import { ApiService } from '@core/service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DeleteDialogComponent } from '../../../../shared';
import { FormGroup, FormArray , FormControl, FormBuilder,
   Validators, NgForm, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-view-tryst-types',
  templateUrl: './view-tryst-types.component.html',
  styleUrls: ['./view-tryst-types.component.scss']
})
export class ViewTrystTypesComponent implements OnInit {
    myForm: FormGroup;

    constructor(
      private formBuilder: FormBuilder,
      private apiService: ApiService,
      private dialog: MatDialog,
      private route: ActivatedRoute
    ) {}

    ngOnInit() {
      this.initFormBuilder();
      this.apiService.get('/tipos-citas/' + this.route.snapshot.params.id)
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
