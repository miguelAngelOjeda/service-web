import { Component, OnInit} from '@angular/core';
import { ApiService, UserService} from '../../../core/services';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { CuotaDesembolso } from 'src/app/core/models/CuotaDesembolso';
import * as moment from 'moment';
import * as $ from 'jquery';
import { Canvas, Columns, Img, Line, Ol, PdfMakeWrapper, Stack, Table, Txt, Ul } from 'pdfmake-wrapper';

@Component({
  selector: 'app-propuesta',
  templateUrl: './propuesta.component.html',
  styleUrls: ['./propuesta.component.scss']
})
export class PropuestaComponent implements OnInit {
  url:string;
  myForm: FormGroup;
  capitalTotal : number;
  cuotas: CuotaDesembolso[];


  constructor(private formBuilder: FormBuilder,
  private apiService: ApiService,
  private userService: UserService) {

  }
  ngOnInit() {
    this.myForm = this.formBuilder.group({
      plazo : [null, [Validators.required]],
      montoSol : [0, [Validators.required]],
      tasaAnual : null,
      gastosAdmin : null,
      seguroVida : null,
      dividendoModalidad : 12,
      montoGastoAdmin : 0,
      montoSeguroVida : 0,
      montoTotal : 0,
      fechaVencimiento: null
    });
    this.myForm.addControl('modalidad', this.formBuilder.group({
      id: [null],
      nombre: [null],
      codigo: [null],
      descripcion: [null],
      montoMinimo: [null],
      dividendoCalculo: [null],
      gastosAdministrativos: [null],
      interes: [null],
      periodoCapital: [null],
      periodoGracia: [null],
      seguroVida: [null],
      tipoCalculos: [null],
      vencimientoInteres: [null] }));
    this.url = environment.api_url + '/pagoCuotaWs'
    this.cuotas = new Array();
  }

  getValue(data: any, form : any): void {
    (<FormControl>this.myForm.get(form)).patchValue(data);
  }

  onSubmit() {

  }

  thousands_separators(num)
  {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  }

  calcularCuota() {
    this.cuotas = new Array();
    let params = new HttpParams({
      fromObject : {
        'montoCapital' : this.myForm.get('montoSol').value.toString(),
        'montoInteres' : this.myForm.get('modalidad').value.interes.toString(),
        'seguroInteres' : this.myForm.get('modalidad').value.seguroVida.toString(),
        'gastosInteres' : this.myForm.get('modalidad').value.gastosAdministrativos.toString(),
        'plazo' : this.myForm.get('plazo').value.toString(),
        'fechaVencimiento' : moment(new Date(this.myForm.get('fechaVencimiento').value)).format('YYYY-MM-DD'),
        'periodoCapital' : this.myForm.get('modalidad').value.periodoCapital.toString(),
        'periodoInteres' : this.myForm.get('modalidad').value.vencimientoInteres.toString(),
        'periodoGracia' : this.myForm.get('modalidad').value.periodoGracia.toString(),
        'codTipoCalculo' : this.myForm.get('modalidad').value.tipoCalculos.codigo,
        'codModalidad' : this.myForm.get('modalidad').value.codigo,
        'tipoDesembolso' :'0'
      }
    });

    this.apiService.get('/creditos/desembolso/detalle-cuotas', params)
    .subscribe(res => {
      if(res.status == 200){
        res.rows.forEach(field => {
          this.cuotas.push(field);
        });
      }
    });
  }

  calcularFechaVencimiento(fechaActual){

    let periodoCapital = (this.myForm.get('modalidad').value.periodoCapital == null || this.myForm.get('modalidad').value.periodoCapital == '' || this.myForm.get('modalidad').value.periodoCapital == '0') ? '30' : this.myForm.get('modalidad').value.periodoCapital;
    periodoCapital = Number(periodoCapital);

    if(periodoCapital == 1){
      fechaActual.add(1, 'days');
    } else if(periodoCapital == 7) {
      fechaActual.add(1, 'weeks');
    } else if(periodoCapital == 15) {
      fechaActual.add(2, 'weeks');
    } else if(periodoCapital == 30) {
      fechaActual.add(1, 'month');
    } else if(periodoCapital == 60) {
      fechaActual.add(2, 'month');
    } else if(periodoCapital == 360) {
      fechaActual.add(6, 'month');
    } else {
      fechaActual.add(1, 'month');
    }

    return fechaActual;
  }


  printLiquidacion(){
    //datos de fecha
    let fechaActual = moment(Date.now());

    //usuario
    var usuario;
    this.userService.getUser().subscribe((data) => {
      usuario = data;
    });

    //array de cuotas
    const arrayCuotas = this.cuotas;

    const pdf = new PdfMakeWrapper();
    pdf.pageSize('LEGAL');
    //pdf.pageOrientation('landscape');
    pdf.pageMargins([40, 120, 40, 101]);
    pdf.info({
      title: 'Propuesta Credito',
      author: 'service web',
      subject: 'Liquidadcion de credito',

    });

    pdf.header(new Stack([
      new Txt('FINANCORP - PROPUESTA DE CREDITO').alignment('center').bold().end,
      new Columns([ new Txt('Usuario: ' + usuario.username).alignment('center').bold().end, new Txt('Fecha: ' + fechaActual.format('DD/MM/YYYY')).alignment('center').bold().end, new Txt('Hora: ' + fechaActual.format('hh:mm:ss A')).alignment('center').bold().end ]).end,
      new Canvas([new Line(10, [400, 10]).end]).alignment('center').end
    ]).end);

    pdf.footer(
      (currentPage, pageCount) => {
        return new Txt('Pagina ' + currentPage.toString() + ' de ' + pageCount + ' ').alignment('right').end;
      }
    );

    /*
    pdf.add(
      new Columns([new Txt('Nro Credito: ' + this.myForm.get('id').value).alignment('left').bold().end, new Txt('Nro Solicitud: ' + this.myForm.get('propuestaSolicitud').value.id).alignment('left').bold().end]).end

    );*/

    /*
    pdf.add(
      new Columns([new Txt('Destino Credito: ' + this.myForm.get('tipoDestino').value.nombre).alignment('left').end, new Txt('Modalidad: ' + this.myForm.get('modalidad').value.nombre).alignment('left').end]).end

    );*/

    //let tasaAnual = (this.myForm.get('tasaAnual').value == null || this.myForm.get('tasaAnual').value == '') ? this.myForm.get('modalidad').value.interes : this.myForm.get('tasaAnual').value;
    pdf.add(
      new Columns([new Txt('Sucursal: ' + 'ITAGUA').alignment('left').end, new Txt('Modalidad: ' + this.myForm.get('modalidad').value.nombre).alignment('left').end]).end

    );

    pdf.add(
      new Columns([new Txt('Monto a Desembolsar: '+ new Intl.NumberFormat().format(this.myForm.get('montoSol').value)).alignment('left').end, new Txt('Plazo: ' + this.myForm.get('plazo').value).alignment('left').end]).end

    );


    var filas = new Array();
    filas.push(['NRO CUOTA', 'FECHA VENCIMIENTO', 'MONTO CUOTA', 'INTERES', 'AMORTIZACION', 'SALDO']);
    arrayCuotas.forEach(element => filas.push([element.numeroCuota, element.fechaVencimiento,
      new Intl.NumberFormat().format(Number(element.montoCuota)),
      new Intl.NumberFormat().format(Number(element.interes)),
      new Intl.NumberFormat().format(Number(element.amortizacion)),
      new Intl.NumberFormat().format(Number(element.saldoCapital))]));

    //calcula total interes
    var totalInteres = 0;
    arrayCuotas.forEach(element => totalInteres = totalInteres + Number(element.interes));

    pdf.add(
      pdf.ln(2)
    );
    pdf.add(new Txt('CUOTAS').alignment('center').bold().end);
    pdf.add(
      new Table(filas).end
    );
    pdf.add(new Canvas([new Line(10, [400, 10]).end]).alignment('center').end);
    pdf.add(
      pdf.ln(2)
    );

    /*
    var texto = "Declaro conocer y aceptar en todas sus partes el detalle de la liquidación precedente, en la que constan los datos del(los) crédito(s) que se me ha(n) otorgado. Así mismo autorizo irrevocablemente a FINANCORP a destruir el pagaré que respalda esta operación, una vez transcurridos tres (3) meses después del pago de la ultima cuota, sin posibilidad de reclamo alguno en el caso de no haber acudido a sus oficinas para retirar el mismo, antes de cumplirse el plazo mencionado.";
    pdf.add(new Txt(texto).alignment('left').end);
    pdf.add(
      pdf.ln(2)
    );

    pdf.add(new Txt('FIRMA: _______________________________').alignment('left').bold().end);
    pdf.add(
      pdf.ln(2)
    );
    pdf.add(new Txt('NOMBRE(S) Y APELLIDO(S): ').alignment('left').bold().end);
    pdf.add(new Txt('C.I.: ').alignment('left').bold().end);

    pdf.add(
      pdf.ln(2)
    );

    pdf.add(new Txt('OBSERVACIONES:').alignment('center').bold().end);

    pdf.add(new Ul([
      'Las cuotas deberán ser abonadas en la oficina de Financorp, situada en la Ciudad de Itauguá  Gral. Bernardino Caballero c/ Ruta 2 Mcal. Estigarribia.',
      'El servicio de cobrador personalizado tendrá un costo adicional de 10.000 GS. (monto incluido en el recibo de pago mensual), contactar al número 0981.266.459 o a su Ejecutiva de Cuentas.'
    ]).type('square').end);
    */

    pdf.create().download();
  }

}
