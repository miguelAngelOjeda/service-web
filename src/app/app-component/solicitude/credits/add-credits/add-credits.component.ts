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
      activo: 'S'
    });
  }

}
