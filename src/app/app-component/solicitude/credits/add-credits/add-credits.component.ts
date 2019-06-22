import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { UserService, ApiService, FormsService} from '../../../../core/services';

@Component({
  selector: 'app-add-credits',
  templateUrl: './add-credits.component.html',
  styleUrls: ['./add-credits.component.scss']
})
export class AddCreditsComponent implements OnInit {
  myForm: FormGroup;
  validateForm = true;
  isSeparacionBienes = true;
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService) { }

  ngOnInit() {
    this.initFormBuilder();
    this.valueChangeModality();
  }

  onSubmit() {
    this.apiService.post('/empresas', this.myForm.value)
    .subscribe(res => {
      if(res.status == 200){

      }
    });
  }

  getValue(data: any, form : any): void {
    (<FormControl>this.myForm.get(form)).setValue(data);
  }

  protected valueChangeModality() {
    this.myForm.controls['modalidad'].valueChanges.subscribe(
        (selectedValue) => {
          this.myForm.controls['tipoCalculoImporte'].setValue(selectedValue.tipoCalculos);
          this.myForm.controls['tasaInteres'].setValue(selectedValue.interes);
          console.log(selectedValue);
        }
    );
  }

  protected initFormBuilder() {
    this.myForm = this.formBuilder.group({
      id: null ,
      cliente: null ,
      modalidad: [null, [Validators.required]],
      tipoCalculoImporte: [null, [Validators.required]],
      tipoDestino: [null, [Validators.required]],
      tipoGarantia: [null, [Validators.required]],
      tipoPago: [null, [Validators.required]],
      tipoDesembolso: [null, [Validators.required]],
      plazo: [null, [Validators.required]],
      periodoInteres: [null, [Validators.required]],
      tasaInteres: [null, [Validators.required]],
      montoSolicitado: [null, [Validators.required]],
      importeCuota: [null, [Validators.required]],
      periodoGracia: [null, [Validators.required]],
      periodoCapital: [null, [Validators.required]],
      activo: 'S'
    });
  }

}
