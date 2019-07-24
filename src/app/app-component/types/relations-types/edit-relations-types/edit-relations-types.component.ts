import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray , FormControl, FormBuilder,
   Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RelationsTypes } from '../../../../core/models';
import { ApiService } from '../../../../core/services';

@Component({
  selector: 'app-edit-relations-types',
  templateUrl: './edit-relations-types.component.html',
  styleUrls: ['./edit-relations-types.component.scss']
})
export class EditRelationsTypesComponent implements OnInit {

  myForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initFormBuilder();
    this.apiService.get('/tipos-vinculos/' + this.route.snapshot.params.id)
    .subscribe(res => {
      if(res.status == 200){
        this.myForm.patchValue(res.model);
      }
    });

  }

  onSubmit() {
    this.apiService.put('/tipos-vinculos/' + this.route.snapshot.params.id, this.myForm.value)
    .subscribe(res => {
        //this.snackBarService.openSnackBar('res');
    });
  }

  protected initFormBuilder() {
    this.myForm = this.formBuilder.group({
      id: null ,
      nombre: [null, [Validators.required]],
      activo: 'S'
    });
  }

}
