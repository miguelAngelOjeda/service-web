import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { FormGroup, FormArray , FormControl, FormBuilder,
   Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { UserService, ApiService, FormsService} from '../../../core/services';
import { MatDialog, PageEvent, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';
import { HttpParams } from '@angular/common/http';
import { EditModalPeopleComponent } from '../people/edit-modal-people/edit-modal-people.component';
import { AddModalPeopleComponent } from './add-modal-people/add-modal-people.component';
import { ViewModalPeopleComponent } from '../people/view-modal-people/view-modal-people.component';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  params = new HttpParams({fromObject :
    {'included' : 'inmuebles,vehiculos,referencias,ingresos,egresos,ocupaciones,vinculos'}});

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private apiService: ApiService,
    public dialog: MatDialog) { }


    public guardar(formGroup: FormGroup, dialogRef: MatDialogRef<AddModalPeopleComponent>){
      console.log(formGroup);
      if(formGroup.valid){

        if(formGroup.value.persona.tipoPersona !== 'FISICA'){
          formGroup.value.persona.documento = ' ';
          formGroup.value.persona.fechaNacimiento = new Date();
          formGroup.value.persona.primerApellido = ' ';
          formGroup.value.persona.estadoCivil = ' ';
          formGroup.value.persona.sexo = 'N';
        }

        if(formGroup.value.persona.id !== null){
          this.apiService.put('/personas/' + formGroup.value.persona.id, formGroup.value.persona)
          .subscribe(res => {
            if(res.status == 200){
              dialogRef.close(res.model);
            }
          });
        }else{
          this.apiService.post('/personas/' , formGroup.value.persona)
          .subscribe(res => {
            if(res.status == 200){
              dialogRef.close(res.model);
            }
          });
        }
      }else{
        this.mensaje("Faltan campos obligatorios por cargar!!!", "Cerrar", "warning-snackbar");
      }
    }

    public editar(id: number, formGroup: FormGroup, dialogRef: MatDialogRef<EditModalPeopleComponent>){
      console.log(formGroup);
      if(formGroup.valid){

        if(formGroup.value.persona.tipoPersona !== 'FISICA'){
          formGroup.value.persona.documento = ' ';
          formGroup.value.persona.fechaNacimiento = new Date();
          formGroup.value.persona.primerApellido = ' ';
          formGroup.value.persona.estadoCivil = ' ';
          formGroup.value.persona.sexo = 'N';
        }

        if(formGroup.value.persona.id !== null){
          //MODIFICAR PERSONA DE LA SOLICITUD
          if(formGroup.value.persona.entidad === 'PERSONA_SOLICITUD'){
            this.apiService.put('/solicitud_creditos/personas/' + id, formGroup.value.persona)
            .subscribe(res => {
              if(res.status == 200){
                dialogRef.close(res.model);
              }
            });
          }else{
            this.apiService.put('/personas/' + formGroup.value.persona.id, formGroup.value.persona)
            .subscribe(res => {
              if(res.status == 200){
                dialogRef.close(res.model);
              }
            });
          }

        }else{
          this.apiService.post('/personas/' , formGroup.value.persona)
          .subscribe(res => {
            if(res.status == 200){
              dialogRef.close(res.model);
            }
          });
        }
      }else{
        this.mensaje("Faltan campos obligatorios por cargar!!!", "Cerrar", "warning-snackbar");
      }
    }

    public mensaje(message: string, action: string, className: string) {
   	    this.snackBar.open(message, action, {
  	      duration: 6000,
  	      verticalPosition: 'bottom',
  	      horizontalPosition: 'end',
  	      panelClass: [className],
  	    });
  	 }

    public editModalPeopleSolicitud(idSolicitud: number, idPersona: number, tipo: string,
      peopleFormGroup: FormGroup, matDialogConfig: MatDialogConfig){

      if(!matDialogConfig){
        matDialogConfig = new MatDialogConfig();
        matDialogConfig.disableClose = true;
        matDialogConfig.autoFocus = true;
        matDialogConfig.data = { model: null, title:'Editar' };
      }

      let variables = new HttpParams({fromObject :
        {
          'idSolicitud' : idSolicitud.toString(),
          'idPersona' : idPersona.toString(),
          'tipoRelacion' : tipo,
          'included' : 'inmuebles,vehiculos,referencias,ingresos,egresos,ocupaciones,vinculos'
        }});

      this.apiService.get('/solicitud_creditos/persona-solicitud',variables)
      .subscribe(res => {
        if(res.status == 200){
          matDialogConfig.data.model =  res.model;

          const dialogRef = this.dialog.open(EditModalPeopleComponent, matDialogConfig);
          dialogRef.afterClosed().subscribe(res => {
             if(res){

               res.nombre = (res.primerNombre == null ? '' : res.primerNombre) + ' '
                                   + (res.segundoNombre == null ? '' : res.segundoNombre) + ' '
                                   + (res.primerApellido == null ? '' : res.primerApellido) + ' ' + (res.segundoApellido == null ? '' : res.segundoApellido);

               peopleFormGroup.patchValue(res);
             }
          });
        }
      });
    }

    public viewModalPeopleSolicitud(idSolicitud: number, idPersona: number, tipo: string,
       matDialogConfig: MatDialogConfig){
      if(!matDialogConfig){
        matDialogConfig = new MatDialogConfig();
        matDialogConfig.disableClose = true;
        matDialogConfig.autoFocus = true;
        matDialogConfig.data = { model: null, title:'Editar' };
      }

      let variables = new HttpParams({fromObject :
        {
          'idSolicitud' : idSolicitud.toString(),
          'idPersona' : idPersona.toString(),
          'tipoRelacion' : tipo,
          'included' : 'inmuebles,vehiculos,referencias,ingresos,egresos,ocupaciones,vinculos'
        }});

      this.apiService.get('/solicitud_creditos/persona-solicitud',variables)
      .subscribe(res => {
        if(res.status == 200){
          matDialogConfig.data.model =  res.model;

          const dialogRef = this.dialog.open(ViewModalPeopleComponent, matDialogConfig);
        }
      });
    }

    public addModalPeople(id: number,peopleFormGroup: FormGroup, matDialogConfig: MatDialogConfig){
      if(!matDialogConfig){
        matDialogConfig = new MatDialogConfig();
        matDialogConfig.disableClose = true;
        matDialogConfig.autoFocus = true;
        matDialogConfig.data = { model: null, title:'Agregar' };
      }
      matDialogConfig.hasBackdrop = true;

      const dialogRef = this.dialog.open(AddModalPeopleComponent, matDialogConfig);

      dialogRef.afterClosed().subscribe(res => {
         if(res){
           res.nombre = (res.primerNombre == null ? '' : res.primerNombre) + ' '
                               + (res.segundoNombre == null ? '' : res.segundoNombre) + ' '
                               + (res.primerApellido == null ? '' : res.primerApellido) + ' ' + (res.segundoApellido == null ? '' : res.segundoApellido);

           peopleFormGroup.patchValue(res);
         }
      });
    }

    public editModalPeople(id: number,peopleFormGroup: FormGroup, matDialogConfig: MatDialogConfig){
      if(!matDialogConfig){
        matDialogConfig = new MatDialogConfig();
        matDialogConfig.disableClose = true;
        matDialogConfig.autoFocus = true;
        matDialogConfig.data = { model: null, title:'Editar' };
      }
      matDialogConfig.hasBackdrop = true;

      this.apiService.get('/personas/' + id,this.params)
      .subscribe(res => {
        if(res.status == 200){
          matDialogConfig.data.model =  res.model;

          const dialogRef = this.dialog.open(EditModalPeopleComponent, matDialogConfig);
          dialogRef.afterClosed().subscribe(res => {
             if(res){

               res.nombre = (res.primerNombre == null ? '' : res.primerNombre) + ' '
                                   + (res.segundoNombre == null ? '' : res.segundoNombre) + ' '
                                   + (res.primerApellido == null ? '' : res.primerApellido) + ' ' + (res.segundoApellido == null ? '' : res.segundoApellido);

               peopleFormGroup.patchValue(res);
             }
          });
        }
      });
    }

    public viewModalPeople(id: number, matDialogConfig: MatDialogConfig){
      if(!matDialogConfig){
        matDialogConfig = new MatDialogConfig();
        matDialogConfig.disableClose = true;
        matDialogConfig.autoFocus = true;
        matDialogConfig.data = { model: null, title:'Editar' };
      }
      matDialogConfig.hasBackdrop = true;

      this.apiService.get('/personas/' + id,this.params)
      .subscribe(res => {
        if(res.status == 200){
          matDialogConfig.data.model =  res.model;

          const dialogRef = this.dialog.open(ViewModalPeopleComponent, matDialogConfig);
        }
      });
    }


    public loadData(peopleFormGroup: FormGroup, modelPeople: any){

      peopleFormGroup.patchValue(modelPeople);
      //Cargar Ocupaciones
      if(modelPeople.ocupaciones != null &&  modelPeople.ocupaciones.length > 0){
        const ocupaciones = (<FormArray>peopleFormGroup.get('ocupaciones'));
        if(ocupaciones){
          while (ocupaciones.length) {
            ocupaciones.removeAt(0);
          }

          modelPeople.ocupaciones.forEach(staff => {
            staff.fechaIngreso = new Date(staff.fechaIngreso);
            if(staff.fechaSalida){
              staff.fechaSalida = new Date(staff.fechaSalida);
            }else{
              staff.fechaSalida = null;
            }
            ocupaciones.push(this.formBuilder.group(staff));
          });
        }
      }

      //Cargar Referencias
      if(modelPeople.referencias != null && modelPeople.referencias.length > 0){
        const referencias = (<FormArray>peopleFormGroup.get('referencias'));
        if(referencias){
          while (referencias.length) {
            referencias.removeAt(0);
          }

          modelPeople.referencias.forEach(staff => {
            referencias.push(this.formBuilder.group(staff));
          });
        }
      }

      //Cargar Inmuebles
      if(modelPeople.bienesInmuebles != null && modelPeople.bienesInmuebles.length > 0){
        const bienesInmuebles = (<FormArray>peopleFormGroup.get('bienesInmuebles'));
        if(bienesInmuebles){
          while (bienesInmuebles.length) {
            bienesInmuebles.removeAt(0);
          }

          modelPeople.bienesInmuebles.forEach(staff => {
            if(staff.fechaHipoteca){
              staff.fechaHipoteca = new Date(staff.fechaHipoteca);
            }else{
              staff.fechaHipoteca = null;
            }
            bienesInmuebles.push(this.formBuilder.group(staff));
          });
        }
      }

      //Cargar Vehiculos
      if(modelPeople.bienesVehiculo != null && modelPeople.bienesVehiculo.length > 0){
        const bienesVehiculo = (<FormArray>peopleFormGroup.get('bienesVehiculo'));
        if(bienesVehiculo){
          while (bienesVehiculo.length) {
            bienesVehiculo.removeAt(0);
          }

          modelPeople.bienesVehiculo.forEach(staff => {
            bienesVehiculo.push(this.formBuilder.group(staff));
          });
        }
      }

      //Cargar Ingresos
      if(modelPeople.ingresos != null && modelPeople.ingresos.length > 0){
        const ingresos = (<FormArray>peopleFormGroup.get('ingresos'));
        if(ingresos){
          while (ingresos.length) {
            ingresos.removeAt(0);
          }

          modelPeople.ingresos.forEach(staff => {
            ingresos.push(this.formBuilder.group(staff));
          });
        }
      }

      //Cargar Egresos
      if(modelPeople.egresos != null && modelPeople.egresos.length > 0){
        const egresos = (<FormArray>peopleFormGroup.get('egresos'));
        if(egresos){
          while (egresos.length) {
            egresos.removeAt(0);
          }

          modelPeople.egresos.forEach(staff => {
            egresos.push(this.formBuilder.group(staff));
          });
        }

      }

      //Cargar Vinculos
      if(modelPeople.vinculos != null && modelPeople.vinculos.length > 0){
        const vinculos = (<FormArray>peopleFormGroup.get('vinculos'));
        if(vinculos){
          while (vinculos.length) {
            vinculos.removeAt(0);
          }

          modelPeople.vinculos.forEach(staff => {
            staff.personaVinculo.fechaNacimiento = new Date(staff.personaVinculo.fechaNacimiento);
            staff.personaVinculo.nombre = (staff.personaVinculo.primerNombre == null ? '' : staff.personaVinculo.primerNombre) + ' '
                                + (staff.personaVinculo.segundoNombre == null ? '' : staff.personaVinculo.segundoNombre) + ' '
                                + (staff.personaVinculo.primerApellido == null ? '' : staff.personaVinculo.primerApellido) + ' ' + (staff.personaVinculo.segundoApellido == null ? '' : staff.personaVinculo.segundoApellido);
            staff.personaVinculo = this.formBuilder.group(staff.personaVinculo);
            vinculos.push(this.formBuilder.group(staff));
          });
        }

      }

      //Cargar Estudios
      if(modelPeople.estudios != null &&  modelPeople.estudios.length > 0){
        const estudios = (<FormArray>peopleFormGroup.get('estudios'));
        if(estudios != null){
          while (estudios.length) {
            estudios.removeAt(0);
          }
        }
        modelPeople.estudios.forEach(staff => {
          estudios.push(this.formBuilder.group(staff));
        });
      }
    }

}
