import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Message } from '../../../../core/models';
import { FormGroup, FormArray , FormControl, FormBuilder,
   Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { ApiService } from '@core/service';
import { DeleteDialogComponent } from '../../../../shared';

@Component({
  selector: 'app-add-guarantee-types',
  templateUrl: './add-guarantee-types.component.html',
  styleUrls: ['./add-guarantee-types.component.scss']
})
export class AddGuaranteeTypesComponent implements OnInit {

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
      codigo: ' ',
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(35)]],
      codeudor: [false, [Validators.required]],
      hipoteca: [false, [Validators.required]]
    });
  }


  onSubmit() {
    this.apiService.post('/tipos-garantias', this.modalityForm.value)
    .subscribe(res => {
      if(res.status == 200){

      }
    });
  }

  getValue(data: any, form : any): void {
    (<FormControl>this.modalityForm.get(form)).setValue(data);
  }

}
