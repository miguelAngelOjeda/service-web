import { Component, OnInit } from '@angular/core';
import { Router, CanActivate, ActivatedRoute} from '@angular/router';
import { UserService, ApiService} from '../../../../core/services';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators} from '@angular/forms';
import { ViewModalPeopleComponent } from '../../../shared/people';
import { MatDialog, PageEvent, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';
import { PeopleService } from '../../../shared/people/people.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  myForm: FormGroup;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private peopleService: PeopleService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.initFormBuilder();
    this.apiService.get('/analisis_solicitudes/analizar/' + this.route.snapshot.params.id)
    .subscribe(res => {
      if(res.status == 200){
        this.myForm.patchValue(res.model);
        //Cargar Ocupaciones
        if(res.model.detalles != null &&  res.model.detalles.length > 0){
          const detalles = (<FormArray>this.myForm.get('detalles'));
          if(detalles){
            while (detalles.length) {
              detalles.removeAt(0);
            }
            res.model.detalles.forEach(staff => {
              detalles.push(this.formBuilder.group(staff));
            });
          }
        }
      }
    });
  }

  viewPeople(idSolicitud: number, idPersona: number,type: string) {
    const dialogConfig = new MatDialogConfig();

    if(type === 'DEUDOR'){
      dialogConfig.data = { model: null, title:'Visualizar Deudor' };
    }else if(type === 'CONY_DEUDOR'){
      dialogConfig.data = { model: null, title:'Visualizar Conyuge Deudor' };
    }else if(type === 'CODEUDOR'){
      dialogConfig.data = { model: null, title:'Visualizar Codeudor' };
    }else if(type === 'CONY_CODEUDOR'){
      dialogConfig.data = { model: null, title:'Visualizar Conyuge Codeudor' };
    }

    dialogConfig.autoFocus = true;
    this.peopleService.viewModalPeopleSolicitud(idSolicitud, idPersona, type, dialogConfig);
  }

  initFormBuilder() {
    this.myForm = this.formBuilder.group({
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
      funcionarioAnalisis: null,
      funcionarioVerificador: null,
      propuestaSolicitud: null,
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
  }

}
