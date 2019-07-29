import { Component, OnInit, OnChanges, EventEmitter, Output, Input, ElementRef } from '@angular/core';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators, ControlContainer, FormGroupDirective} from '@angular/forms';
import { MatDialog, PageEvent, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';
import { DeleteDialogComponent } from '../../../shared';
import { Estate, Message, Location } from '../../../core/models';
import { UserService, ApiService, FormsService} from '../../../core/services';
import { EditModalPeopleRelationsComponent } from './edit-modal-people-relationship';
import { SnackbarService } from '../../../shared';

@Component({
  selector: 'app-people-relationship',
  templateUrl: './people-relationship.component.html',
  styleUrls: ['./people-relationship.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
  export class  PeopleRelationshipComponent implements OnInit{
  isDisabled = false;
  relationshipForm: FormGroup;
  formName = 'vinculos';
  minRow = 0;
  step = 0;

  @Input()
  set fkFilterModel(id: any) {
    if(id){
      this.onChangesFkModel(id);
    }
  }

  @Input()
  set formControlName(model: any) {
    if(model){
      this.formName = model;
    }
  }

  constructor(
    private snackbarService: SnackbarService,
    private controlContainer: ControlContainer,
    private parentF: FormGroupDirective,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    public dialog: MatDialog
  ) {}


  ngOnInit() {
    this.relationshipForm = this.parentF.form;
    this.relationshipForm.addControl(this.formName, this.formBuilder.array([]));
    this.addButton(null);
    this.onChanges();
    // this.onChangesPeople();
    // this.onChangesTipoPersona();
  }

  editRelationship(id: number) {

      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = id;
      //dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;

      const dialogRef = this.dialog.open(EditModalPeopleRelationsComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(result => {
         if(result){

         }
      });

  }


  addFormGroup(tipoVinculo: string): FormGroup {
    return this.formBuilder.group({
      id: null,
      persona: null,
      personaVinculo: this.addPeopleGroup(),
      tipoVinculo: [(tipoVinculo === null ? null : tipoVinculo), Validators.required]
    });
  }

  addButton(tipoVinculo: string): void {
    (<FormArray>this.relationshipForm.get(this.formName)).push(this.addFormGroup(tipoVinculo));
  }

  //Persona
  addPeopleGroup(): FormGroup {
    return this.formBuilder.group({
      id: null ,
      avatar: null ,
      nombre: null,
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
      this.apiService.getPageList('/'+ this.formName,false,null,null, 'desc', 'id',0,50, false,id)
      .subscribe(res => {
        if(res.status == 200){
          if(res.rows != null
              && res.rows.length > 0){
                const formArray = (<FormArray>this.relationshipForm.get(this.formName));
                while (formArray.length) {
                  formArray.removeAt(0);
                }
                res.rows.forEach(staff => {
                  staff.personaVinculo.fechaNacimiento = new Date(staff.personaVinculo.fechaNacimiento);
                  staff.personaVinculo = this.formBuilder.group(staff.personaVinculo);
                  staff.persona = this.formBuilder.group(staff.persona)
                  const ocupaciones = this.formBuilder.array([]);
                  staff.ocupaciones.forEach(staff => {
                    staff.fechaIngreso = new Date(staff.fechaIngreso);
                    staff.fechaSalida = (staff.fechaSalida == null ? null : new Date(staff.fechaSalida));
                    ocupaciones.push(this.formBuilder.group(staff))
                  });
                  staff.ocupaciones = ocupaciones;
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
          this.apiService.delete('/' + this.formName + '/' + data.id)
          .subscribe(res => {
              if(res.status == 200){
                (<FormArray>this.relationshipForm.get(this.formName)).removeAt((<FormArray>this.relationshipForm.get(this.formName)).value.findIndex(dep => dep === data))
                if(this.minRow > 0){
                  if((<FormArray>this.relationshipForm.get(this.formName)).controls.length < this.minRow){
                    this.addButton(null);
                  }
                }
              }
          });
        }
      })
    }else{
      (<FormArray>this.relationshipForm.get(this.formName)).removeAt((<FormArray>this.relationshipForm.get(this.formName)).value.findIndex(dep => dep === data))
      if(this.minRow > 0){
        if((<FormArray>this.relationshipForm.get(this.formName)).controls.length < this.minRow){
          this.addButton(null);
        }
      }
    }
  }

  onChanges(){
    (<FormGroup>this.relationshipForm.get('persona')).controls['estadoCivil'].valueChanges
    .subscribe(estadoCivil => {
        if(estadoCivil != 'CASADO/A'){
          this.minRow = 0;
        }else{

          let tieneConyuge = false;
          (<FormArray>this.relationshipForm.get(this.formName)).controls.forEach(staff => {

            let tipoVinculo = (<FormGroup>staff).controls.tipoVinculo.value;

            if( tipoVinculo === 'CONYUGE'){
              this.minRow = 0;
            }else{
              tieneConyuge = true;
            }

          });

          if(tieneConyuge){
            this.snackbarService.show('Cargar datos del Conyuge en Vinculos!!','warning');
            this.addButton('CONYUGE');
          }


        }
    });
  }

  onChangesTipoPersona(){
    (<FormGroup>this.relationshipForm.get('persona')).controls['tipoPersona'].valueChanges
    .subscribe(tipoPersona => {
        if(tipoPersona != 'FISICA'){
          const formArray = (<FormArray>this.relationshipForm.get(this.formName));
          while (formArray.length) {
            formArray.removeAt(0);
          }
        }else{

        }
    });
  }

  onChangesPeople(){
    (<FormGroup>this.relationshipForm.get('persona')).controls['id'].valueChanges
    .subscribe(id => {
        this.onChangesFkModel(id);
    });
  }

  getValue(data: any, form : FormControl): void {
    form.setValue(data);
  }

  peopleCi(data: any, index:any) {
    console.log(data);
    this.apiService.get('/personas/documento/' + data)
    .subscribe(res => {
      if(res.status == 200){
        res.model.avatar = null;
        res.model.fechaNacimiento =  new Date(res.model.fechaNacimiento);
        res.model.nombre = (res.model.primerNombre == null ? '' : res.model.primerNombre) + ' '
                            + (res.model.segundoNombre == null ? '' : res.model.segundoNombre) + ' '
                            + (res.model.primerApellido == null ? '' : res.model.primerApellido) + ' ' + (res.model.segundoApellido == null ? '' : res.model.segundoApellido);

        (<FormGroup>(<FormArray>this.relationshipForm.get(this.formName)).controls[index].get('personaVinculo')).patchValue(res.model);
      }
    });
  }

}
