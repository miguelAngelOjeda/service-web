import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService} from '../../../core/services';
import { SnackbarService } from '../../../shared';
import { Router, ActivatedRoute} from '@angular/router';
import { CreditsService } from '../credits.service';
import { PeopleService } from '../../shared/people/people.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { environment } from 'src/environments/environment';
import { CuotaDesembolso } from 'src/app/core/models/CuotaDesembolso';
import { Canvas, Cell, Columns, DocumentDefinition, Img, Item, Line, PdfMakeWrapper, Stack, Table, Txt, Ul } from 'pdfmake-wrapper';
import * as moment from 'moment';
import { UserService } from '../../../core/services';
import { PageNumberComponent } from 'ngx-extended-pdf-viewer';

declare function NumeroALetras(num): any;

@Component({
  selector: 'app-print-credits',
  templateUrl: './print-credits.component.html',
  styleUrls: ['./print-credits.component.scss']
})
export class PrintCreditsComponent implements OnInit {
  myForm: FormGroup;
  validateForm = true;
  isSeparacionBienes = true;
  isTieneHipoteca = 0;
  urlImage = environment.api_url;
  interesPeriodo: string;
  gastAdminPeriodo: string;
  gastAdmin: number;
  gastAdminPorc: number;
  segVidaPeriodo: string;
  segVida: number;
  segVidaPorc: number;
  capitalTotal : number;
  fechaVencimiento : string;
  cuotas: CuotaDesembolso[];

  constructor(private creditsService:CreditsService,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private snackbarService: SnackbarService,
    private formBuilder: FormBuilder,
    private peopleService: PeopleService,
    private apiService: ApiService,
    private userService: UserService) { }

  ngOnInit() {
    //datos para calculos
    this.cuotas = null;
    this.interesPeriodo = '0';
    this.gastAdminPeriodo= '0';
    this.gastAdmin = 0;
    this.segVidaPeriodo= '0';
    this.segVida = 0;
    this.segVidaPorc = 0;
    this.gastAdminPorc = 0;
    this.capitalTotal = 0;
    this.fechaVencimiento = null;
    //-------
    this.myForm = this.creditsService.initFormBuilder();
    this.apiService.get('/creditos/desembolso/' + this.route.snapshot.params.id)
    .subscribe(res => {
      
      if(res.status == 200){
        console.log(res.model);
        this.myForm.patchValue(res.model,{emitEvent: false});
        console.log(this.myForm);
        this.setearDatos();
      }
    });
  }

  setearDatos(){
    var dividendoModalidad;
    if(this.myForm.get('modalidad').value.nombre == "CREDITO BIMESTRAL"){
      dividendoModalidad = 12*2;
    } else if(this.myForm.get('modalidad').value.nombre == "CREDITO SEMANAL") {
      dividendoModalidad = 365*7;
    } else if(this.myForm.get('modalidad').value.nombre == "CREDITO SEMESTRAL") {
      dividendoModalidad = 12*6;
    } else if(this.myForm.get('modalidad').value.nombre == "CREDITO MENSUAL") {
      dividendoModalidad = 12;
    } else if(this.myForm.get('modalidad').value.nombre == "CREDITO QUINCENAL") {
      dividendoModalidad = 365*15;
    } else if(this.myForm.get('modalidad').value.nombre == "CREDITO DIARIO") {
      dividendoModalidad = 365;
    } else {
      dividendoModalidad = 12;
    }

    //interes periodo
    var interesPeriodoNumber = Number(this.myForm.get('tasaInteres').value ) / dividendoModalidad
    this.interesPeriodo = (interesPeriodoNumber).toFixed(2);

    //gastos administrativos
    this.gastAdminPorc = Number( this.myForm.get('gastosAdministrativos').value );
    var gastAdminPeriodoNumber = this.gastAdminPorc / dividendoModalidad;
    this.gastAdminPeriodo = (gastAdminPeriodoNumber).toFixed(2);
    this.gastAdmin = Number(this.myForm.get('montoCapital').value) * (gastAdminPeriodoNumber / 100) * Number(this.myForm.get('plazoOperacion').value);

    //seguro vida
    this.segVidaPorc = Number( this.myForm.get('seguroVida').value );
    var segVidaPeriodoNumber = this.segVidaPorc / dividendoModalidad;
    this.segVidaPeriodo= (segVidaPeriodoNumber).toFixed(2);
    this.segVida = Number(this.myForm.get('montoCapital').value) * (Number(segVidaPeriodoNumber) / 100) * Number(this.myForm.get('plazoOperacion').value);

    //capital total
    this.capitalTotal = this.segVida + this.gastAdmin + Number(this.myForm.get('montoCapital').value);
  }

  addPeople(type: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    if(type === 'DEUDOR'){
      dialogConfig.data = { id: this.myForm.value.id, model: null, title:'Agregar Deudor' , addSpouse:true};
      this.peopleService.addModalPeople(null, <FormGroup>this.myForm.get('cliente').get('persona'), dialogConfig);
    }else if(type === 'CODEUDOR'){
      dialogConfig.data = { id: this.myForm.value.id, model: null, title:'Agregar Codeudor' , addSpouse:true};
      this.peopleService.addModalPeople(null, <FormGroup>this.myForm.get('codeudor'), dialogConfig);
    }
  }

  viewPeople(idSolicitud: number, idPersona: number,type: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { model: null, title:'Visualizar Deudor' };
    if(type === 'DEUDOR'){
      dialogConfig.data = { model: null, title:'Visualizar Deudor' };
    }else if(type === 'CODEUDOR'){
      dialogConfig.data = { model: null, title:'Visualizar Codeudor' };
    }
    dialogConfig.autoFocus = true;
    this.peopleService.viewModalPeopleSolicitud(idSolicitud, idPersona, type, dialogConfig);
  }

  getValue(data: any, form : any): void {
    (<FormControl>this.myForm.get(form)).setValue(data);
  }

  onSubmit() {}
  

  printLiquidacion(){
    //datos de fecha
    let fechaActual = moment(Date.now());

    //usuario
    var usuario;
    this.userService.getUser().subscribe((data) => {
      usuario = data;
    });

    //array de cuotas
    const arrayCuotas = this.myForm.get('cuotas').value;

    const pdf = new PdfMakeWrapper();
    pdf.pageSize('A4');
    pdf.info({
      title: 'liquidacion',
      author: 'web',
      subject: '',
  });

    pdf.header(new Stack([
      new Txt('FINANCORP - LIQUIDACION DE CREDITOS').alignment('center').bold().end,
      new Columns([ new Txt('Usuario: ' + usuario.username).alignment('center').bold().end, new Txt('Fecha: ' + fechaActual.format('DD/MM/YYYY')).alignment('center').bold().end, new Txt('Hora: ' + fechaActual.format('hh:mm:ss A')).alignment('center').bold().end ]).end,
      new Canvas([new Line(10, [400, 10]).end]).alignment('center').end
    ]).end);

    pdf.footer(
      (currentPage, pageCount) => {
        return new Txt('Pagina ' + currentPage.toString() + ' de ' + pageCount + ' ').alignment('right').end;
      }
    );
    
    pdf.add(
      pdf.ln(2)
    );
    
    pdf.add(
      new Columns([new Txt('Nro Credito: ' + this.myForm.get('id').value).alignment('left').bold().end, new Txt('Nro Solicitud: ' + this.myForm.get('propuestaSolicitud').value.id).alignment('left').bold().end]).end

    );

    pdf.add(
      new Columns([new Txt('Destino Credito: ' + this.myForm.get('tipoDestino').value.nombre).alignment('left').end, new Txt('Modalidad: ' + this.myForm.get('modalidad').value.nombre).alignment('left').end]).end

    );

    pdf.add(
      new Columns([new Txt('Forma de pago: ' + this.myForm.get('propuestaSolicitud').value.tipoPago.nombre).alignment('left').end, new Txt('T.A.N.: ' + this.myForm.get('tasaInteres').value + ' %').alignment('left').end]).end

    );

    pdf.add( 
      new Columns([new Txt('Sucursal: ' + this.myForm.get('sucursal').value.nombre).alignment('left').end, new Txt('Plazo: ' + this.myForm.get('plazoOperacion').value).alignment('left').end]).end

    );
    //fecha desembolso
    let fechaDesembolso = new Date(this.myForm.get('fechaDesembolso').value);
    let desembolso = moment(fechaDesembolso);

    //nombre cliente
    var nombreCliente = (this.myForm.get('propuestaSolicitud').value.cliente.persona.primerNombre == null ? '' : this.myForm.get('propuestaSolicitud').value.cliente.persona.primerNombre)
    + ' ' +
    (this.myForm.get('propuestaSolicitud').value.cliente.persona.segundoNombre == null ? '' : this.myForm.get('propuestaSolicitud').value.cliente.persona.segundoNombre)
    + ' ' +
    (this.myForm.get('propuestaSolicitud').value.cliente.persona.primerApellido == null ? '' : this.myForm.get('propuestaSolicitud').value.cliente.persona.primerApellido)
    + ' ' +
    (this.myForm.get('propuestaSolicitud').value.cliente.persona.segundoApellido == null ? '' : this.myForm.get('propuestaSolicitud').value.cliente.persona.segundoApellido);

    //doc cliente
    var doc = (this.myForm.get('propuestaSolicitud').value.cliente.persona.documento == null ? '' : this.myForm.get('propuestaSolicitud').value.cliente.persona.documento)
                              + (this.myForm.get('propuestaSolicitud').value.cliente.persona.ruc == null ? '' : '/' + this.myForm.get('propuestaSolicitud').value.cliente.persona.ruc);
    
    pdf.add(
      new Columns([new Txt('Cliente: ' + doc + ' ' + nombreCliente).alignment('left').end, new Txt('Fecha desembolso: ' + desembolso.format('DD/MM/YYYY')).alignment('left').end]).end

    );


    var filas = new Array();
    filas.push(['NRO CUOTA', 'ESTADO', 'FECHA VENCIMIENTO', 'MONTO CUOTA', 'INTERES', 'AMORTIZACION', 'SALDO']);
    arrayCuotas.forEach(element => filas.push([element.numeroCuota, element.cuotaEstado.nombre, element.fechaVencimiento, 
      new Intl.NumberFormat().format(Number(element.montoCuota)), 
      new Intl.NumberFormat().format(Number(element.interes)), 
      new Intl.NumberFormat().format(Number(element.amortizacion)), 
      new Intl.NumberFormat().format(Number(element.saldoCapital))]));
    
    //calcula total interes
    var totalInteres = 0;
    arrayCuotas.forEach(element => totalInteres = totalInteres + Number(element.interes));

    pdf.add(
      new Columns([new Txt('Monto Capital: ' + new Intl.NumberFormat().format(this.capitalTotal)).alignment('left').end, new Txt('Monto Interes: ' + new Intl.NumberFormat().format(totalInteres)).alignment('left').end]).end

    );

    
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
    
    
    pdf.create().open();
  }


  async printPagare(){
    
    const pdf = new PdfMakeWrapper();
    pdf.pageSize('A4');
    pdf.info({
      title: 'pagare',
      author: 'web',
      subject: '',
    });

    pdf.header(new Stack([
      await new Img('assets/images/logoDocumento.png').build(),
      new Txt('FINANCORP').alignment('center').bold().end
    ]).end);

    pdf.footer(
      (currentPage, pageCount) => {
        return new Txt('Pagina ' + currentPage.toString() + ' de ' + pageCount + ' ').alignment('right').end;
      }
    );

    pdf.add(
      pdf.ln(5)
    );

    pdf.add(new Txt('PAGARE   A  LA  ORDEN ').alignment('center').bold().end);
    pdf.add(
      pdf.ln(2)
    );
    var numeroLetras = NumeroALetras(this.capitalTotal);
    pdf.add(new Txt('Guaraníes (números): ' + new Intl.NumberFormat().format(this.capitalTotal)).alignment('left').bold().end);
    pdf.add(new Txt('En Fecha: ').alignment('left').bold().end);
    pdf.add(new Txt('Pagaré (mos) solidariamente libre de gastos y sin protesto, a la orden de: ').alignment('left').bold().end);
    pdf.add(new Txt('La suma de Guaraníes (letras): ' + numeroLetras).alignment('left').bold().end);
    pdf.add(
      pdf.ln(2)
    );
    pdf.add(new Txt('Por igual valor recibido en efectivo a mi (nuestra) entera satisfacción. La mora se producirá por el mero vencimiento del plazo arriba indicado, sin necesidad de protesto ni de ningún requerimiento judicial o extrajudicial por parte del acreedor. La falta de pago de una cuota a su vencimiento originará automáticamente el decaimiento de los plazos señalados en este y los demás documentos, produciéndose de pleno derecho el vencimiento anticipado de las cuotas no vencidas y cualquier otro documento obligacional que obrare en poder del acreedor pudiendo exigir el pago inmediato del saldo total de la deuda. Es obligación del (los) deudor (es) pagar un interés moratorio de……...........…% por el tiempo de la mora hasta el pago total de este documento, además de un interés punitorio equivalente al………...........% sobre los intereses moratorios. El pago de los intereses moratorios y punitorios no implicara novación, prórroga, espera o extinción de la obligación principal.').alignment('left').end);
    pdf.add(new Txt('Este pagaré se rige por las leyes de la República del Paraguay y en especial por los artículos n°: 51, 53 siguientes y concordantes de la ley 489/95. El simple vencimiento de una cuota autoriza al acreedor de forma irrevocable a la consulta e inclusión a la base de datos de INFORMCONF u otra agencia de informaciones. A todos los efectos legales y procesales queda aceptada la jurisdicción y competencia de los juzgados en lo civil y comercial de la Circunscripción Judicial de Asunción.').alignment('left').end);
    pdf.add(new Txt('La posesión de este pagaré por el deudor o cualquier persona no acreditara su pago al acreedor si no se acompaña con el recibo de pago emitido por el acreedor. -').alignment('left').end);

      pdf.add(
      pdf.ln(2)
    );
    //datos deudor
    //nombre cliente
    var nombreCliente = (this.myForm.get('propuestaSolicitud').value.cliente.persona.primerNombre == null ? '' : this.myForm.get('propuestaSolicitud').value.cliente.persona.primerNombre)
    + ' ' +
    (this.myForm.get('propuestaSolicitud').value.cliente.persona.segundoNombre == null ? '' : this.myForm.get('propuestaSolicitud').value.cliente.persona.segundoNombre)
    + ' ' +
    (this.myForm.get('propuestaSolicitud').value.cliente.persona.primerApellido == null ? '' : this.myForm.get('propuestaSolicitud').value.cliente.persona.primerApellido)
    + ' ' +
    (this.myForm.get('propuestaSolicitud').value.cliente.persona.segundoApellido == null ? '' : this.myForm.get('propuestaSolicitud').value.cliente.persona.segundoApellido);

    pdf.add(new Txt('Datos del Deudor').alignment('center').bold().end); 
    pdf.add(
      pdf.ln(1)
    );
    pdf.add(new Txt('Nombres y Apellidos: ' + nombreCliente).alignment('left').bold().end);
    pdf.add(new Txt('Numero de Cedula: ' + this.myForm.get('propuestaSolicitud').value.cliente.persona.documento).alignment('left').bold().end);
    pdf.add(
      pdf.ln(3)
    );
    pdf.add(new Txt('FIRMA: _______________________________').height(50).alignment('left').bold().end);
    pdf.add(
      pdf.ln(2)
    );
    pdf.add(new Txt('Aclaración de firma: ').alignment('left').bold().end);

    if(this.myForm.get('propuestaSolicitud').value.cliente.persona.conyuge != null){
      //solo si existe datos del conyuge
      pdf.add(
        pdf.ln(2)
      );
      var obj = this.myForm.get('propuestaSolicitud').value.cliente.persona.conyuge;
      var nombreConyu = (obj.primerNombre == null ? '' : obj.primerNombre)
      + ' ' +
      (obj.segundoNombre == null ? '' : obj.segundoNombre)
      + ' ' +
      (obj.primerApellido == null ? '' : obj.primerApellido)
      + ' ' +
      (obj.segundoApellido == null ? '' : obj.segundoApellido);

      pdf.add(new Txt('Datos del Cónyuge').alignment('center').bold().end); 
      pdf.add(
        pdf.ln(1)
      );
      pdf.add(new Txt('Nombres y Apellidos: ' + nombreConyu).alignment('left').bold().end);
      pdf.add(new Txt('Numero de Cedula: ' + obj.documento).alignment('left').bold().end);
      pdf.add(
        pdf.ln(3)
      );
      pdf.add(new Txt('FIRMA: _______________________________').height(50).alignment('left').bold().end);
      pdf.add(
        pdf.ln(2)
      );
      pdf.add(new Txt('Aclaración de firma: ').alignment('left').bold().end);

    }

    if(this.myForm.get('propuestaSolicitud').value.codeudor != null){
      //solo si existe datos del conyuge
      pdf.add(
        pdf.ln(2)
      );
      var objCodeudor = this.myForm.get('propuestaSolicitud').value.codeudor;
      var nombreCodeudor = (objCodeudor.primerNombre == null ? '' : objCodeudor.primerNombre)
      + ' ' +
      (objCodeudor.segundoNombre == null ? '' : objCodeudor.segundoNombre)
      + ' ' +
      (objCodeudor.primerApellido == null ? '' : objCodeudor.primerApellido)
      + ' ' +
      (objCodeudor.segundoApellido == null ? '' : objCodeudor.segundoApellido);

      pdf.add(new Txt('Datos del Codeudor').alignment('center').bold().end); 
      pdf.add(
        pdf.ln(1)
      );
      pdf.add(new Txt('Nombres y Apellidos: ' + nombreCodeudor).alignment('left').bold().end);
      pdf.add(new Txt('Numero de Cedula: ' + objCodeudor.documento).alignment('left').bold().end);
      pdf.add(
        pdf.ln(3)
      );
      pdf.add(new Txt('FIRMA: _______________________________').height(50).alignment('left').bold().end);
      pdf.add(
        pdf.ln(2)
      );
      pdf.add(new Txt('Aclaración de firma: ').alignment('left').bold().end);

    }
    
   

    pdf.create().open();
  }

}
