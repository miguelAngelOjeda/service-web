import { Component, OnInit, OnChanges, EventEmitter, Output, Input, ElementRef } from '@angular/core';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators, ControlContainer, FormGroupDirective} from '@angular/forms';
import { MatDialog, PageEvent, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';
import { DeleteDialogComponent } from '../../../shared';
import { HttpParams } from '@angular/common/http';
import { Estate, Message, Location } from '../../../core/models';
import { UserService, ApiService, FormsService} from '../../../core/services';
import { PeopleService } from '../people/people.service';
import { EditModalPeopleComponent } from '../people/edit-modal-people';
import { AddModalPeopleComponent } from '../people/add-modal-people';
import { ViewModalPeopleComponent } from '../people/view-modal-people';
import { SnackbarService } from '../../../shared';

@Component({
  selector: 'app-spouse',
  templateUrl: './spouse.component.html',
  styleUrls: ['./spouse.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
  export class  SpouseComponent implements OnInit{
    params = new HttpParams({fromObject :
      {'included' : 'inmuebles,vehiculos,referencias,ingresos,egresos,ocupaciones,vinculos'}});

    spouseForm: FormGroup;
    peopleForm: FormGroup;
    formName = 'conyuge';
    addSpouse = false;

    @Input()
    set addModel(model: any) {
      console.log(model);
      if(model){
        this.addSpouse = model;
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
    private peopleService: PeopleService,
    public dialog: MatDialog
  ) {}


  ngOnInit() {
    this.spouseForm = this.parentF.form;
    this.peopleForm = (<FormGroup>this.spouseForm.get('persona'));
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
      segundoApellido: null}));

    this.peopleForm.controls['estadoCivil'].valueChanges.subscribe(
        (estadoCivil) => {
          if(estadoCivil === 'CASADO/A' && this.addSpouse){
            (<FormGroup>this.peopleForm.get(this.formName)).enable();
          }else{
            (<FormGroup>this.peopleForm.get(this.formName)).disable();
          }
        }
    );
  }

  editPeople(id: number) {

      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = { model: null, title:'Editar Conyuge' };

      this.peopleService.editModalPeople(id, <FormGroup>this.peopleForm.get(this.formName), dialogConfig);
  }

  addPeople(id: number) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { model: null, title:'Agregar Conyuge' };

    this.peopleService.addModalPeople(id, <FormGroup>this.peopleForm.get(this.formName), dialogConfig);
  }

  viewPeople(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { model: null, title:'Visualizar Conyuge' };
    //dialogConfig.disableClose = true;
    //dialogConfig.maxHeight = "65vh";
    dialogConfig.autoFocus = true;
    this.peopleService.viewModalPeople(id, dialogConfig);
  }


  // delete(data: any){
  //   if(data.id){
  //     const message = new Message;
  //     message.titulo = "Eliminar Registro"
  //     message.texto = "Esta seguro que desea eliminar el registro ";
  //
  //     const dialogConfig = new MatDialogConfig();
  //     dialogConfig.data = message;
  //
  //     let dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);
  //     dialogRef.afterClosed().subscribe(result => {
  //       if(result){
  //         this.apiService.delete('/' + this.formName + '/' + data.id)
  //         .subscribe(res => {
  //             if(res.status == 200){
  //               (<FormArray>this.relationshipForm.get(this.formName)).removeAt((<FormArray>this.relationshipForm.get(this.formName)).value.findIndex(dep => dep === data))
  //               if(this.minRow > 0){
  //                 if((<FormArray>this.relationshipForm.get(this.formName)).controls.length < this.minRow){
  //                   this.addButton(null);
  //                 }
  //               }
  //             }
  //         });
  //       }
  //     })
  //   }else{
  //     (<FormArray>this.relationshipForm.get(this.formName)).removeAt((<FormArray>this.relationshipForm.get(this.formName)).value.findIndex(dep => dep === data))
  //     if(this.minRow > 0){
  //       if((<FormArray>this.relationshipForm.get(this.formName)).controls.length < this.minRow){
  //         this.addButton(null);
  //       }
  //     }
  //   }
  // }





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

        this.peopleForm.patchValue(res);
      }
    });
  }

}
