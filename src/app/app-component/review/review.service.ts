import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UserService, ApiService} from '../../core/services';
import { MatSnackBar } from '@angular/material';
import { FormGroup, FormArray , FormControl, FormBuilder,
   Validators, NgForm, FormGroupDirective } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder) { }


  public guardar(formGroup: FormGroup){
    if(formGroup.valid){
      this.apiService.post('/solicitud_creditos', formGroup.value)
      .subscribe(res => {
        if(res.status == 200){
          formGroup.patchValue(res.model,{onlySelf: true, emitEvent: false});
        }
      });
    }else{
      this.mensaje("Faltan campos obligatorios por cargar!!!", "'Close'", "warning-snackbar");
    }
  }

  public review(id: number, formGroup: FormGroup){
    if(formGroup.valid){
      this.apiService.put('/analisis_solicitudes/' + id, formGroup.value)
      .subscribe(res => {
        if(res.status == 200){
          formGroup.patchValue(res.model);
          //Cargar Ocupaciones
          if(res.model.detalles != null &&  res.model.detalles.length > 0){
            const detalles = (<FormArray>formGroup.get('detalles'));
            if(detalles){
              while (detalles.length) {
                detalles.removeAt(0);
              }
              res.model.detalles.forEach(staff => {
                let form = this.formBuilder.group(staff);
                this.valueChanges(form,formGroup);
                detalles.push(form);
              });
            }
          }
        }
      });
    }else{
      this.mensaje("Faltan campos obligatorios por cargar!!!", "Cerrar", "warning-snackbar");
    }
  }

  public mensaje(message: string, action: string, className: string) {
 	    this.snackBar.open(message, action, {
	      duration: 6000,
	      verticalPosition: 'bottom',
	      horizontalPosition: 'end',
	      panelClass: [className],
	    });
	 }

  public initFormBuilder(): FormGroup{
    let formGroup = this.formBuilder.group({
      id: null,
      fechaInicioAnalisis: null ,
      fechaFinAnalisis: null,
      fechaPrimeraAprobRech: null,
      fechaSegundaAprobRech: null,
      funcionarioAprobacion: null,
      estado: null,
      montoAprobado: null,
      observacion: null,
      observacionRecomendacion: null,
      observacionRetransferencia: null,
      obsApro: null,
      requiereVerificador: null,
      funcionarioAnalisis: null,
      funcionarioVerificador: null,
      propuestaSolicitud: null,
      porcentajeEndeudamiento: null,
      detalles: this.formBuilder.array([
          // this.formBuilder.group({
          //   id: [null],
          //   tipoRelacion: [null],
          //   idConyuge: [null],
          //   nombreConyuge: null ,
          //   montoDeuda: [null],
          //   montoDeudaCuotas: [null],
          //   montoDeudaTarjeta: [null],
          //   montoDeudaTarjetaMinimo: null,
          //   montoDeudaConyuge: [null],
          //   montoCuotaACancelar: null,
          //   montoDeudaCuotasConyuge: [null],
          //   montoDeudaTarjetaConyuge: [null],
          //   montoDeudaTarjetaMinimoConyuge: [null],
          //   montoDeudaTotal: [null],
          //   montoDeudaTotalCuota: [null],
          //   montoDeudaDescuento: [null],
          //   montoDeudaDescuentoCuotas: [null],
          //   montoDeudaDescuentoTotal: null ,
          //   montoDeudaSolicitud: [null],
          //   montoDeudaSolicitudCuotas: [null],
          //   montoDeudaSolicitudTotal: [null],
          //   montoDeudaSolicitudCuotaTotal: null,
          //   saldoTotalSolicitud: [null],
          //   ingresoTotal: null,
          //   egresosTotal: [null],
          //   porcentajeCapacidad: [null],
          //   ingresosOtros: [null],
          //   porcentajeCapacidadOtros: [null],
          //   totalDiferenciaIngEgr: [null],
          //   calificacionCreditosActual: null,
          //   garantiasVigente: [null],
          //   informconf: [null]})
          ])
    });
    return formGroup;
  }

  //Comportamientos de los campos en el formulario
  valueChanges(form: FormGroup,formInit: FormGroup) {
    console.log(form);
    form.controls['montoDeudaSolicitudCuotas'].valueChanges.subscribe(
        (value) => {
          let monto = value + form.get('montoDeudaDescuentoCuotas').value;
          form.controls['montoDeudaSolicitudCuotaTotal'].setValue(monto);
        }
    );
    form.controls['montoDeudaDescuentoCuotas'].valueChanges.subscribe(
        (value) => {
          let monto = value + form.get('montoDeudaSolicitudCuotas').value;
          form.controls['montoDeudaSolicitudCuotaTotal'].setValue(monto);
        }
    );

    form.controls['montoDeudaSolicitud'].valueChanges.subscribe(
        (value) => {
          let monto = value + form.get('montoDeudaDescuento').value;
          form.controls['montoDeudaSolicitudTotal'].setValue(monto);
        }
    );
    form.controls['montoDeudaDescuento'].valueChanges.subscribe(
        (value) => {
          let monto = value + form.get('montoDeudaSolicitud').value;
          form.controls['montoDeudaSolicitudTotal'].setValue(monto);
        }
    );

    form.controls['ingresoTotal'].valueChanges.subscribe(
        (value) => {
          let monto = value + form.get('ingresosOtros').value;
          form.controls['montoTotalIngresos'].setValue(monto);

          let porcentajeCapacidad = (value * formInit.get('porcentajeEndeudamiento').value) / 100;
          form.controls['porcentajeCapacidad'].setValue(porcentajeCapacidad);

          let montoPorcentaje = porcentajeCapacidad + form.get('porcentajeCapacidadOtros').value;
          form.controls['montoTotalIngresosPorcentaje'].setValue(porcentajeCapacidad);
        }
    );

    form.controls['ingresosOtros'].valueChanges.subscribe(
        (value) => {
          let monto = value + form.get('ingresoTotal').value;
          form.controls['montoTotalIngresos'].setValue(monto);

          form.controls['porcentajeCapacidadOtros'].setValue(value);

          let montoPorcentaje = form.get('porcentajeCapacidadOtros').value + form.get('porcentajeCapacidad').value;
          form.controls['montoTotalIngresosPorcentaje'].setValue(montoPorcentaje);
        }
    );

    //DEUDA GENERAL SOLICITANTE CONYUGE CUOTAS
    form.controls['montoDeudaCuotas'].valueChanges.subscribe(
        (value) => {
          let montoDeudaTarjetaMinimo = form.get('montoDeudaTarjetaMinimo').value;
          let montoDeudaCuotasConyuge = form.get('montoDeudaCuotasConyuge').value;
          let montoDeudaTarjetaMinimoConyuge = form.get('montoDeudaTarjetaMinimoConyuge').value;
          let monto = value + montoDeudaTarjetaMinimo + montoDeudaCuotasConyuge + montoDeudaTarjetaMinimoConyuge;
          form.controls['montoDeudaTotalCuota'].setValue(monto);

        }
    );

    form.controls['montoDeudaTarjetaMinimo'].valueChanges.subscribe(
        (value) => {
          let montoDeudaCuotas = form.get('montoDeudaCuotas').value;
          let montoDeudaCuotasConyuge = form.get('montoDeudaCuotasConyuge').value;
          let montoDeudaTarjetaMinimoConyuge = form.get('montoDeudaTarjetaMinimoConyuge').value;
          let monto = value + montoDeudaCuotas + montoDeudaCuotasConyuge + montoDeudaTarjetaMinimoConyuge;
          form.controls['montoDeudaTotalCuota'].setValue(monto);

        }
    );

    form.controls['montoDeudaCuotasConyuge'].valueChanges.subscribe(
        (value) => {
          let montoDeudaCuotas = form.get('montoDeudaCuotas').value;
          let montoDeudaTarjetaMinimo = form.get('montoDeudaTarjetaMinimo').value;
          let montoDeudaTarjetaMinimoConyuge = form.get('montoDeudaTarjetaMinimoConyuge').value;
          let monto = value + montoDeudaCuotas + montoDeudaTarjetaMinimo + montoDeudaTarjetaMinimoConyuge;
          form.controls['montoDeudaTotalCuota'].setValue(monto);

        }
    );

    form.controls['montoDeudaTarjetaMinimoConyuge'].valueChanges.subscribe(
        (value) => {
          let montoDeudaCuotas = form.get('montoDeudaCuotas').value;
          let montoDeudaTarjetaMinimo = form.get('montoDeudaTarjetaMinimo').value;
          let montoDeudaCuotasConyuge = form.get('montoDeudaCuotasConyuge').value;
          let monto = value + montoDeudaCuotas + montoDeudaTarjetaMinimo + montoDeudaCuotasConyuge;
          form.controls['montoDeudaTotalCuota'].setValue(monto);

        }
    );

    //DEUDA GENERAL SOLICITANTE/CONYUGE
    form.controls['montoDeuda'].valueChanges.subscribe(
        (value) => {
          let montoDeudaTarjeta = form.get('montoDeudaTarjeta').value;
          let montoDeudaConyuge = form.get('montoDeudaConyuge').value;
          let montoDeudaTarjetaConyuge = form.get('montoDeudaTarjetaConyuge').value;
          let monto = value + montoDeudaTarjeta + montoDeudaConyuge + montoDeudaTarjetaConyuge;
          form.controls['montoDeudaTotal'].setValue(monto);

        }
    );

    form.controls['montoDeudaTarjeta'].valueChanges.subscribe(
        (value) => {
          let montoDeuda = form.get('montoDeuda').value;
          let montoDeudaConyuge = form.get('montoDeudaConyuge').value;
          let montoDeudaTarjetaConyuge = form.get('montoDeudaTarjetaConyuge').value;
          let monto = value + montoDeuda + montoDeudaConyuge + montoDeudaTarjetaConyuge;
          form.controls['montoDeudaTotal'].setValue(monto);

        }
    );

    form.controls['montoDeudaConyuge'].valueChanges.subscribe(
        (value) => {
          let montoDeuda = form.get('montoDeuda').value;
          let montoDeudaTarjeta = form.get('montoDeudaTarjeta').value;
          let montoDeudaTarjetaConyuge = form.get('montoDeudaTarjetaConyuge').value;
          let monto = value + montoDeuda + montoDeudaTarjeta + montoDeudaTarjetaConyuge;
          form.controls['montoDeudaTotal'].setValue(monto);

        }
    );

    form.controls['montoDeudaTarjetaConyuge'].valueChanges.subscribe(
        (value) => {
          let montoDeuda = form.get('montoDeuda').value;
          let montoDeudaTarjeta = form.get('montoDeudaTarjeta').value;
          let montoDeudaConyuge = form.get('montoDeudaConyuge').value;
          let monto = value + montoDeuda + montoDeudaTarjeta + montoDeudaConyuge;
          form.controls['montoDeudaTotal'].setValue(monto);

        }
    );

    form.controls['montoDeudaSolicitudCuotaTotal'].valueChanges.subscribe(
        (value) => {
          let montoIngreso = form.get('montoTotalIngresosPorcentaje').value;
          let monto = montoIngreso - value;
          form.controls['saldoTotalSolicitud'].setValue(monto);
        }
    );

    form.controls['montoTotalIngresosPorcentaje'].valueChanges.subscribe(
        (value) => {
          let montoDeuda = form.get('montoDeudaSolicitudCuotaTotal').value;
          let monto = value - montoDeuda;
          form.controls['saldoTotalSolicitud'].setValue(monto);
        }
    );

    form.controls['deudaCuotaReferencia'].valueChanges.subscribe(
        (value) => {
          let monto = value + form.get('deudaCuotaCtralRgo').value;
          form.controls['totalDeudaCuotaExterior'].setValue(monto);
        }
    );

    form.controls['deudaCuotaCtralRgo'].valueChanges.subscribe(
        (value) => {
          let monto = value + form.get('deudaCuotaReferencia').value;
          form.controls['totalDeudaCuotaExterior'].setValue(monto);
        }
    );

    form.controls['deudaTotalReferencia'].valueChanges.subscribe(
        (value) => {
          let monto = value + form.get('deudaTotalCtralRgo').value;
          form.controls['totalDeudaExterior'].setValue(monto);
        }
    );

    form.controls['deudaTotalCtralRgo'].valueChanges.subscribe(
        (value) => {
          let monto = value + form.get('deudaTotalReferencia').value;
          form.controls['totalDeudaExterior'].setValue(monto);
        }
    );
  }
}
