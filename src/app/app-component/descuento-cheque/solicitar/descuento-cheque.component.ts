import { Component, OnInit} from '@angular/core';
import { ApiService, UserService} from '../../../core/services';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { DescuentoChequeModel } from 'src/app/core/models/decuentoCheque';
import * as moment from 'moment';
import * as $ from 'jquery';
import { Canvas, Columns, Img, Line, Ol, PdfMakeWrapper, Stack, Table, Txt, Ul } from 'pdfmake-wrapper';

@Component({
  selector: 'app-descuento-cheque',
  templateUrl: './descuento-cheque.component.html',
  styleUrls: ['./descuento-cheque.component.scss']
})
export class DescuentoChequeComponent implements OnInit {

  url:string;
  myForm: FormGroup;
  documentos: DescuentoChequeModel[];

  constructor(private formBuilder: FormBuilder,
    private apiService: ApiService,
    private userService: UserService) {}



  ngOnInit() {
    this.myForm = this.formBuilder.group({
      cliente : [null, [Validators.required]],
      ruc : [null, [Validators.required]],
      fechaDescuento : new Date(),
      interesPeriodo : 2,
      gastosPeriodo : 0.50,
      moneda: null,
      totalValor: 0,
      totalInteres: 0,
      totalGastos: 0,
      totalDesc: 0,
      totalValor2: 0,
      totalInteres2: 0,
      totalGastos2: 0,
      totalIva2: 0,
      totalDesembolso2: 0,
      cambioDolar: 6550
    });
    this.documentos = new Array();

  }

  setValue(data: any, form : any): void {
    (<FormControl>this.myForm.get(form)).setValue(data);
  }


  onSubmit() {  }

  changeMoneda(){
    this.setValue(0, 'totalValor');
    this.setValue(0, 'totalInteres');
    this.setValue(0, 'totalGastos');
    this.setValue(0, 'totalDesc');
    for (var i = 0; i < this.documentos.length; i++) {
      this.documentos[i].moneda = this.myForm.get('moneda').value;
      this.changeValor(this.documentos[i]);
    }
    
  }

  changeFecha(docu){

    //console.log(docu);

    var fechaDocu = docu.fechaPago;
    var fechaDescuento = this.myForm.get('fechaDescuento').value;
    
    if( fechaDescuento != null && fechaDocu != null){
      let mdesc = moment(fechaDescuento);
      let mdocu = moment(fechaDocu);

      docu.dias = mdocu.diff(mdesc, 'days');mdocu
      
    } else {
      docu.dias = 0;
    }

    this.changeValor(docu);
     
  }

  getTotals(){

    var totalValor = 0;
    var totalInt = 0;
    var totalGast = 0;
    var totalDesc = 0;
    var valor;
    for (var i = 0; i < this.documentos.length; i++) {
      valor = this.documentos[i].valorDocumento.toString();
      if(this.documentos[i].valorDocumento != null){
        totalValor += Number(valor.replaceAll(",", ""));
      }

      if(this.documentos[i].interes != null){
        totalInt += Number(this.documentos[i].interes);
      }
      if(this.documentos[i].gastosAdministrativos != null){
        totalGast += Number(this.documentos[i].gastosAdministrativos);
      }
      if(this.documentos[i].capitalDescontado != null){
        totalDesc += Number(this.documentos[i].capitalDescontado);
      }

    }

    var maxDecimals = 0;
    var cambio = 1;
    if(this.myForm.get('moneda').value != null && this.myForm.get('moneda').value == 'USD'){
      maxDecimals = 0;
      cambio = Number(this.myForm.get('cambioDolar').value);
    }

    this.setValue(totalValor, 'totalValor');
    this.setValue(totalInt, 'totalInteres');
    this.setValue(totalGast, 'totalGastos');
    this.setValue(totalDesc, 'totalDesc');

    var valor2 = totalValor * cambio;
    this.setValue(Number(valor2.toFixed(maxDecimals)), 'totalValor2');

    var totalInteres2 = (Number(totalInt.toFixed(maxDecimals)) /1.1 ) * -1;
    totalInteres2 = totalInteres2 * cambio;
    this.setValue(Number(totalInteres2.toFixed(maxDecimals)), 'totalInteres2');

    var totalGastos2 = (Number(totalGast.toFixed(maxDecimals)) /1.1 ) * -1;
    totalGastos2 = totalGastos2 * cambio;
    this.setValue( Number(totalGastos2.toFixed(maxDecimals)), 'totalGastos2');

    var a = (totalInt/11);
    var b = (totalGast/11);
    var monto = (a + b) * (-1);
    monto = monto * cambio;
    this.setValue(Number(monto.toFixed(maxDecimals)), 'totalIva2');

    var totalDesembolso2 = valor2 + totalInteres2 + totalGastos2 + monto;
    this.setValue( Number(totalDesembolso2.toFixed(maxDecimals)), 'totalDesembolso2');

    
  }

  changeValor(docu) {
    
    if(docu.valorDocumento != null){
      var valor = Number(docu.valorDocumento.toString().replaceAll(",", ""));
      var interesP;
      var totalI = 0;
      var totalG = 0;
      var maxDecimals = 0;
      if(this.myForm.get('moneda').value != null && this.myForm.get('moneda').value == 'USD'){
        maxDecimals = 2;
      }
      if(this.myForm.get('interesPeriodo').value != null && this.myForm.get('interesPeriodo').value != 0){
        interesP = Number(this.myForm.get('interesPeriodo').value) / 100;
        totalI = (((interesP) / 30 ) *  docu.dias * valor * 1.1);
        docu.interes = totalI.toFixed(maxDecimals) ;
      } else {
        totalI = 0;
        docu.interes = '0';
      }

      if(this.myForm.get('gastosPeriodo').value != null && this.myForm.get('gastosPeriodo').value != 0){
        interesP = Number(this.myForm.get('gastosPeriodo').value) / 100;
        totalG = (((interesP) / 30 ) *  docu.dias * valor);
        docu.gastosAdministrativos = totalG.toFixed(maxDecimals) ;
      } else {
        totalG = 0;
        docu.gastosAdministrativos = '0';
      }

      docu.capitalDescontado = Number((valor - totalI - totalG).toFixed(maxDecimals));
      this.getTotals();
    }
  }

  changeValuesCab(){
    if(this.myForm.get('fechaDescuento').value != null && this.myForm.get('interesPeriodo').value != null && this.myForm.get('gastosPeriodo').value != null){
      for (var i = 0; i < this.documentos.length; i++) {

        this.changeFecha(this.documentos[i]);
      }
    }
  }

  addDoc() {
    
    if(this.documentos == null){
      this.documentos = new Array();
    }
    
    var obj = new DescuentoChequeModel();
    obj.moneda = this.myForm.get('moneda').value;
    obj.id = this.documentos.length + 1;
    if(this.documentos[obj.id - 2] != null && this.documentos[obj.id - 2].fechaEmision != null){
      obj.fechaEmision = this.documentos[obj.id - 2].fechaEmision
    }
    if(this.documentos[obj.id - 2] != null && this.documentos[obj.id - 2].valorDocumento != null){
      obj.valorDocumento = this.documentos[obj.id - 2].valorDocumento
    }

    if(this.documentos[obj.id - 2] != null && this.documentos[obj.id - 2].cedula != null){
      obj.cedula = this.documentos[obj.id - 2].cedula
    }

    if(this.documentos[obj.id - 2] != null && this.documentos[obj.id - 2].nombre != null){
      obj.nombre = this.documentos[obj.id - 2].nombre
    }

    if(this.documentos[obj.id - 2] != null && this.documentos[obj.id - 2].tipoDocumento != null){
      obj.tipoDocumento = this.documentos[obj.id - 2].tipoDocumento
    }

    this.documentos.push(obj); 

    
    
  }

  addCommas(event, docu){
    
    // skip for arrow keys
    if(event.which >= 37 && event.which <= 40) return;

    docu.valorDocumento = docu.valorDocumento.replace(/\D/g, "")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    ;

  }

  delDoc(docu){
    var pos = this.documentos.indexOf(docu);
    this.documentos.splice(pos, 1);
    var i;
    for (i = 0; i < this.documentos.length; i++) {
      this.documentos[i].id = i+1;
    }

    this.getTotals();
  }

   printDocumento(){
    const pdf = new PdfMakeWrapper();

    pdf.pageSize('LETTER');
    pdf.pageOrientation('landscape');
    pdf.pageMargins([ 10, 60, 10, 60 ]);
    pdf.info({
      title: 'A document',
      author: 'pdfmake-wrapper',
      subject: 'subject of document',
  });

    /*pdf.header(new Stack([
      await new Img('assets/images/logoDocumento.png').build()
    ]).end);*/

    pdf.footer(
      (currentPage, pageCount) => {
        return new Txt('Pagina ' + currentPage.toString() + ' de ' + pageCount + ' ').alignment('right').end;
      }
    );

    pdf.add(new Txt('LIQUIDACION - DESCUENTO DE DOCUMENTOS').alignment('center').bold().end);
    pdf.add(
      pdf.ln(2)
    );

    pdf.add(
      new Columns([new Txt('Cliente: ' + this.myForm.get('cliente').value).alignment('left').bold().end, new Txt('Fecha Descuento: ' + moment(this.myForm.get('fechaDescuento').value).format('DD-MM-YYYY')).alignment('left').bold().end]).end

    );

    pdf.add(
      new Columns([new Txt('N° RUC: ' + this.myForm.get('ruc').value).alignment('left').bold().end, new Txt('T. Interés Mensual: ' + this.myForm.get('interesPeriodo').value + '%').alignment('left').bold().end]).end

    );

    pdf.add(
      new Columns([new Txt('Moneda: ' + this.myForm.get('moneda').value).alignment('left').bold().end, new Txt('T. Gastos Admin. Mensual: ' + this.myForm.get('gastosPeriodo').value + '%').alignment('left').bold().end]).end

    );

    var filas = new Array();
    filas.push(['N°', 'N° C.I./RUC', 'Titular', 'Tipo Doc.', 'Fecha Emisión', 'Fecha Pago', 'Días', 'Mon.', 'Valor', 'Interes c/IVA', 'G. Admin. c/IVA', 'Capital Desc']);

    
    this.documentos.forEach(element => filas.push([element.id, element.cedula, element.nombre, element.tipoDocumento, moment(element.fechaEmision).format('DD-MM-YYYY'),
      moment(element.fechaPago).format('DD-MM-YYYY'), element.dias, element.moneda,
      element.valorDocumento, 
      new Intl.NumberFormat().format(Number(element.interes)), 
      new Intl.NumberFormat().format(Number(element.gastosAdministrativos)),
      new Intl.NumberFormat().format(Number(element.capitalDescontado))
    ]));

    filas.push(['', '', '', '', '', '', '', '',
     new Intl.NumberFormat().format(Number(this.myForm.get('totalValor').value)), 
     new Intl.NumberFormat().format(Number(this.myForm.get('totalInteres').value)), 
     new Intl.NumberFormat().format(Number(this.myForm.get('totalGastos').value)), 
     new Intl.NumberFormat().format(Number(this.myForm.get('totalDesc').value))]);

    pdf.add(
      pdf.ln(2)
    );

    pdf.add(
      new Table(filas).width( 'auto').end
    );

    pdf.add(
      pdf.ln(3)
    );

    pdf.add(new Txt('Liquidación:').alignment('center').bold().end);

    pdf.add(
      pdf.ln(1)
    );

    pdf.add(
      new Columns([new Txt('Total Documentos:').alignment('center').bold().end, new Txt(new Intl.NumberFormat().format(Number(this.myForm.get('totalValor2').value))).alignment('center').bold().end]).end

    );

    pdf.add(
      new Columns([new Txt('Total Intereses:').alignment('center').bold().end, new Txt(new Intl.NumberFormat().format(Number(this.myForm.get('totalInteres2').value))).alignment('center').bold().end]).end

    );

    pdf.add(
      new Columns([new Txt('Total G. Admin.:').alignment('center').bold().end, new Txt(new Intl.NumberFormat().format(Number(this.myForm.get('totalGastos2').value))).alignment('center').bold().end]).end

    );

    pdf.add(
      new Columns([new Txt('Total IVA:').alignment('center').bold().end, new Txt(new Intl.NumberFormat().format(Number(this.myForm.get('totalIva2').value))).alignment('center').bold().end]).end

    );

    //var totDes = this.myForm.get('totalValor').value + this.myForm.get('totalInteres2').value + this.myForm.get('totalGastos2').value + this.myForm.get('totalIva2').value ;

    pdf.add(
      new Columns([new Txt('DESEMBOLSO:').alignment('center').bold().end, new Txt(new Intl.NumberFormat().format(Number(this.myForm.get('totalDesembolso2').value))).alignment('center').bold().end]).end

    );


    pdf.add(
      pdf.ln(4)
    );

    pdf.add(
      new Columns([new Txt('Firma Cliente: _______________________________').alignment('left').bold().end, new Txt('FINANCORP: _______________________________').alignment('left').bold().end]).end

    );

    pdf.add(
      pdf.ln(2)
    );
    pdf.add(new Txt('Aclaracion:    _______________________________').alignment('left').bold().end);

    pdf.create().download();

  }

}
