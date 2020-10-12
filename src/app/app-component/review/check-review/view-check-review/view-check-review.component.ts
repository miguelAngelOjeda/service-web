import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../../review.service';
import { Router, CanActivate, ActivatedRoute} from '@angular/router';
import { UserService, ApiService} from '../../../../core/services';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators} from '@angular/forms';
import { ViewModalPeopleComponent } from '../../../shared/people';
import { MatDialog, PageEvent, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';
import { PeopleService } from '../../../shared/people/people.service';

@Component({
  selector: 'app-view-check-review',
  templateUrl: './view-check-review.component.html',
  styleUrls: ['./view-check-review.component.scss']
})
export class ViewCheckReviewComponent implements OnInit {
  myForm: FormGroup;
  totalEgreso : number;
  totalIngresoAux : number;
  totalIngresoAuxPorc : number;
  totalEgresoCreditoAux: number;
  totalEgresoCreditoAuxPorc : number;
  porcentajeEndeudableAux: string;
  isSemanal: boolean; 

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
    this.totalEgresoCreditoAux = 0;
    this.totalEgresoCreditoAuxPorc = 0;
    this.isSemanal = false;
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

              //Calculo capacidad

              if(res.model.propuestaSolicitud.modalidad.nombre == "CREDITOS SEMANALES"){
                this.totalIngresoAux = staff.ingresoTotal / 4;
                this.isSemanal = true;
              } else {
                this.totalIngresoAux = staff.ingresoTotal;
              }

              this.totalIngresoAuxPorc = this.totalIngresoAux * (res.model.porcentajeEndeudamiento / 100);

              var numb = this.totalEgresoCreditoAux / this.totalIngresoAux;
              this.porcentajeEndeudableAux = numb.toFixed(2);

              numb = (res.model.propuestaSolicitud.importeCuota / this.totalIngresoAux)*100;

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

  procesaPropagarEgresoCredito(totalEgressCredit:number) {
    if(this.totalEgresoCreditoAux != null && this.totalEgresoCreditoAux != 0){
      this.totalEgreso = this.totalEgreso - this.totalEgresoCreditoAux;
    }
    
    this.totalEgreso = this.totalEgreso + Number(totalEgressCredit);
    this.totalEgresoCreditoAux = Number(totalEgressCredit);

    if( this.isSemanal){
      this.totalEgresoCreditoAuxPorc = this.totalEgresoCreditoAux / 4;
    } else {
      this.totalEgresoCreditoAuxPorc = this.totalEgresoCreditoAux;
    }

    //calculo de procentajes
    this.porcentajeEndeudableAux = ((this.totalEgresoCreditoAuxPorc / this.totalIngresoAux)*100 ).toFixed(2);

  }

}
