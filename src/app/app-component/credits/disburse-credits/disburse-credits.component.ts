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
import { MatDialog, PageEvent, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';
import { EditModalPeopleComponent, AddModalPeopleComponent, ViewModalPeopleComponent } from '../../shared/people';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-disburse-credits',
  templateUrl: './disburse-credits.component.html',
  styleUrls: ['./disburse-credits.component.scss']
})
export class DisburseCreditsComponent implements OnInit {
  myForm: FormGroup;
  validateForm = true;
  isSeparacionBienes = true;
  isTieneHipoteca = 0;
  urlImage = environment.api_url;

  constructor(private creditsService:CreditsService,
              private router: Router,
              private dialog: MatDialog,
              private route: ActivatedRoute,
              private snackbarService: SnackbarService,
              private formBuilder: FormBuilder,
              private peopleService: PeopleService,
              private apiService: ApiService) { }

  ngOnInit() {
    this.myForm = this.creditsService.initFormBuilder();
    this.apiService.get('/solicitud_creditos/' + this.route.snapshot.params.id)
    .subscribe(res => {
      if(res.status == 200){
        this.myForm.patchValue(res.model,{onlySelf: true, emitEvent: false});
      }
    });
  }

  onSubmit() {
    this.apiService.put('/solicitud_creditos/' + this.route.snapshot.params.id, this.myForm.value)
    .subscribe(res => {
      if(res.status == 200){
        this.myForm.patchValue(res.model,{onlySelf: true, emitEvent: false});
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
