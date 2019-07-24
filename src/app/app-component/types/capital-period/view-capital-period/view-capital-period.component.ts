import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../core/services';
import { FormGroup, FormArray , FormControl, FormBuilder,
   Validators, NgForm, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-view-capital-period',
  templateUrl: './view-capital-period.component.html',
  styleUrls: ['./view-capital-period.component.scss']
})
export class ViewCapitalPeriodComponent implements OnInit {
    public modalityForm: FormGroup;

    constructor(
      private formBuilder: FormBuilder,
      private apiService: ApiService,
      private route: ActivatedRoute
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

}
