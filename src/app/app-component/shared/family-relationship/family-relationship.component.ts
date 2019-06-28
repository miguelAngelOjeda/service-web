import { Component, OnInit, OnChanges, EventEmitter, Output, Input, ElementRef } from '@angular/core';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators, ControlContainer, FormGroupDirective} from '@angular/forms';
import { MatDialog, PageEvent, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';
import { DeleteDialogComponent } from '../../../shared';
import { Estate, Message, Location } from '../../../core/models';
import { UserService, ApiService, FormsService} from '../../../core/services';

@Component({
  selector: 'app-family-relationship',
  templateUrl: './family-relationship.component.html',
  styleUrls: ['./family-relationship.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class FamilyRelationshipComponent implements OnInit{
  isDisabled = false;
  relationshipForm: FormGroup;
  minRow = 0;

  @Input()
  set fkFilterModel(id: any) {
    if(id){
      this.onChangesFkModel(id);
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
    this.relationshipForm.addControl('vinculos', this.formBuilder.array([]));
    this.addButton();
    this.onChanges();
    console.log(this.relationshipForm);
  }


  addFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: null,
      persona: null,
      personaVinculo: this.addPeopleGroup(),
      tipoVinculo: [null, Validators.required],
      ocupaciones:this.formBuilder.array([this.addOccupationFormGroup()])
    });
  }

  addOccupationFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: null,
      cargo: [null, Validators.required],
      empresa: [null, Validators.required],
      tipoTrabajo: [null, [Validators.required]],
      direccion: [null, [Validators.required]],
      telefonoPrincipal: [null, [Validators.required]],
      telefonoSecundario: null,
      fechaIngreso: [null, [Validators.required]],
      fechaSalida: null,
      interno: null,
      ingresosMensuales: 0,
      tipoOcupacion: [null, [Validators.required]]
    });
  }

  addButton(): void {
    (<FormArray>this.relationshipForm.get('vinculos')).push(this.addFormGroup());
  }

  addButtonOccupation(index:any): void {
    (<FormArray>(<FormArray>this.relationshipForm.get('vinculos')).controls[index].get('ocupaciones')).push(this.addOccupationFormGroup());
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

  onChangesFkModel(id:any){
      this.apiService.getPageList('/vinculos',false,null,null, 'desc', 'id',0,50, false,id)
      .subscribe(res => {
        if(res.status == 200){
          if(res.rows != null
              && res.rows.length > 0){
                const formArray = (<FormArray>this.relationshipForm.get('vinculos'));
                while (formArray.length) {
                  formArray.removeAt(0);
                }
                res.rows.forEach(staff => {
                  staff.personaVinculo.fechaNacimiento = new Date(staff.personaVinculo.fechaNacimiento);
                  staff.personaVinculo = this.formBuilder.group(staff.personaVinculo);
                  staff.persona = this.formBuilder.group(staff.persona)
                  staff.ocupaciones = this.formBuilder.array([this.addOccupationFormGroup()]);
                  formArray.push(this.formBuilder.group(staff));
                });
          }
        }
      });
  }

  delete(data: any){
    if(data.id){
      const message = new Message;
      message.titulo = "Eliminar Registro"
      message.texto = "Esta seguro que desea eliminar el registro ";

      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = message;

      let dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.apiService.delete('/vinculos/' + data.id)
          .subscribe(res => {
              if(res.status == 200){
                (<FormArray>this.relationshipForm.get('vinculos')).removeAt((<FormArray>this.relationshipForm.get('vinculos')).value.findIndex(dep => dep === data))
                if(this.minRow > 0){
                  if((<FormArray>this.relationshipForm.get('vinculos')).controls.length < this.minRow){
                    this.addButton();
                  }
                }
              }
          });
        }
      })
    }else{
      (<FormArray>this.relationshipForm.get('vinculos')).removeAt((<FormArray>this.relationshipForm.get('vinculos')).value.findIndex(dep => dep === data))
      if(this.minRow > 0){
        if((<FormArray>this.relationshipForm.get('vinculos')).controls.length < this.minRow){
          this.addButton();
        }
      }
    }    
  }

  deleteOccupation(data: any, index:any){
    if(data.id){
      const message = new Message;
      message.titulo = "Eliminar Registro"
      message.texto = "Esta seguro que desea eliminar el registro ";

      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = message;

      let dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.apiService.delete('/ocupaciones/' + data.id)
          .subscribe(res => {
              if(res.status == 200){
                (<FormArray>(<FormArray>this.relationshipForm.get('vinculos')).controls[index].get('ocupaciones')).removeAt((<FormArray>this.relationshipForm.get('vinculos')).controls[index].get('ocupaciones').value.findIndex(dep => dep === data))
              }
          });
        }
      })
    }else{
      (<FormArray>(<FormArray>this.relationshipForm.get('vinculos')).controls[index].get('ocupaciones')).removeAt((<FormArray>this.relationshipForm.get('vinculos')).controls[index].get('ocupaciones').value.findIndex(dep => dep === data))
    }

  }

  onChanges(){
    (<FormGroup>this.relationshipForm.get('persona')).controls['estadoCivil'].valueChanges
    .subscribe(estadoCivil => {
        if(estadoCivil != 'CASADO/A'){
          this.minRow = 0;
        }else{
          this.minRow = 1;
          if((<FormArray>this.relationshipForm.get('vinculos')).controls.length < this.minRow){
            this.addButton();
          }

        }
    });
  }


  getValue(data: any, form : FormControl): void {
    form.setValue(data);
  }

}
