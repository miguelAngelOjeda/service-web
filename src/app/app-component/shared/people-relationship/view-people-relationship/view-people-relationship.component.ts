import { Component, OnInit, OnChanges, EventEmitter, Output, Input, ElementRef } from '@angular/core';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators, ControlContainer, FormGroupDirective} from '@angular/forms';
import { MatDialog, PageEvent, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';
import { UserService, ApiService, FormsService} from '../../../../core/services';

@Component({
  selector: 'app-view-people-relationship',
  templateUrl: './view-people-relationship.component.html',
  styleUrls: ['./view-people-relationship.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class ViewPeopleRelationsComponent implements OnInit{
  relationshipForm: FormGroup;
  formName = 'vinculos';

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
    public dialog: MatDialog
  ) {}


  ngOnInit() {
    this.relationshipForm = this.parentF.form;
    this.relationshipForm.addControl(this.formName, this.formBuilder.array([]));
    this.addButton();
  }

  addButton(): void {
    (<FormArray>this.relationshipForm.get(this.formName)).push(this.addFormGroup());
  }

  addFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: null,
      persona: null,
      personaVinculo: this.addPeopleGroup(),
      tipoVinculo: [null, Validators.required]
    });
  }

  //Persona
  addPeopleGroup(): FormGroup {
    return this.formBuilder.group({
      id: null ,
      avatar: null ,
      primerNombre: [null, [Validators.required]],
      segundoNombre: null,
      primerApellido: [null, [Validators.required]],
      segundoApellido: null,
      documento: [null, [Validators.required]],
      ruc: null,
      fechaNacimiento: [null, [Validators.required]],
      tipoPersona: ['FISICA', [Validators.required]],
      sexo: [null, [Validators.required]],
      numeroHijos: null,
      numeroDependientes: null,
      estadoCivil: [null, [Validators.required]],
      separacionBienes: null,
      email: [null, [Validators.required]],
      profesion: [null, [Validators.required]],
      telefonoParticular: [null, [Validators.required]],
      telefonoSecundario: null,
      direccionParticular: [null, [Validators.required]],
      direccionDetallada: '',
      observacion: '',
      activo: 'S',
      nacionalidad: [null, [Validators.required]],
      pais: [null, [Validators.required]],
      departamento: [null, [Validators.required]],
      ciudad: [null, [Validators.required]],
      barrio: null
    });
  }
  
}
