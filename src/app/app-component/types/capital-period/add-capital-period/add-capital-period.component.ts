import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Message } from '../../../../core/models';
import { FormGroup, FormArray , FormControl, FormBuilder,
   Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { ApiService } from '@core/service';
import { DeleteDialogComponent } from '../../../../shared';

@Component({
  selector: 'app-add-capital-period',
  templateUrl: './add-capital-period.component.html',
  styleUrls: ['./add-capital-period.component.scss']
})
export class AddCapitalPeriodComponent implements OnInit {

  public modalityForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.initFormBuilder();
  }

  initFormBuilder() {
    this.modalityForm = this.formBuilder.group({
      id: null,
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(35)]],
      cantidadDias: [1, [Validators.required]]
    });
  }


  onSubmit() {
    this.apiService.post('/periodos-capitales', this.modalityForm.value)
    .subscribe(res => {
      if(res.status == 200){

      }
    });
  }

  getValue(data: any, form : any): void {
    (<FormControl>this.modalityForm.get(form)).setValue(data);
  }

}
