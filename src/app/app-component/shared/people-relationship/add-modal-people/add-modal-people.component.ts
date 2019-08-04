import { Component, OnInit, Inject, ElementRef, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ValidationService } from '../../../../core/services/validation.service';
import { Subsidiary, Departments, Message, Location } from '../../../../core/models';
import { ApiService } from '../../../../core/services';
import { DeleteDialogComponent } from '../../../../shared';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators} from '@angular/forms';
import { MatPaginator, MatTableDataSource, MatDialog, MatSort, PageEvent,
   Sort, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-add-modal-people',
  templateUrl: './add-modal-people.component.html',
  styleUrls: ['./add-modal-people.component.css']
})
export class AddModalPeopleComponent implements OnInit{
  style = "max-height: 75vh";
  myForm: FormGroup;
  private peopleRelations: any;

  constructor(
            public dialog: MatDialog,
            private formBuilder: FormBuilder,
            public dialogRef: MatDialogRef<AddModalPeopleComponent>,
            private apiService: ApiService,
            @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    this.initFormBuilder();
  }

  onSubmit() {
    if(this.myForm.value.persona.tipoPersona !== 'FISICA'){
      this.myForm.value.persona.documento = ' ';
      this.myForm.value.persona.fechaNacimiento = new Date();
      this.myForm.value.persona.primerApellido = ' ';
      this.myForm.value.persona.estadoCivil = ' ';
      this.myForm.value.persona.sexo = 'N';
    }

    this.apiService.post('/personas/' , this.myForm.value)
    .subscribe(res => {
      if(res.status == 200){
        this.dialogRef.close(res.model);
      }
    });

  }

  protected initFormBuilder() {
    this.myForm = this.formBuilder.group({});
  }

  //Cargar datos
  protected loadData(response: any) {
    response.fechaNacimiento =  new Date(response.fechaNacimiento);
    (<FormGroup>this.myForm.get('persona')).patchValue(response);
    //Cargar Ocupaciones
    if(response.ocupaciones != null &&  response.ocupaciones.length > 0){
      const ocupaciones = (<FormArray>this.myForm.get('ocupaciones'));
      if(ocupaciones){
        while (ocupaciones.length) {
          ocupaciones.removeAt(0);
        }
      }

      response.ocupaciones.forEach(staff => {
        staff.fechaIngreso = new Date(staff.fechaIngreso);
        if(staff.fechaSalida){
          staff.fechaSalida = new Date(staff.fechaSalida);
        }
        ocupaciones.push(this.formBuilder.group(staff));
      });
    }

    //Cargar Referencias
    if(response.referencias != null && response.referencias.length > 0){
      const referencias = (<FormArray>this.myForm.get('referencias'));
      if(referencias){
        while (referencias.length) {
          referencias.removeAt(0);
        }
      }
      response.referencias.forEach(staff => {
        referencias.push(this.formBuilder.group(staff));
      });
    }

    //Cargar Inmuebles
    if(response.bienesInmuebles != null && response.bienesInmuebles.length > 0){
      const bienesInmuebles = (<FormArray>this.myForm.get('bienesInmuebles'));
      if(bienesInmuebles){
        while (bienesInmuebles.length) {
          bienesInmuebles.removeAt(0);
        }
      }
      response.bienesInmuebles.forEach(staff => {
        bienesInmuebles.push(this.formBuilder.group(staff));
      });
    }

    //Cargar Vehiculos
    if(response.bienesVehiculo != null && response.bienesVehiculo.length > 0){
      const bienesVehiculo = (<FormArray>this.myForm.get('bienesVehiculo'));
      if(bienesVehiculo){
        while (bienesVehiculo.length) {
          bienesVehiculo.removeAt(0);
        }
      }

      response.bienesVehiculo.forEach(staff => {
        bienesVehiculo.push(this.formBuilder.group(staff));
      });
    }

    //Cargar Ingresos
    if(response.ingresos != null && response.ingresos.length > 0){
      const ingresos = (<FormArray>this.myForm.get('ingresos'));
      if(ingresos){
        while (ingresos.length) {
          ingresos.removeAt(0);
        }
      }
      response.ingresos.forEach(staff => {
        ingresos.push(this.formBuilder.group(staff));
      });
    }

    //Cargar Egresos
    if(response.egresos != null && response.egresos.length > 0){
      const egresos = (<FormArray>this.myForm.get('egresos'));
      if(egresos){
        while (egresos.length) {
          egresos.removeAt(0);
        }
      }
      response.egresos.forEach(staff => {
        egresos.push(this.formBuilder.group(staff));
      });
    }

    //Cargar Vinculos
    if(response.vinculos != null && response.vinculos.length > 0){
      const vinculos = (<FormArray>this.myForm.get('vinculos'));
      if(vinculos){
        while (vinculos.length) {
          vinculos.removeAt(0);
        }

        response.vinculos.forEach(staff => {
          staff.personaVinculo.fechaNacimiento = new Date(staff.personaVinculo.fechaNacimiento);
          staff.personaVinculo.nombre = (staff.personaVinculo.primerNombre == null ? '' : staff.personaVinculo.primerNombre) + ' '
                              + (staff.personaVinculo.segundoNombre == null ? '' : staff.personaVinculo.segundoNombre) + ' '
                              + (staff.personaVinculo.primerApellido == null ? '' : staff.personaVinculo.primerApellido) + ' ' + (staff.personaVinculo.segundoApellido == null ? '' : staff.personaVinculo.segundoApellido);
          staff.personaVinculo = this.formBuilder.group(staff.personaVinculo);
          vinculos.push(this.formBuilder.group(staff));
        });
      }

    }
  }

  // Get Current Location Coordinates
  getAddress(location: Location): void {
    this.myForm.controls['latitud'].setValue(location.lat);
    this.myForm.controls['longitud'].setValue(location.lng);
    this.myForm.controls['direccionParticular'].setValue(location.address);
  }

  getAvatar(avatar: any): void {
    this.myForm.controls['avatar'].setValue(avatar);
  }

  getValue(data: any, form : FormControl): void {
    form.setValue(data);
  }

}
