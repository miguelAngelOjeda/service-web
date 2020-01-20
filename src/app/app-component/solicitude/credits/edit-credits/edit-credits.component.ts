import { Component, OnInit, EventEmitter, ViewChild, AfterViewInit  } from '@angular/core';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { UserService, ApiService, ReviewService, PeopleService } from '@core/service';
import { SnackbarService } from '../../../../shared';
import { Router, CanActivate, ActivatedRoute} from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { CreditsService } from '../../credits/credits.service';
import { Message } from '../../../../core/models';
import { DeleteDialogComponent } from '../../../../shared';
import { MatDialog, PageEvent, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';
import { EditModalPeopleComponent, AddModalPeopleComponent, ViewModalPeopleComponent } from '../../../shared/people';
import { environment } from '../../../../../environments/environment';

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
    this.creditsService.valueChange(this.myForm);
    this.apiService.get('/solicitud_creditos/' + this.route.snapshot.params.id)
    .subscribe(res => {
      if(res.status == 200){
        this.myForm.patchValue(res.model,{emitEvent: false});
      }
    });
  }

  onSubmit() {
    this.creditsService.editar(this.route.snapshot.params.id, this.myForm);
  }

  transferirPropuesta(id: number) {
    this.creditsService.transferirPropuesta(id);
  }

  abandonarPropuesta(id: number) {
    this.creditsService.abandonarPropuesta(id);
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
    this.creditsService.delete(data);
  }

}
