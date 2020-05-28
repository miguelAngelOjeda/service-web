import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../review.service';
import { Router, CanActivate, ActivatedRoute} from '@angular/router';
import { UserService, ApiService} from '../../../core/services';
import { ModalInformconfComponent } from '../../shared/informconf/modal-informconf';
import { HttpParams } from '@angular/common/http';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators} from '@angular/forms';
import { ViewModalPeopleComponent } from '../../shared/people';
import { MatDialog, PageEvent, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';
import { PeopleService } from '../../shared/people/people.service';

@Component({
  selector: 'app-view-review',
  templateUrl: './view-review.component.html',
  styleUrls: ['./view-review.component.scss']
})
export class ViewReviewComponent implements OnInit {
  myForm: FormGroup;

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
    this.apiService.get('/analisis_solicitudes/' + this.route.snapshot.params.id)
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

}
