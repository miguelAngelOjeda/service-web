import { Component, OnInit } from '@angular/core';
import { Router, CanActivate, ActivatedRoute} from '@angular/router';
import { UserService, ApiService} from '../../../../core/services';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators} from '@angular/forms';
import { ViewModalPeopleComponent } from '../../../shared/people';
import { ModalInformconfComponent } from '../../../shared/informconf/modal-informconf';
import { HttpParams } from '@angular/common/http';
import { ReviewService } from '../../review.service';
import { MatDialog, PageEvent, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';
import { PeopleService } from '../../../shared/people/people.service';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  myForm: FormGroup;
  totalEgreso : number;
  totalEgresoCreditoAux: number;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private peopleService: PeopleService,
    private reviewService: ReviewService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.myForm = this.reviewService.initFormBuilder();
    this.apiService.get('/analisis_solicitudes/analizar/' + this.route.snapshot.params.id)
    .subscribe(res => {
      if(res.status == 200){
        this.myForm.patchValue(res.model);

        this.totalEgreso = 0;
        //Cargar Ocupaciones
        if(res.model.detalles != null &&  res.model.detalles.length > 0){
          const detalles = (<FormArray>this.myForm.get('detalles'));
          if(detalles){
            while (detalles.length) {
              detalles.removeAt(0);
            }
            res.model.detalles.forEach(staff => {

              //total ingreso
              var totalIngresos = 0;
              staff.persona.ingresos.forEach( (ingreso) => {
                totalIngresos = totalIngresos + ingreso.monto;
              });
              staff.ingresoTotal = totalIngresos;

              //total egreso
              totalIngresos = 0;
              staff.persona.egresos.forEach( (egreso) => {
                totalIngresos = totalIngresos + egreso.monto;
              });
              
              this.totalEgreso = this.totalEgreso + totalIngresos;

              //porcentajeCapacidad
              staff.porcentajeCapacidad = staff.ingresoTotal * (res.model.porcentajeEndeudamiento / 100);

              var numb = staff.egresosTotal / staff.ingresoTotal;
              staff.porcentajeDeudaEgreso = numb.toFixed(2);

              numb = res.model.propuestaSolicitud.importeCuota / staff.ingresoTotal;

              staff.porcentajeCreditoSol = numb.toFixed(2);

              let form = this.formBuilder.group(staff);
              this.reviewService.valueChanges(form,this.myForm);
              detalles.push(form);
            });
            //this.valueChanges();
          }
        }
      }
    });
  }

  onSubmit() {
    this.reviewService.review(this.route.snapshot.params.id,this.myForm);
  }

  reportInformconf(nroSolicitud: number, documento: string, tipo: string, historico: boolean) {
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.autoFocus = true;
    let variables = new HttpParams({fromObject :
      {
        'tipo' : tipo,
        'historico' : historico.toString(),
        'documento' : documento,
        'nroSolicitud' : nroSolicitud.toString()
      }});

    this.apiService.get('/informconf/solicitud',variables)
    .subscribe(res => {
      if(res.status == 200){
        matDialogConfig.data =  res.model;
        const dialogRef = this.dialog.open(ModalInformconfComponent, matDialogConfig);
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

  procesaPropagarEgresoCredito(totalEgressCredit:number) {
    if(this.totalEgresoCreditoAux != null && this.totalEgresoCreditoAux != 0){
      this.totalEgreso = this.totalEgreso - this.totalEgresoCreditoAux;
    }
    
    this.totalEgreso = this.totalEgreso + Number(totalEgressCredit);
    this.totalEgresoCreditoAux = Number(totalEgressCredit);
  }

}
