import { Component, OnInit, OnChanges, EventEmitter, Output, Input, ElementRef } from '@angular/core';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators, ControlContainer, FormGroupDirective} from '@angular/forms';
import { MatDialog, PageEvent, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';
import { UserService, ApiService, FormsService} from '../../../../core/services';
import { PeopleService } from '../../people/people.service';
import { ViewModalPeopleComponent } from '../../people/view-modal-people';

@Component({
  selector: 'app-view-spouse',
  templateUrl: './view-spouse.component.html',
  styleUrls: ['./view-spouse.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class ViewSpouseComponent implements OnInit{
  viewSpouseForm: FormGroup;
  peopleForm: FormGroup;
  formName = 'conyuge';

  @Input()
  set fkFilterModel(model: any) {
    if(model){

    }
  }

  constructor(
    private controlContainer: ControlContainer,
    private parentF: FormGroupDirective,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private peopleService: PeopleService,
    public dialog: MatDialog
  ) {}


  ngOnInit() {
    this.viewSpouseForm = this.parentF.form;
    this.peopleForm = (<FormGroup>this.viewSpouseForm.get('persona'));
    this.peopleForm.addControl(this.formName, this.formBuilder.group({
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
      segundoApellido: null }));
  }

  viewPeople(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { model: null, title:'Visualizar Conyuge' };
    dialogConfig.autoFocus = true;
    this.peopleService.viewModalPeople(id, dialogConfig);
  }

}
