import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CalculationTypes } from '../../../../core/models';
import { ApiService } from '../../../../core/services';

@Component({
  selector: 'app-edit-capital-period',
  templateUrl: './edit-capital-period.component.html',
  styleUrls: ['./edit-capital-period.component.scss']
})
export class EditCapitalPeriodComponent implements OnInit {

  public modalityForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.initFormBuilder();
    this.apiService.get('/periodos-capitales/' + this.route.snapshot.params.id)
    .subscribe(res => {
      if(res.status == 200){
        (<FormGroup>this.modalityForm).patchValue(res.model);
      }
    });

  }

  initFormBuilder() {
    this.modalityForm = this.formBuilder.group({
      id: null,
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(35)]],
      cantidadDias: [1, [Validators.required]]
    });
  }

  onSubmit() {
    this.apiService.put('/periodos-capitales/' + this.route.snapshot.params.id, this.modalityForm.value)
    .subscribe(res => {
        //this.snackBarService.openSnackBar('res');
    });
  }

  getValue(data: any, form : any): void {
    (<FormControl>this.modalityForm.get(form)).setValue(data);
  }

}
