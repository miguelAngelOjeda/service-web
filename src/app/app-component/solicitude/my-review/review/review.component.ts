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
    dialogConfig.data = { model: null, title:'Visualizar Deudor' };
    if(type === 'DEUDOR'){
      dialogConfig.data = { model: null, title:'Visualizar Deudor' };
    }else if(type === 'CODEUDOR'){
      dialogConfig.data = { model: null, title:'Visualizar Codeudor' };
    }
    dialogConfig.autoFocus = true;
    this.peopleService.viewModalPeopleSolicitud(idSolicitud, idPersona, dialogConfig);
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
      funcionarioAnalisis: this.formBuilder.group({
        id: [null],
        profesion: [null],
        documento: [null],
        nombre: null ,
        email: [null],
        sexo: [null],
        telefonoParticular: [null],
        telefonoSecundario: null,
        primerNombre: [null],
        segundoNombre: null,
        primerApellido: [null],
        segundoApellido: null }),
      funcionarioVerificador: null,
      propuestaSolicitud: null,
      detalles: this.formBuilder.array([
          this.formBuilder.group({
            id: [null],
            tipoRelacion: [null],
            idConyuge: [null],
            nombreConyuge: null ,
            saldoTotal: [null],
            montoTotalCuotas: [null],
            totalTarjeta: [null],
            totalTarjetaMinimo: null,
            montoTotalACancelar: [null],
            montoCuotaACancelar: null,
            ingresoTotal: [null],
            totalTarjetaCony: [null],
            montoTotalCuotasCony: [null],
            saldoTotalCony: [null],
            egresosTotal: null })])
    });
  }

}
