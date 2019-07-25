import { Component, OnInit, Inject, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSelect, MatDialog, MatDialogConfig} from '@angular/material';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { Router, CanActivate, ActivatedRoute} from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { People, Role, Rules, Filter, Countries, DepartmentsCountri, Cities,
   Subsidiary, Departments, Nationalities, Location, Message } from '../../../core/models';
import { UserService, ApiService} from '../../../core/services';
import { DeleteDialogComponent } from '../../../shared';


@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit{
  myForm: FormGroup;
  params = new HttpParams({fromObject : {'included' : 'inmuebles,vehiculos,referencias,ingresos,egresos,ocupaciones'}});

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initFormBuilder();
    this.apiService.get('/clientes/' + this.route.snapshot.params.id, this.params)
    .subscribe(res => {
      if(res.status == 200){
        this.loadData(res.model);
      }
    });
  }

  onSubmit() {
    console.log(this.myForm);
    console.log(this.myForm.value.persona);
    if(this.myForm.value.persona.tipoPersona !== 'FISICA'){
      this.myForm.value.persona.documento = ' ';
      this.myForm.value.persona.fechaNacimiento = new Date();
      this.myForm.value.persona.primerApellido = ' ';
      this.myForm.value.persona.estadoCivil = ' ';
      this.myForm.value.persona.sexo = 'N';
    }

    this.apiService.put('/clientes/' + this.route.snapshot.params.id, this.myForm.value)
    .subscribe(res => {
      if(res.status == 200){
        this.loadData(res.model);
      }
    });

  }

  protected initFormBuilder() {
    this.myForm = this.formBuilder.group({
      id: null ,
      activo: 'S'
    },{ updateOn: 'change' });
  }

  //Cargar datos
  protected loadData(response: any) {
    response.persona.fechaNacimiento =  new Date(response.persona.fechaNacimiento);
    this.myForm.patchValue(response);
    //Cargar Ocupaciones
    if(response.ocupaciones > 0){
      const ocupaciones = (<FormArray>this.myForm.get('ocupaciones'));
      while (ocupaciones.length) {
        ocupaciones.removeAt(0);
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
    if(response.referencias > 0){
      const referencias = (<FormArray>this.myForm.get('referencias'));
      while (referencias.length) {
        referencias.removeAt(0);
      }
      response.referencias.forEach(staff => {
        referencias.push(this.formBuilder.group(staff));
      });
    }

    //Cargar Inmuebles
    if(response.bienesInmuebles > 0){
      const bienesInmuebles = (<FormArray>this.myForm.get('bienesInmuebles'));
      while (bienesInmuebles.length) {
        bienesInmuebles.removeAt(0);
      }
      response.bienesInmuebles.forEach(staff => {
        bienesInmuebles.push(this.formBuilder.group(staff));
      });
    }

    //Cargar Vehiculos
    if(response.bienesVehiculo > 0){
      const bienesVehiculo = (<FormArray>this.myForm.get('bienesVehiculo'));
      while (bienesVehiculo.length) {
        bienesVehiculo.removeAt(0);
      }
      response.bienesVehiculo.forEach(staff => {
        bienesVehiculo.push(this.formBuilder.group(staff));
      });
    }

    //Cargar Ingresos
    if(response.ingresos > 0){
      const ingresos = (<FormArray>this.myForm.get('ingresos'));
      while (ingresos.length) {
        ingresos.removeAt(0);
      }
      response.ingresos.forEach(staff => {
        ingresos.push(this.formBuilder.group(staff));
      });
    }

    //Cargar Egresos
    if(response.egresos > 0){
      const egresos = (<FormArray>this.myForm.get('egresos'));
      while (egresos.length) {
        egresos.removeAt(0);
      }
      response.egresos.forEach(staff => {
        egresos.push(this.formBuilder.group(staff));
      });
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

  delete(data: any){
    if(data.id){
      const message = new Message;
      message.titulo = "Eliminar Registro"
      message.texto = "Esta seguro que desea eliminar el registro!! ";

      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = message;

      let dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.apiService.delete('/clientes/' + data.id)
          .subscribe(res => {
              if(res.status == 200){
                this.router.navigateByUrl('service-web/client');
              }
          });
        }
      })
    }
  }
}
