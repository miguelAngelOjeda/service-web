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
    this.cuotas = null;
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
    //this.error =false;
    this.cuotas = new Array();
    const llenarTabla = document.querySelector('#lista-tabla tbody');
    while(llenarTabla.firstChild){
        llenarTabla.removeChild(llenarTabla.firstChild);
    }

    if(this.fechaVencimiento == null || '' == this.fechaVencimiento){
      //this.error =true;
    } else {
      let fechas = [];
      let fechaSeleccionada = new Date(this.fechaVencimiento);
      let mesSelecc = moment(fechaSeleccionada);
      
      let fechaActual = Date.now();
      let mesActual = moment(fechaActual);

      let pagoInteres=0, pagoCapital = 0, cuota = 0;
      //this.capitalTotal = 1620000;
      let monto = this.capitalTotal;
      
      cuota = this.capitalTotal * (Math.pow(1+this.interesPeriodoNumber/100, Number(this.myForm.get('plazoOperacion').value))*this.interesPeriodoNumber/100)/(Math.pow(1+this.interesPeriodoNumber/100, Number(this.myForm.get('plazoOperacion').value))-1);
      const row = document.createElement('tr');
          row.innerHTML = `
              <td>0</td>
              <td>${mesActual.format('DD/MM/YYYY') + ' (fecha desembolso)'}</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>${new Intl.NumberFormat().format(this.capitalTotal)}</td>
          `;
          llenarTabla.appendChild(row);

        var cd = new CuotaDesembolso();
        cd.numeroCuota = 0;
        cd.fechaVencimiento = mesActual.format('DD-MM-YYYY');
        cd.montoCuota = 0;
        cd.interes = 0;
        cd.amortizacion = 0;
        cd.saldoCapital = this.capitalTotal;
        this.cuotas.push(cd);

      for(let i = 1; i <= Number(this.myForm.get('plazoOperacion').value); i++) {

          pagoInteres = (monto*(this.interesPeriodoNumber/100));
          pagoCapital = cuota - pagoInteres;
          monto = (monto - pagoCapital);

          //Formato fechas
          fechas[i] = mesSelecc.format('DD-MM-YYYY');
          mesSelecc.add(1, 'month');

          const row = document.createElement('tr');
          row.innerHTML = `
              <td>${i}</td>
              <td>${fechas[i]}</td>
              <td>${new Intl.NumberFormat().format(Number(cuota.toFixed(0)))}</td>
              <td>${new Intl.NumberFormat().format(Number(pagoInteres.toFixed(0)))}</td>
              <td>${new Intl.NumberFormat().format(Number(pagoCapital.toFixed(0)))}</td>
              <td>${new Intl.NumberFormat().format(Number(monto.toFixed(0)))}</td>
          `;
          llenarTabla.appendChild(row);

          cd = new CuotaDesembolso();
          cd.numeroCuota = i;
          cd.fechaVencimiento = fechas[i];
          cd.montoCuota = Number(cuota.toFixed(0));
          cd.interes = Number(pagoInteres.toFixed(0));
          cd.amortizacion = Number(pagoCapital.toFixed(0));
          cd.saldoCapital = Number(monto.toFixed(0));
          this.cuotas.push(cd);
      }
    }

    
}

  onSubmit() {
    
    var json = {"idCredito": this.myForm.get('id').value,
      "idTipoDesembolso":this.myForm.get('tipoDesembolso').value.id,
      "gastosAdministrativos":this.gastAdminPorc,
      "seguroVida":this.segVidaPorc,
      "montoDesembolsado": this.myForm.get('montoCapital').value,
      "cuotas":this.cuotas
    
    };
    this.apiService.post('/cuotaDesembolso', json)
    .subscribe(res => {
      if(res.status == 200){
        this.router.navigateByUrl('service-web/credits');
        console.log('Ok');
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
