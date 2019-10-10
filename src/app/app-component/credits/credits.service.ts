import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormArray , FormControl, FormBuilder,
   Validators, NgForm, FormGroupDirective } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CreditsService {

  constructor(private formBuilder: FormBuilder) { }

  public initFormBuilder(): FormGroup{
    let formGroup = this.formBuilder.group({
      id: null ,
      cliente: this.formBuilder.group({
        id: null ,
        persona: this.formBuilder.group({
          id: [null],
          profesion: [null],
          documento: [null],
          nombre: null ,
          email: [null],
          sexo: [null],
          estadoCivil: [null],
          telefonoParticular: [null],
          telefonoSecundario: null,
          primerNombre: [null],
          segundoNombre: null,
          primerApellido: [null],
          imagePath: null,
          segundoApellido: null
        })}),
      codeudor:this.formBuilder.group({
        id: [null],
        profesion: [null],
        documento: [null],
        nombre: null ,
        email: [null],
        sexo: [null],
        telefonoParticular: [null],
        telefonoSecundario: null,
        primerNombre: [null],
        segundoNombre: null,
        imagePath: null,
        primerApellido: [null],
        segundoApellido: null }),
      modalidad: [null, [Validators.required]],
      fechaPresentacion: [null],
      funcionario: [null],
      tipoCalculoImporte: [null, [Validators.required]],
      tipoDestino: [null, [Validators.required]],
      tipoGarantia: [null, [Validators.required]],
      tipoDescuento: [null, [Validators.required]],
      importeEntregar: [null, [Validators.required]],
      tipoPago: [null, [Validators.required]],
      tipoDesembolso: [null, [Validators.required]],
      plazo: [null, [Validators.required]],
      vencimientoInteres: ['30', [Validators.required]],
      periodoInteres: [30, [Validators.required]],
      tasaInteres: [null, [Validators.required]],
      gastosAdministrativos: [null, [Validators.required]],
      impuestos: [0],
      beneficiarioCheque: [null],
      detalleDestino: [null],
      comision: [0],
      gastosVarios: [0],
      seguros: [0],
      entidad: null,
      estado: null,
      evaluacion: null,
      observacionesDepartamento: null,
      montoSolicitado: [0, [Validators.required]],
      montoSolicitadoOriginal: [null],
      //montoAux: [null, [Validators.required]],
      importeCuota: [null, [Validators.required]],
      periodoGracia: [30, [Validators.required]],
      periodoCapital: ['30', [Validators.required]],
      activo: 'S'
    });
    //Desactivar Codeudor
    formGroup.controls['codeudor'].disable();
    return formGroup;
  }
}
