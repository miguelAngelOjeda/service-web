import { Component, OnInit, EventEmitter, ViewChild, AfterViewInit  } from '@angular/core';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { UserService, ApiService, FormsService} from '../../../../core/services';
import { SnackbarService } from '../../../../shared';
import { HttpParams } from '@angular/common/http';
import { CreditsService } from '../../credits/credits.service';
import { PeopleService } from '../../../shared/people/people.service';
import { Router, CanActivate, ActivatedRoute} from '@angular/router';
import { MatDialog, PageEvent, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';
import { EditModalPeopleComponent, AddModalPeopleComponent, ViewModalPeopleComponent } from '../../../shared/people';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-add-credits',
  templateUrl: './add-credits.component.html',
  styleUrls: ['./add-credits.component.scss']
})
export class AddCreditsComponent implements OnInit{
  myForm: FormGroup;
  validateForm = true;
  isSeparacionBienes = true;
  isTieneHipoteca = 0;
  urlImage = environment.api_url;

  constructor(
    private router: Router,
    private creditsService:CreditsService,
    private snackbarService: SnackbarService,
    private formBuilder: FormBuilder,
    private peopleService: PeopleService,
    private apiService: ApiService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.myForm = this.creditsService.initFormBuilder();
    this.creditsService.valueChange(this.myForm);
  }

  onSubmit() {
    this.apiService.post('/solicitud_creditos', this.myForm.value)
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

  editPeople(id: number, type: string) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;

      if(type === 'DEUDOR'){
        dialogConfig.data = { id: this.myForm.value.id, model: null, title:'Editar Deudor' , addSpouse:true};
        this.peopleService.editModalPeople(id, <FormGroup>this.myForm.get('cliente').get('persona'), dialogConfig);
      }else if(type === 'CODEUDOR'){
        dialogConfig.data = { id: this.myForm.value.id, model: null, title:'Editar Codeudor' , addSpouse:true};
        this.peopleService.editModalPeople(id, <FormGroup>this.myForm.get('codeudor'), dialogConfig);
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

  viewPeople(id: number,type: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { model: null, title:'Visualizar Deudor' };
    if(type === 'DEUDOR'){
      dialogConfig.data = { model: null, title:'Visualizar Deudor' };
    }else if(type === 'CODEUDOR'){
      dialogConfig.data = { model: null, title:'Visualizar Codeudor' };
    }
    dialogConfig.autoFocus = true;
    this.peopleService.viewModalPeople(id, dialogConfig);
  }


  getValue(data: any, form : any): void {
    (<FormControl>this.myForm.get(form)).setValue(data);
  }


}
