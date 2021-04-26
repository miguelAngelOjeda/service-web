import { Component, OnInit, EventEmitter, ViewChild, AfterViewInit  } from '@angular/core';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { UserService, ApiService, FormsService} from '../../../core/services';
import { SnackbarService } from '../../../shared';
import { Router, CanActivate, ActivatedRoute} from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { CreditsService } from '../credits.service';
import { PeopleService } from '../../shared/people/people.service';
import { Message } from '../../../core/models';
import { DeleteDialogComponent } from '../../../shared';
import { MatDialog, PageEvent, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig, MAT_DATE_LOCALE } from '@angular/material';
import { EditModalPeopleComponent, AddModalPeopleComponent, ViewModalPeopleComponent } from '../../shared/people';
import { environment } from '../../../../environments/environment';
import * as moment from 'moment';
import { CuotaDesembolso } from 'src/app/core/models/CuotaDesembolso';


@Component({
  selector: 'app-edit-credits',
  templateUrl: './edit-credits.component.html',
  styleUrls: ['./edit-credits.component.scss']
})
export class EditCreditsComponent implements OnInit {
  myForm: FormGroup;
  validateForm = true;
  isSeparacionBienes = true;
  isTieneHipoteca = 0;
  urlImage = environment.api_url;
  interesPeriodo: string;
  interesPeriodoNumber :number;
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
              private apiService: ApiService) { }

  ngOnInit() {
    //datos para calculos
    this.cuotas = new Array();
    this.interesPeriodo = '0';
    this.interesPeriodoNumber = 0;
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
    this.apiService.get('/creditos/' + this.route.snapshot.params.id)
    .subscribe(res => {
      
      if(res.status == 200){
        this.myForm.patchValue(res.model,{emitEvent: false});
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

  thousands_separators(num)
  {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
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
    this.interesPeriodoNumber = Number(this.myForm.get('tasaInteres').value ) / dividendoModalidad
    this.interesPeriodo = (this.interesPeriodoNumber).toFixed(2);

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

  actualizarDatos(){
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

    //gastos administrativos
    var gastAdminPeriodoNumber = this.gastAdminPorc / dividendoModalidad;
    this.gastAdminPeriodo = (gastAdminPeriodoNumber).toFixed(2);
    this.gastAdmin = Number(this.myForm.get('montoCapital').value) * (gastAdminPeriodoNumber / 100) * Number(this.myForm.get('plazoOperacion').value);
    
    //seguro vida
    var segVidaPeriodoNumber = this.segVidaPorc / dividendoModalidad;
    this.segVidaPeriodo= (segVidaPeriodoNumber).toFixed(2);
    this.segVida = Number(this.myForm.get('montoCapital').value) * (segVidaPeriodoNumber / 100) * Number(this.myForm.get('plazoOperacion').value);

    //capital total
    this.capitalTotal = this.segVida + this.gastAdmin + Number(this.myForm.get('montoCapital').value);
  }

  calcularCuota() {
    
    this.cuotas = new Array();
    
    let fechas = [];
    let fechaActual = Date.now();
    let mesActual = moment(fechaActual);

    let montoSol = this.myForm.get('montoCapital').value;
    let plazo = this.myForm.get('plazoOperacion').value;
    let tasaAnual = (this.myForm.get('tasaInteres').value == null || this.myForm.get('tasaInteres').value == '0' || this.myForm.get('tasaInteres').value == 0) ? this.myForm.get('modalidad').value.interes : this.myForm.get('tasaInteres').value;
    var gastosAdmin = (this.myForm.get('gastosAdministrativos').value == null || this.myForm.get('gastosAdministrativos').value == '0' || this.myForm.get('gastosAdministrativos').value == 0) ? this.myForm.get('modalidad').value.gastosAdministrativos : this.myForm.get('gastosAdministrativos').value;
    var seguroVida = (this.myForm.get('seguroVida').value == null || this.myForm.get('seguroVida').value == '' || this.myForm.get('seguroVida').value == 0) ? this.myForm.get('modalidad').value.seguroVida : this.myForm.get('seguroVida').value;
    
    this.getValue(gastosAdmin , 'gastosAdministrativos');
    this.getValue(seguroVida, 'seguroVida');

    let dividendoModalidad = this.myForm.get('modalidad').value.dividendoCalculo;
    var calculo = dividendoModalidad.split('*');

    let pagoInteres=0, pagoCapital = 0, cuota = 0;
    
    //tasa interes por periodo
    let tasaAnualPeriodo = (Number(tasaAnual) / Number(calculo[0].trim())) * Number(calculo[1].trim());

    //gastos administrativos por periodo
    let gastosAdminPeriodo = (Number(gastosAdmin) / Number(calculo[0].trim())) * Number(calculo[1].trim());
    let montogastosAdmin = Number(montoSol) * (gastosAdminPeriodo / 100) * Number(plazo);
    montogastosAdmin = Number(montogastosAdmin.toFixed(0));

    //seguro de vida por periodo
    let seguroVidaPeriodo = (Number(seguroVida) / Number(calculo[0].trim())) * Number(calculo[1].trim());
    let montoseguroVida = Number(montoSol) * (seguroVidaPeriodo / 100) * Number(plazo);
    montoseguroVida = Number(montoseguroVida.toFixed(0));

    //TOTAL A DESEMBOLSAR
    this.capitalTotal = montoseguroVida + montogastosAdmin + Number(montoSol);
    this.capitalTotal = Number(this.capitalTotal.toFixed(0));
    let monto = this.capitalTotal;

    this.getValue(montogastosAdmin , 'montoGastosAdmin');
    this.getValue(montoseguroVida, 'montoSeguroVida');
    this.getValue(this.capitalTotal, 'montoTotal');

    cuota = this.capitalTotal * (Math.pow(1+tasaAnualPeriodo/100, Number(plazo))*tasaAnualPeriodo/100)/(Math.pow(1+tasaAnualPeriodo/100, Number(plazo))-1);

    var cd = new CuotaDesembolso();
    cd.numeroCuota = 0;
    cd.fechaVencimiento = mesActual.format('DD-MM-YYYY');
    cd.montoCuota = 0;
    cd.interes = 0;
    cd.amortizacion = 0;
    cd.saldoCapital = this.capitalTotal;
    this.cuotas.push(cd);

    //calculo por fecha vencimiento
    var interesAdicionalFechaVenc = 0;
    fechas[0] = mesActual.format('DD-MM-YYYY');
    
    if(this.myForm.get('fechaVencimiento').value != null) {
      let fechaSeleccionada = new Date(this.myForm.get('fechaVencimiento').value);
      let mesSelecc = moment(fechaSeleccionada);
      var periodoCapital = (this.myForm.get('modalidad').value.periodoCapital == null || this.myForm.get('modalidad').value.periodoCapital == '' || this.myForm.get('modalidad').value.periodoCapital == '0') ? '30' : this.myForm.get('modalidad').value.periodoCapital;

      var diffDays = mesSelecc.diff(mesActual, 'days')
 
      if(diffDays - Number(periodoCapital) >= 0) {
        interesAdicionalFechaVenc = ( (Number(tasaAnual)/100) / 365) * (diffDays - Number(periodoCapital)) * this.capitalTotal;
        mesActual = mesSelecc;
      } else {
        //this.myForm.controls['fechaVencimiento'].setValue(null);
        mesActual = this.calcularFechaVencimiento(mesActual);
        this.getValue(new Date(mesActual.format()) , 'fechaVencimiento');
      }

    } else {
      mesActual = this.calcularFechaVencimiento(mesActual);
      this.getValue(new Date(mesActual.format()) , 'fechaVencimiento');
    }

    
    var fechaAnt = null;
    
    for(let i = 1; i <= Number(plazo); i++) {

      pagoInteres = (monto*(tasaAnualPeriodo/100));
      pagoCapital = cuota - pagoInteres;
      monto = (monto - pagoCapital);      
      fechaAnt = moment(fechas[i-1], "DD-MM-YYYY");
      cd = new CuotaDesembolso();
      
      if(i == 1){
        var primerCuota = cuota + interesAdicionalFechaVenc;
        cd.montoCuota = Number(primerCuota.toFixed(0));
      } else {
        cd.montoCuota = Number(cuota.toFixed(0));
      }

      //Formato fechas
      fechas[i] = mesActual.format('DD-MM-YYYY');
      mesActual = this.calcularFechaVencimiento(mesActual);

      cd.numeroCuota = i;
      cd.fechaVencimiento = fechas[i];
      cd.interes = Number(pagoInteres.toFixed(0));
      cd.amortizacion = Number(pagoCapital.toFixed(0));
      cd.saldoCapital = Number(monto.toFixed(0));
      this.cuotas.push(cd);

    }

    this.getValue(this.cuotas , 'cuotas');

  }

  onSubmit() {
    
    this.apiService.post('/cuotaDesembolso', this.myForm.value)
    .subscribe(res => {
      if(res.status == 200){
        this.router.navigateByUrl('service-web/credits');
      }
    });
  }

  transferirPropuesta(id: number) {
    this.apiService.put('/solicitud_creditos/transferir/' + id)
    .subscribe(res => {
      if(res.status == 200){
        this.router.navigateByUrl('service-web/credits');
      }
    });
  }

  editPeople(idSolicitud: number, idPersona: number, type: string) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;

      if(type === 'DEUDOR'){
        dialogConfig.data = { id: this.myForm.value.id, model: null, title:'Editar Deudor' , addSpouse:true};
        this.peopleService.editModalPeopleSolicitud(idSolicitud, idPersona, type, <FormGroup>this.myForm.get('cliente').get('persona'), dialogConfig);
      }else if(type === 'CODEUDOR'){
        dialogConfig.data = { id: this.myForm.value.id, model: null, title:'Editar Codeudor' , addSpouse:true};
        this.peopleService.editModalPeopleSolicitud(idSolicitud, idPersona, type, <FormGroup>this.myForm.get('codeudor'), dialogConfig);
      }
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

  delete(data: any){
    if(data.id){
      const message = new Message;
      message.titulo = "Eliminar Registro"
      message.texto = "Esta seguro que desea eliminar el registro!! ";

      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = message;

      let dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.apiService.delete('/solicitud_creditos/' + data.id)
          .subscribe(res => {
              if(res.status == 200){
                this.router.navigateByUrl('service-web/solicitud_creditos');
              }
          });
        }
      })
    }
  }

}
