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
      montoSolicitadoOriginal: [null, [Validators.required]],
      importeCuota: [null, [Validators.required]],
      periodoGracia: [30, [Validators.required]],
      periodoCapital: ['30', [Validators.required]],
      activo: 'S'
    });
    //Desactivar Codeudor
    formGroup.controls['codeudor'].disable();
    return formGroup;
  }

  //Desabilitar al racargar los valores
  public disableValueChange(formGroup: FormGroup){
    formGroup.controls['modalidad'].enable({onlySelf: true, emitEvent: false});
    formGroup.controls['plazo'].enable({onlySelf: true, emitEvent: false});
    formGroup.controls['montoSolicitado'].enable({onlySelf: true, emitEvent: false});
    formGroup.controls['impuestos'].enable({onlySelf: true, emitEvent: false});
    formGroup.controls['comision'].enable({onlySelf: true, emitEvent: false});
    formGroup.controls['gastosVarios'].enable({onlySelf: true, emitEvent: false});
    formGroup.controls['seguros'].enable({onlySelf: true, emitEvent: false});
    formGroup.controls['tasaInteres'].enable({onlySelf: true, emitEvent: false});
    formGroup.controls['gastosAdministrativos'].enable({onlySelf: true, emitEvent: false});
    formGroup.controls['periodoInteres'].enable({onlySelf: true, emitEvent: false});
    formGroup.controls['periodoCapital'].enable({onlySelf: true, emitEvent: false});
    formGroup.controls['vencimientoInteres'].enable({onlySelf: true, emitEvent: false});
  }

  //Comportamientos de los campos en el formulario
  public valueChange(formGroup: FormGroup){

    formGroup.controls['modalidad'].valueChanges.subscribe(
        (selectedValue) => {
          formGroup.controls['tipoCalculoImporte'].setValue(selectedValue.tipoCalculos);
          formGroup.controls['tasaInteres'].setValue(selectedValue.interes);

          let modalidad = formGroup.get('modalidad').value == null ? null : formGroup.get('modalidad').value;
          let plazo = formGroup.get('plazo').value == null ? null : formGroup.get('plazo').value;
          let vencimientoInteres = formGroup.get('vencimientoInteres').value == null ? null : formGroup.get('vencimientoInteres').value;
          let periodoCapital = formGroup.get('periodoCapital').value == null ? null : formGroup.get('periodoCapital').value;
          let tasaInteres = formGroup.get('tasaInteres').value == null ? null : formGroup.get('tasaInteres').value;
          let montoSolicitado = formGroup.get('montoSolicitado').value == null ? null : formGroup.get('montoSolicitado').value;
          let tipoCalculoImporte = formGroup.get('tipoCalculoImporte').value == null ? null : formGroup.get('tipoCalculoImporte').value.codigo;
          let gastosAdministrativos = formGroup.get('gastosAdministrativos').value == null ? null : formGroup.get('gastosAdministrativos').value;

          let importeCuota = this.calcularCuota(modalidad, plazo, periodoCapital, vencimientoInteres,
                tasaInteres, montoSolicitado, tipoCalculoImporte, gastosAdministrativos);

          formGroup.controls['importeCuota'].setValue(importeCuota);
        }
    );

    formGroup.controls['plazo'].valueChanges.subscribe(
        (selectedValue) => {
          let importeCuota = this.calcularCuota(formGroup.get('modalidad').value, formGroup.get('plazo').value,
                formGroup.get('periodoCapital').value, formGroup.get('vencimientoInteres').value,
                formGroup.get('tasaInteres').value, formGroup.get('montoSolicitado').value,
                formGroup.get('tipoCalculoImporte').value.codigo, formGroup.get('gastosAdministrativos').value);

          formGroup.controls['importeCuota'].setValue(importeCuota);
        }
    );

    formGroup.controls['montoSolicitado'].valueChanges.subscribe(
        (montoSolicitado) => {

          let modalidad = formGroup.get('modalidad').value == null ? null : formGroup.get('modalidad').value;
          let plazo = formGroup.get('plazo').value == null ? null : formGroup.get('plazo').value;
          let vencimientoInteres = formGroup.get('vencimientoInteres').value == null ? null : formGroup.get('vencimientoInteres').value;
          let periodoCapital = formGroup.get('periodoCapital').value == null ? null : formGroup.get('periodoCapital').value;
          let tasaInteres = formGroup.get('tasaInteres').value == null ? null : formGroup.get('tasaInteres').value;
          //let montoSolicitado = formGroup.get('montoSolicitado').value == null ? null : formGroup.get('montoSolicitado').value;
          let tipoCalculoImporte = formGroup.get('tipoCalculoImporte').value == null ? null : formGroup.get('tipoCalculoImporte').value.codigo;
          let gastosAdministrativos = formGroup.get('gastosAdministrativos').value == null ? null : formGroup.get('gastosAdministrativos').value;

          let importeCuota = this.calcularCuota(modalidad, plazo, periodoCapital, vencimientoInteres,
                tasaInteres, montoSolicitado, tipoCalculoImporte, gastosAdministrativos);

          formGroup.controls['importeCuota'].setValue(importeCuota);
        }
    );

    formGroup.controls['impuestos'].valueChanges.subscribe(
        (impuestos) => {
          if(formGroup.get('tipoDescuento').value !== null){
            if(formGroup.get('tipoDescuento').value == 'I-D'){
              let valorDescuento = formGroup.get('impuestos').value + formGroup.get('comision').value + formGroup.get('gastosVarios').value;
              let montoEntregar = formGroup.get('montoSolicitadoOriginal').value - valorDescuento;
              formGroup.controls['importeEntregar'].setValue(montoEntregar);
              formGroup.controls['montoSolicitado'].setValue(formGroup.get('montoSolicitadoOriginal').value);
            }else{
              let valorDescuento = formGroup.get('impuestos').value + formGroup.get('comision').value + formGroup.get('gastosVarios').value;
              let montoEntregar = formGroup.get('montoSolicitadoOriginal').value + valorDescuento;
              formGroup.controls['importeEntregar'].setValue(montoEntregar);
              formGroup.controls['montoSolicitado'].setValue(formGroup.get('importeEntregar').value);
            }
          }
        }
    );

    formGroup.controls['comision'].valueChanges.subscribe(
        (impuestos) => {
          if(formGroup.get('tipoDescuento').value !== null){
            if(formGroup.get('tipoDescuento').value == 'I-D'){
              let valorDescuento = formGroup.get('impuestos').value + formGroup.get('comision').value + formGroup.get('gastosVarios').value;
              let montoEntregar = formGroup.get('montoSolicitadoOriginal').value - valorDescuento;
              formGroup.controls['importeEntregar'].setValue(montoEntregar);
              formGroup.controls['montoSolicitado'].setValue(formGroup.get('montoSolicitadoOriginal').value);
            }else{
              let valorDescuento = formGroup.get('impuestos').value + formGroup.get('comision').value + formGroup.get('gastosVarios').value;
              let montoEntregar = formGroup.get('montoSolicitadoOriginal').value + valorDescuento;
              formGroup.controls['importeEntregar'].setValue(montoEntregar);
              formGroup.controls['montoSolicitado'].setValue(formGroup.get('importeEntregar').value);
            }
          }
        }
    );

    formGroup.controls['gastosVarios'].valueChanges.subscribe(
        (impuestos) => {
          if(formGroup.get('tipoDescuento').value !== null){
            if(formGroup.get('tipoDescuento').value == 'I-D'){
              let valorDescuento = formGroup.get('impuestos').value + formGroup.get('comision').value + formGroup.get('gastosVarios').value;
              let montoEntregar = formGroup.get('montoSolicitadoOriginal').value - valorDescuento;
              formGroup.controls['importeEntregar'].setValue(montoEntregar);
              formGroup.controls['montoSolicitado'].setValue(formGroup.get('montoSolicitadoOriginal').value);
            }else{
              let valorDescuento = formGroup.get('impuestos').value + formGroup.get('comision').value + formGroup.get('gastosVarios').value;
              let montoEntregar = formGroup.get('montoSolicitadoOriginal').value + valorDescuento;
              formGroup.controls['importeEntregar'].setValue(montoEntregar);
              formGroup.controls['montoSolicitado'].setValue(formGroup.get('importeEntregar').value);
            }
          }
        }
    );

    formGroup.controls['seguros'].valueChanges.subscribe(
        (impuestos) => {
          if(formGroup.get('tipoDescuento').value !== null){
            if(formGroup.get('tipoDescuento').value == 'I-D'){
              let valorDescuento = formGroup.get('impuestos').value + formGroup.get('comision').value + formGroup.get('gastosVarios').value;
              let montoEntregar = formGroup.get('montoSolicitadoOriginal').value - valorDescuento;
              formGroup.controls['importeEntregar'].setValue(montoEntregar);
              formGroup.controls['montoSolicitado'].setValue(formGroup.get('montoSolicitadoOriginal').value);
            }else{
              let valorDescuento = formGroup.get('impuestos').value + formGroup.get('comision').value + formGroup.get('gastosVarios').value;
              let montoEntregar = formGroup.get('montoSolicitadoOriginal').value + valorDescuento;
              formGroup.controls['importeEntregar'].setValue(montoEntregar);
              formGroup.controls['montoSolicitado'].setValue(formGroup.get('importeEntregar').value);
            }
          }
        }
    );

    formGroup.controls['tipoGarantia'].valueChanges.subscribe(
        (tipoGarantia) => {
          if(tipoGarantia.id == 3){
            //this.snackbarService.show('Cargar datos de la Hipoteca en Inmuebles!!','warning');
            //formGroup.removeControl('codeudor');
            formGroup.controls['codeudor'].disable();
          }else if(tipoGarantia.id == 2){
            formGroup.controls['codeudor'].enable();
            // formGroup.addControl('codeudor', this.formBuilder.group({
            //   id: [null],
            //   profesion: [null],
            //   documento: [null],
            //   nombre: null ,
            //   email: [null],
            //   sexo: [null],
            //   telefonoParticular: [null],
            //   telefonoSecundario: null,
            //   primerNombre: [null],
            //   segundoNombre: null,
            //   primerApellido: [null],
            //   segundoApellido: null }));
          }else{
            formGroup.controls['codeudor'].disable();
            //formGroup.removeControl('codeudor');
          }
        }
    );

    formGroup.controls['tasaInteres'].valueChanges.subscribe(
        (selectedValue) => {

          let modalidad = formGroup.get('modalidad').value == null ? null : formGroup.get('modalidad').value;
          let plazo = formGroup.get('plazo').value == null ? null : formGroup.get('plazo').value;
          let vencimientoInteres = formGroup.get('vencimientoInteres').value == null ? null : formGroup.get('vencimientoInteres').value;
          let periodoCapital = formGroup.get('periodoCapital').value == null ? null : formGroup.get('periodoCapital').value;
          let tasaInteres = formGroup.get('tasaInteres').value == null ? null : formGroup.get('tasaInteres').value;
          let montoSolicitado = formGroup.get('montoSolicitado').value == null ? null : formGroup.get('montoSolicitado').value;
          let tipoCalculoImporte = formGroup.get('tipoCalculoImporte').value == null ? null : formGroup.get('tipoCalculoImporte').value.codigo;
          let gastosAdministrativos = formGroup.get('gastosAdministrativos').value == null ? null : formGroup.get('gastosAdministrativos').value;

          let importeCuota = this.calcularCuota(modalidad, plazo, periodoCapital, vencimientoInteres,
                tasaInteres, montoSolicitado, tipoCalculoImporte, gastosAdministrativos);

          formGroup.controls['importeCuota'].setValue(importeCuota);
        }
    );

    formGroup.controls['tipoDescuento'].valueChanges.subscribe(
        (selectedValue) => {
          //Guardar el monto original
          if(formGroup.get('montoSolicitadoOriginal').value == null){
            formGroup.controls['montoSolicitadoOriginal'].setValue(formGroup.get('montoSolicitado').value);
          }

          if(selectedValue == 'I-D'){
            let valorDescuento = formGroup.get('impuestos').value + formGroup.get('comision').value + formGroup.get('gastosVarios').value;
            let montoEntregar = formGroup.get('montoSolicitadoOriginal').value - valorDescuento;
            formGroup.controls['importeEntregar'].setValue(montoEntregar);
            formGroup.controls['montoSolicitado'].setValue(formGroup.get('montoSolicitadoOriginal').value);
          }else{
            let valorDescuento = formGroup.get('impuestos').value + formGroup.get('comision').value + formGroup.get('gastosVarios').value;
            let montoEntregar = (formGroup.get('montoSolicitadoOriginal').value + valorDescuento) - valorDescuento;
            formGroup.controls['importeEntregar'].setValue(montoEntregar);
            formGroup.controls['montoSolicitado'].setValue(formGroup.get('montoSolicitadoOriginal').value + valorDescuento);
          }
        }
    );

    formGroup.controls['gastosAdministrativos'].valueChanges.subscribe(
        (gastosAdministrativos) => {

          let modalidad = formGroup.get('modalidad').value == null ? null : formGroup.get('modalidad').value;
          let plazo = formGroup.get('plazo').value == null ? null : formGroup.get('plazo').value;
          let vencimientoInteres = formGroup.get('vencimientoInteres').value == null ? null : formGroup.get('vencimientoInteres').value;
          let periodoCapital = formGroup.get('periodoCapital').value == null ? null : formGroup.get('periodoCapital').value;
          let tasaInteres = formGroup.get('tasaInteres').value == null ? null : formGroup.get('tasaInteres').value;
          let montoSolicitado = formGroup.get('montoSolicitado').value == null ? null : formGroup.get('montoSolicitado').value;
          let tipoCalculoImporte = formGroup.get('tipoCalculoImporte').value == null ? null : formGroup.get('tipoCalculoImporte').value.codigo;
          //let gastosAdministrativos = formGroup.get('gastosAdministrativos').value == null ? null : formGroup.get('gastosAdministrativos').value;

          let importeCuota = this.calcularCuota(modalidad, plazo, periodoCapital, vencimientoInteres,
                tasaInteres, montoSolicitado, tipoCalculoImporte, gastosAdministrativos);

          formGroup.controls['importeCuota'].setValue(importeCuota);
        }
    );

    formGroup.controls['periodoInteres'].valueChanges.subscribe(
        (selectedValue) => {

          let modalidad = formGroup.get('modalidad').value == null ? null : formGroup.get('modalidad').value;
          let plazo = formGroup.get('plazo').value == null ? null : formGroup.get('plazo').value;
          let vencimientoInteres = formGroup.get('vencimientoInteres').value == null ? null : formGroup.get('vencimientoInteres').value;
          let periodoCapital = formGroup.get('periodoCapital').value == null ? null : formGroup.get('periodoCapital').value;
          let tasaInteres = formGroup.get('tasaInteres').value == null ? null : formGroup.get('tasaInteres').value;
          let montoSolicitado = formGroup.get('montoSolicitado').value == null ? null : formGroup.get('montoSolicitado').value;
          let tipoCalculoImporte = formGroup.get('tipoCalculoImporte').value == null ? null : formGroup.get('tipoCalculoImporte').value.codigo;
          let gastosAdministrativos = formGroup.get('gastosAdministrativos').value == null ? null : formGroup.get('gastosAdministrativos').value;

          let importeCuota = this.calcularCuota(modalidad, plazo, periodoCapital, vencimientoInteres,
                tasaInteres, montoSolicitado, tipoCalculoImporte, gastosAdministrativos);

          formGroup.controls['importeCuota'].setValue(importeCuota);
        }
    );

    formGroup.controls['periodoCapital'].valueChanges.subscribe(
        (selectedValue) => {
          if(Number(formGroup.get('vencimientoInteres').value) == 0){
            formGroup.controls['periodoInteres'].setValue(selectedValue);
          }else if(Number(formGroup.get('vencimientoInteres').value) == -1){

          }else{
            formGroup.controls['periodoInteres'].setValue(formGroup.get('vencimientoInteres').value);
          }
        }
    );

    formGroup.controls['vencimientoInteres'].valueChanges.subscribe(
        (selectedValue) => {

          if(Number(selectedValue) == 0){
            formGroup.controls['periodoInteres'].setValue(formGroup.get('periodoCapital').value);
          }else if(Number(selectedValue) == -1){

          }else{
            formGroup.controls['periodoInteres'].setValue(selectedValue);
          }

          let modalidad = formGroup.get('modalidad').value == null ? null : formGroup.get('modalidad').value;
          let plazo = formGroup.get('plazo').value == null ? null : formGroup.get('plazo').value;
          let vencimientoInteres = formGroup.get('vencimientoInteres').value == null ? null : formGroup.get('vencimientoInteres').value;
          let periodoCapital = formGroup.get('periodoCapital').value == null ? null : formGroup.get('periodoCapital').value;
          let tasaInteres = formGroup.get('tasaInteres').value == null ? null : formGroup.get('tasaInteres').value;
          let montoSolicitado = formGroup.get('montoSolicitado').value == null ? null : formGroup.get('montoSolicitado').value;
          let tipoCalculoImporte = formGroup.get('tipoCalculoImporte').value == null ? null : formGroup.get('tipoCalculoImporte').value.codigo;
          let gastosAdministrativos = formGroup.get('gastosAdministrativos').value == null ? null : formGroup.get('gastosAdministrativos').value;

          let importeCuota = this.calcularCuota(modalidad, plazo, periodoCapital, vencimientoInteres,
                tasaInteres, montoSolicitado, tipoCalculoImporte, gastosAdministrativos);

          formGroup.controls['importeCuota'].setValue(importeCuota);
        }
    );
  }

  public calcularCuota(modalidad: number, plazo: number, periodoCapital:number, vencimientoInteres:number,
                          tasaInteres:number, montoSolicitado:number, tipoCalculoImporte:string, gastosAdministrativos:number) : number {
            if(modalidad != null
                && montoSolicitado != null && plazo != null
                && periodoCapital != null && tasaInteres != null){

                  if(tipoCalculoImporte != null && tipoCalculoImporte == 'TC-2'){

                    let interes = (gastosAdministrativos == null ? 0 : gastosAdministrativos) + tasaInteres;

                    let valor_1 = ((montoSolicitado * interes) / 36500) * vencimientoInteres;

                    let valor_2 = Math.pow((  1 + ((interes / 36500)* vencimientoInteres)), plazo) - 1;

                    let valor_3 = Math.pow((  1 + ((interes / 36500)* vencimientoInteres)), plazo);

                    let valor_4 = valor_1/valor_2;

                    //formGroup.controls['importeCuota'].setValue(Math.round(valor_4 * valor_3));
                    return Math.round(valor_4 * valor_3);

                  } else if(tipoCalculoImporte != null && tipoCalculoImporte == 'TC-4'){

                    //Interés simple (i) = Capital (c) x Tipo de Interés (r) x Tiempo (t)
                    //• Si la duración es 3 años, t = 3
                    //• Si la duración es 18 meses, t = 18 / 12 = 1,5
                    //• Si la duración es 1 año, t = 1
                    //• Si la duración es 6 meses, t = 6 / 12 = 0,5
                    //• Si la duración es 1 día, t = 1 / 365

                    let interes = this.calcularInteres(gastosAdministrativos, tasaInteres);

                    let periodoInteres = this.periodoInteresSimple(plazo, interes, periodoCapital, vencimientoInteres)

                    let montoInteres = montoSolicitado * periodoInteres * plazo;

                    let montoTotal = Math.round(montoSolicitado + montoInteres);

                    let montoCuota = montoTotal / plazo;

                    //formGroup.controls['importeCuota'].setValue();
                    return Math.round(montoCuota);

                  }else if(tipoCalculoImporte != null && tipoCalculoImporte == 'TC-5'){

                    let interes = this.calcularInteres(gastosAdministrativos, tasaInteres);

                    let periodoInteres = this.periodoInteresCompuesto(plazo, interes, periodoCapital, vencimientoInteres)

                    let montoInteres = montoSolicitado * periodoInteres;

                    let montoTotal = Math.round(montoSolicitado + montoInteres);

                    let montoCuota = montoTotal / plazo;

                    //formGroup.controls['importeCuota'].setValue(Math.round(montoCuota));
                    return Math.round(montoCuota);
                  }else if(tipoCalculoImporte != null && tipoCalculoImporte == 'TC-6'){

                    let interes = this.calcularInteres(gastosAdministrativos, tasaInteres);

                    let montoInteres = montoSolicitado * interes;

                    let montoTotal = Math.round(montoSolicitado + montoInteres);

                    let montoCuota = montoTotal / plazo;

                    //formGroup.controls['importeCuota'].setValue(Math.round(montoCuota));
                    return Math.round(montoCuota);
                  }

            }
  }

  protected calcularInteres(gastosAdministrativos: number , tasaInteres:number) : number{
      let interes = ((gastosAdministrativos == null ? 0 : gastosAdministrativos) + tasaInteres) / 100;

      return interes;
  }

  protected periodoInteresSimple(plazo: number , interes: number , periodoCapital:number, vencimientoInteres:number) : number{
    let periodoInteres = 0;

    if(vencimientoInteres == 30){

      periodoInteres = interes / 12;

    }else if(vencimientoInteres == 0){

      if(periodoCapital == 60){

        periodoInteres = interes / 6;

      }else if(periodoCapital == 90){

        periodoInteres = interes / 4;

      }else if(periodoCapital == 180){

        periodoInteres = interes / 2;

      }else if(periodoCapital == 360){

        periodoInteres = interes / 1;

      }else if(periodoCapital == 15){

        periodoInteres = interes / 24

      }else if(periodoCapital == 1){

        periodoInteres = interes / 365

      }else if(periodoCapital == 30){

        periodoInteres = interes / 12

      }
    }

      return periodoInteres;
  }

  protected periodoInteresCompuesto(plazo: number , interes:number, periodoCapital:number, vencimientoInteres:number) : number{

    let periodoInteres = 0;
    if(vencimientoInteres == 30){

      periodoInteres = (Math.pow((  1 + interes ), plazo / 12)) - 1;

    }else if(vencimientoInteres == 0){

      if(periodoCapital == 60){

        periodoInteres = (Math.pow((  1 + (interes / 6) ), ((plazo / 12 ) * 6))) - 1;

      }else if(periodoCapital == 90){

        periodoInteres = (Math.pow((  1 + (interes / 4) ), ((plazo / 12 ) * 4))) - 1;

      }else if(periodoCapital == 180){

        periodoInteres = (Math.pow((  1 + (interes / 2) ), ((plazo / 12 ) * 2))) - 1;

      }else if(periodoCapital == 360){

        periodoInteres = (Math.pow((  1 + interes ), plazo / 12)) - 1;

      }else if(periodoCapital == 15){

        periodoInteres = interes / 24

      }else if(periodoCapital == 1){

        periodoInteres = interes / 365
        periodoInteres = (Math.pow((  1 + (interes / 2) ), ((plazo / 12 ) * 2))) - 1;

      }else if(periodoCapital == 30){

        periodoInteres = (Math.pow((  1 + interes ), plazo / 12)) - 1;

      }
    }

      return periodoInteres;
  }
}
