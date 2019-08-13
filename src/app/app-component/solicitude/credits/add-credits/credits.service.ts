import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CreditsService {

  constructor() { }

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

                    //this.myForm.controls['importeCuota'].setValue(Math.round(valor_4 * valor_3));
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

                    //this.myForm.controls['importeCuota'].setValue();
                    return Math.round(montoCuota);

                  }else if(tipoCalculoImporte != null && tipoCalculoImporte == 'TC-5'){

                    let interes = this.calcularInteres(gastosAdministrativos, tasaInteres);

                    let periodoInteres = this.periodoInteresCompuesto(plazo, interes, periodoCapital, vencimientoInteres)

                    let montoInteres = montoSolicitado * periodoInteres;

                    let montoTotal = Math.round(montoSolicitado + montoInteres);

                    let montoCuota = montoTotal / plazo;

                    //this.myForm.controls['importeCuota'].setValue(Math.round(montoCuota));
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
