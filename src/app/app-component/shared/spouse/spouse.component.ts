import { Component, OnInit, OnChanges, EventEmitter, Output, Input, ElementRef } from '@angular/core';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators, ControlContainer, FormGroupDirective} from '@angular/forms';
import { MatDialog, PageEvent, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';
import { DeleteDialogComponent } from '../../../shared';
import { Estate, Message, Location } from '../../../core/models';
import { UserService, ApiService, FormsService} from '../../../core/services';

@Component({
  selector: 'app-spouse',
  templateUrl: './spouse.component.html',
  styleUrls: ['./spouse.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class SpouseComponent implements OnInit{
  isDisabled = false;
  spouseForm: FormGroup;

  constructor(
    private controlContainer: ControlContainer,
    private parentF: FormGroupDirective,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    public dialog: MatDialog
  ) {}


  ngOnInit() {
    this.spouseForm = this.parentF.form;
    this.onChanges();
  }

  onChanges(){
    (<FormGroup>this.spouseForm.get('persona')).controls['separacionBienes'].valueChanges
    .subscribe(separacionBienes => {
        if(separacionBienes){
          this.spouseForm.addControl('conyuge', this.formBuilder.group({
            id: null ,
            avatar: null ,
            primerNombre: [null, [Validators.required]],
            segundoNombre: null,
            primerApellido: [null, [Validators.required]],
            segundoApellido: null,
            documento: [null, [Validators.required]],
            ruc: new FormControl(),
            fechaNacimiento: [null, [Validators.required]],
            tipoPersona: ['FISICA'],
            sexo: [null, [Validators.required]],
            numeroHijos: null,
            numeroDependientes: null,
            estadoCivil: ['CASADO/A', [Validators.required]],
            separacionBienes: true,
            email: [null, [Validators.required]],
            profesion: [null, [Validators.required]],
            telefonoParticular: [null, [Validators.required]],
            telefonoSecundario: null,
            direccionParticular: [null, [Validators.required]],
            direccionDetallada: null,
            observacion: null,
            activo: 'S',
            imagePath: null,
            nacionalidad: [null, [Validators.required]],
            pais: [null, [Validators.required]],
            departamento: [null, [Validators.required]],
            ciudad: [null, [Validators.required]],
            barrio: null
          }));
        }else{
          this.spouseForm.removeControl('conyuge');
          this.spouseForm.updateValueAndValidity();
        }
    });
  }

  getValue(data: any, form : FormControl): void {
    form.setValue(data);
  }

}
