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
      montoCapital:[null],
      montoInteres: [null],
      saldoCapital: [null],
      saldoInteres: [null],
      ordenCheque: [null],
      idFunsionarioDesembolso: [null],
      operacion: [null],
      totalDevengado: [null],
      idCreditoCancelado: [null],
      fechaVencimiento: [null],
      fechaEstado: [null],
      periodoGracia: [null],
      vencimientoInteres: [null],
      periodoInteres: [null],
      periodoCapital: [null],
      tipoDesembolso: [null],
      tipoCalculoImporte: [null],
      tipoInteres: [null],
      tasaInteres: [null],
      gastosAdministrativos: [null],
      seguroVida: [null],
      cuotas: [null],
      fechaDesembolso: [null],
      gastosVarios: [null],
      estado: null,
      fechaGeneracion: null,
      fechaCalificacion: null,
      fechaUltimoDevengado: [null],
      fechaSituacion: [null],
      fechaUltCalculoSaldo: [null],
      capitalACancelar: [null],
      interesACancelar: [null],
      multaACancelar: [null],
      saldoACuenta: [null],
      saldoACuentaMulta: [null],
      interesMoratorioACancelar: [null],
      fechaUltPagoCapital: [null],
      fechaUltPagoCompensat: [null],
      fechaUltPagoMorat: [null],
      fechaUltPagoPunit: [null],
      fechaTransfJud: [null],
      montoTransfJud: [null],
      estadoBloqueado: [null],
      fechaLiberacion: [null],
      ivaACancelar: [null],
      prioridadCobro: [null],
      ivaDevengadoACancelar: [null],
      etapaPreJudicial: [null],
      planEsta: [null],
      etapPasoInco: [null],
      fechaUltCambPrio: [null],
      tipoDestino: [null],
      sucursal: [null],
      legajoUltCambPrio: [null],
      supeAReco: [null],
      modalidad: [null],
      moneda: [null],
      situacionCredito: [null],
      propuestaSolicitud: [null],
      plazoOperacion: [null],
      totalDesembolsado: [null],
      cambioVencimientos: [null],
      activo: 'S',
      montoGastosAdmin: [0],
      montoSeguroVida: [0],
      montoTotal: [0],
    });
    return formGroup;
  }
}
