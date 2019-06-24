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
    this.valueChangeVtoInteres();
    this.valueChangePlazo();
    this.valueChangeTasaInteres();
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
        }
    );
  }

  protected valueChangePlazo() {
    this.myForm.controls['plazo'].valueChanges.subscribe(
        (selectedValue) => {
          if(this.myForm.get('modalidad').value != null
              && this.myForm.get('montoSolicitado').value != null
              && this.myForm.get('periodoCapital').value != null && this.myForm.get('tasaInteres').value != null){

                if(this.myForm.get('tipoCalculoImporte').value != null && this.myForm.get('tipoCalculoImporte').value.codigo == 'TC-2'){
                  console.log(this.myForm.get('tasaInteres').value);
                  let valor_1 = ((this.myForm.get('montoSolicitado').value * this.myForm.get('tasaInteres').value) / 36500) * this.myForm.get('vencimientoInteres').value;
                  console.log(valor_1);
                  let valor_2 = Math.pow((  1 + ((this.myForm.get('tasaInteres').value / 36500)* this.myForm.get('vencimientoInteres').value)), selectedValue) - 1;
                  console.log(valor_2);
                  let valor_3 = Math.pow((  1 + ((this.myForm.get('tasaInteres').value / 36500)* this.myForm.get('vencimientoInteres').value)), selectedValue);
                  console.log(valor_3);
                  let valor_4 = valor_1/valor_2;

                  this.myForm.controls['importeCuota'].setValue(Math.round(valor_4 * valor_3));
                }

              }
        }
    );
  }

  protected valueChangeTasaInteres() {
    this.myForm.controls['tasaInteres'].valueChanges.subscribe(
        (selectedValue) => {
          console.log(selectedValue);
          if(this.myForm.get('modalidad').value != null
              && this.myForm.get('montoSolicitado').value != null && this.myForm.get('plazo').value != null
              && this.myForm.get('periodoCapital').value != null){

                if(this.myForm.get('tipoCalculoImporte').value != null && this.myForm.get('tipoCalculoImporte').value.codigo == 'TC-2'){

                  let valor_1 = ((this.myForm.get('montoSolicitado').value * selectedValue) / 36500) * this.myForm.get('vencimientoInteres').value;
                  console.log(valor_1);
                  let valor_2 = Math.pow((  1 + ((selectedValue/ 36500)* this.myForm.get('vencimientoInteres').value)), this.myForm.get('plazo').value) - 1;
                  console.log(valor_2);
                  let valor_3 = Math.pow((  1 + ((selectedValue/ 36500)* this.myForm.get('vencimientoInteres').value)), this.myForm.get('plazo').value);
                  console.log(valor_3);
                  let valor_4 = valor_1/valor_2;

                  this.myForm.controls['importeCuota'].setValue(Math.round(valor_4 * valor_3));
                }

              }
        }
    );
  }

  protected valueChangeVtoInteres() {
    this.myForm.controls['vencimientoInteres'].valueChanges.subscribe(
        (selectedValue) => {
          if(Number(selectedValue) == 0){
            this.myForm.controls['periodoInteres'].setValue(this.myForm.get('periodoCapital').value);
          }else if(Number(selectedValue) == -1){

          }else{
            this.myForm.controls['periodoInteres'].setValue(selectedValue);
          }
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
      vencimientoInteres: ['30', [Validators.required]],
      periodoInteres: [30, [Validators.required]],
      tasaInteres: [null, [Validators.required]],
      montoSolicitado: [null, [Validators.required]],
      importeCuota: [null, [Validators.required]],
      periodoGracia: [30, [Validators.required]],
      periodoCapital: ['30', [Validators.required]],
      activo: 'S'
    });
  }

}
