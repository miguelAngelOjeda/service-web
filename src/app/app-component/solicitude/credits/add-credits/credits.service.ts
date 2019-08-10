import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CreditsService {

  constructor() { }

  protected calcularCuota(modalidad: number, plazo: number, periodoCapital:number, vencimientoInteres:number,
                          tasaInteres:number, montoSolicitado:number, tipoCalculoImporte:string, gastosAdministrativos:number) : number {
            if(modalidad != null
                && montoSolicitado != null && plazo != null
                && periodoCapital != null && tasaInteres != null){

                  if(this.myForm.get('tipoCalculoImporte').value != null && this.myForm.get('tipoCalculoImporte').value.codigo == 'TC-2'){

                    let tasaInteres = (this.myForm.get('gastosAdministrativos').value == null ? 0 : this.myForm.get('gastosAdministrativos').value) + this.myForm.get('tasaInteres').value;


                    let valor_1 = ((this.myForm.get('montoSolicitado').value * tasaInteres) / 36500) * this.myForm.get('vencimientoInteres').value;

                    let valor_2 = Math.pow((  1 + ((tasaInteres / 36500)* this.myForm.get('vencimientoInteres').value)), this.myForm.get('plazo').value) - 1;

                    let valor_3 = Math.pow((  1 + ((tasaInteres / 36500)* this.myForm.get('vencimientoInteres').value)), this.myForm.get('plazo').value);

                    let valor_4 = valor_1/valor_2;

                    //this.myForm.controls['importeCuota'].setValue(Math.round(valor_4 * valor_3));
                    return Math.round(valor_4 * valor_3);

                  } else if(this.myForm.get('tipoCalculoImporte').value != null && this.myForm.get('tipoCalculoImporte').value.codigo == 'TC-4'){

                    //Interés simple (i) = Capital (c) x Tipo de Interés (r) x Tiempo (t)
                    //• Si la duración es 3 años, t = 3
                    //• Si la duración es 18 meses, t = 18 / 12 = 1,5
                    //• Si la duración es 1 año, t = 1
                    //• Si la duración es 6 meses, t = 6 / 12 = 0,5
                    //• Si la duración es 1 día, t = 1 / 365

                    let interes = this.calcularInteres(this.myForm.get('gastosAdministrativos').value, this.myForm.get('tasaInteres').value);

                    let periodoInteres = 0;
                    if(this.myForm.get('vencimientoInteres').value == 30){
                      periodoInteres = interes / 12;
                    }else if(this.myForm.get('vencimientoInteres').value == 0){
                      if(this.myForm.get('periodoCapital').value == 60){
                        periodoInteres = interes / 6;
                      }else if(this.myForm.get('periodoCapital').value == 90){
                        periodoInteres = interes / 4;
                      }else if(this.myForm.get('periodoCapital').value == 180){
                        periodoInteres = interes / 2;
                      }else if(this.myForm.get('periodoCapital').value == 360){
                        periodoInteres = interes / 1;
                      }else if(this.myForm.get('periodoCapital').value == 15){
                        periodoInteres = interes / 24
                      }else if(this.myForm.get('periodoCapital').value == 1){
                        periodoInteres = interes / 365
                      }else if(this.myForm.get('periodoCapital').value == 30){
                        periodoInteres = interes / 12
                      }
                    }

                    let montoInteres = this.myForm.get('montoSolicitado').value * periodoInteres * this.myForm.get('plazo').value;

                    let montoTotal = Math.round(this.myForm.get('montoSolicitado').value + montoInteres);

                    let montoCuota = montoTotal / this.myForm.get('plazo').value;

                    //this.myForm.controls['importeCuota'].setValue();
                    return Math.round(montoCuota);

                  }else if(this.myForm.get('tipoCalculoImporte').value != null && this.myForm.get('tipoCalculoImporte').value.codigo == 'TC-5'){

                    let interes = this.calcularInteres(this.myForm.get('gastosAdministrativos').value, this.myForm.get('tasaInteres').value);

                    let periodoInteres = 0;
                    if(this.myForm.get('vencimientoInteres').value == 30){
                      periodoInteres = (Math.pow((  1 + interes ), this.myForm.get('plazo').value / 12)) - 1;
                    }else if(this.myForm.get('vencimientoInteres').value == 0){
                      if(this.myForm.get('periodoCapital').value == 60){
                        periodoInteres = (Math.pow((  1 + (interes / 6) ), ((this.myForm.get('plazo').value/12 ) * 6))) - 1;
                      }else if(this.myForm.get('periodoCapital').value == 90){
                        periodoInteres = (Math.pow((  1 + (interes / 4) ), ((this.myForm.get('plazo').value/12 ) * 4))) - 1;
                      }else if(this.myForm.get('periodoCapital').value == 180){
                        periodoInteres = (Math.pow((  1 + (interes / 2) ), ((this.myForm.get('plazo').value/12 ) * 2))) - 1;
                      }else if(this.myForm.get('periodoCapital').value == 360){
                        periodoInteres = (Math.pow((  1 + interes ), this.myForm.get('plazo').value / 12)) - 1;
                      }else if(this.myForm.get('periodoCapital').value == 15){
                        periodoInteres = interes / 24
                      }else if(this.myForm.get('periodoCapital').value == 1){
                        periodoInteres = interes / 365
                        periodoInteres = (Math.pow((  1 + (interes / 2) ), ((this.myForm.get('plazo').value/12 ) * 2))) - 1;
                      }else if(this.myForm.get('periodoCapital').value == 30){
                        periodoInteres = (Math.pow((  1 + interes ), this.myForm.get('plazo').value / 12)) - 1;
                      }
                    }


                    let montoInteres = this.myForm.get('montoSolicitado').value * periodoInteres;

                    let montoTotal = Math.round(this.myForm.get('montoSolicitado').value + montoInteres);

                    let montoCuota = montoTotal / this.myForm.get('plazo').value;

                    //this.myForm.controls['importeCuota'].setValue(Math.round(montoCuota));
                    return Math.round(montoCuota);
                  }

            }
  }

  protected calcularInteres(gastosAdministrativos: number , tasaInteres:number) : number{
      let interes = ((gastosAdministrativos == null ? 0 : gastosAdministrativos) + tasaInteres) / 100;

      return interes;
  }

  protected periodoInteresSimple(plazo: number , periodoCapital:number) : number{
      let interes = ((gastosAdministrativos == null ? 0 : gastosAdministrativos) + tasaInteres) / 100;

      return interes;
  }

  protected periodoInteresCompuesto(plazo: number , periodoCapital:number) : number{
      let interes = ((gastosAdministrativos == null ? 0 : gastosAdministrativos) + tasaInteres) / 100;

      return interes;
  }
}
