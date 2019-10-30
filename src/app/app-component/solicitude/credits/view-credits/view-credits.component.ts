import { Component, OnInit, EventEmitter, ViewChild, AfterViewInit  } from '@angular/core';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { UserService, ApiService, FormsService} from '../../../../core/services';
import { SnackbarService } from '../../../../shared';
import { Router, CanActivate, ActivatedRoute} from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { CreditsService } from '../../credits/credits.service';
import { PeopleService } from '../../../shared/people/people.service';
import { MatDialog, PageEvent, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';
import { EditModalPeopleComponent, AddModalPeopleComponent, ViewModalPeopleComponent } from '../../../shared/people';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-view-credits',
  templateUrl: './view-credits.component.html',
  styleUrls: ['./view-credits.component.scss']
})
export class ViewCreditsComponent implements OnInit {
  myForm: FormGroup;
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
        this.myForm.patchValue(res.model);
      }
    });
  }

  transferirPropuesta(id: number) {
    this.creditsService.transferirPropuesta(id);
  }

  abandonarPropuesta(id: number) {
    this.creditsService.abandonarPropuesta(id);
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

  delete(data: any){
    this.creditsService.delete(data);
  }

}
