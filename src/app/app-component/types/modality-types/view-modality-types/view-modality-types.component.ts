import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../core/services';
import { FormGroup, FormArray , FormControl, FormBuilder,
   Validators, NgForm, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-view-modality-types',
  templateUrl: './view-modality-types.component.html',
  styleUrls: ['./view-modality-types.component.scss']
})
export class ViewModalityTypesComponent implements OnInit {
    public modalityForm: FormGroup;

    constructor(
      private formBuilder: FormBuilder,
      private apiService: ApiService,
      private route: ActivatedRoute
    ) {}

    ngOnInit() {
      this.initFormBuilder();
      this.apiService.get('/modalidades/' + this.route.snapshot.params.id)
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
        codigo: [' '],
        descripcion: null,
        montoMaximo: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(35)]],
        montoMinimo: ['', [Validators.required]],
        interes: [0.0, [Validators.required]],
        tipoCalculos: ['', [Validators.required]],
        periodoCapital: ['', [Validators.required]],
        periodoGracia: ['', [Validators.required]],
        vencimientoInteres: ['', [Validators.required]]
      });
    }

}
