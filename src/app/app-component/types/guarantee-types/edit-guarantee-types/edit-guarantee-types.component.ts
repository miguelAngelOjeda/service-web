import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray , FormControl, FormBuilder,
   Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CalculationTypes } from '../../../../core/models';
import { ApiService } from '../../../../core/services';

@Component({
  selector: 'app-edit-guarantee-types',
  templateUrl: './edit-guarantee-types.component.html',
  styleUrls: ['./edit-guarantee-types.component.scss']
})
export class EditGuaranteeTypesComponent implements OnInit {

  public modalityForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.initFormBuilder();
    this.apiService.get('/tipos-garantias/' + this.route.snapshot.params.id)
    .subscribe(res => {
      if(res.status == 200){
        (<FormGroup>this.modalityForm).patchValue(res.model);
      }
    });

  }

  initFormBuilder() {
    this.modalityForm = this.formBuilder.group({
      id: null,
      codigo: ' ',
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(35)]],
      codeudor: [false, [Validators.required]],
      hipoteca: [false, [Validators.required]]
    });
  }

  onSubmit() {
    this.apiService.put('/tipos-garantias/' + this.route.snapshot.params.id, this.modalityForm.value)
    .subscribe(res => {
        //this.snackBarService.openSnackBar('res');
    });
  }

  getValue(data: any, form : any): void {
    (<FormControl>this.modalityForm.get(form)).setValue(data);
  }

}
