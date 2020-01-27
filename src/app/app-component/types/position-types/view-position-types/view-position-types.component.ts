import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@core/service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Message } from '../../../../core/models';
import { DeleteDialogComponent } from '../../../../shared';
import { FormGroup, FormArray , FormControl, FormBuilder,
   Validators, NgForm, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-view-position-types',
  templateUrl: './view-position-types.component.html',
  styleUrls: ['./view-position-types.component.scss']
})
export class ViewPositionTypesComponent implements OnInit {
    myForm: FormGroup;

    constructor(
      private formBuilder: FormBuilder,
      private apiService: ApiService,
      private route: ActivatedRoute
    ) {}

    ngOnInit() {
      this.initFormBuilder();
      this.apiService.get('/tipos-cargos/' + this.route.snapshot.params.id)
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
