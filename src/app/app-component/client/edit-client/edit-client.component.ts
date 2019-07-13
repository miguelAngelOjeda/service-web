import { Component, OnInit, Inject, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSelect, MatDialogConfig, MatDialog} from '@angular/material';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { Router, CanActivate, ActivatedRoute} from '@angular/router';
import { DeleteDialogComponent } from '../../../shared';
import { People, Role, Rules, Filter, Countries, DepartmentsCountri, Cities,
   Subsidiary, Departments, Nationalities, Location, Message } from '../../../core/models';
import { UserService, ApiService} from '../../../core/services';


@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit{
  myForm: FormGroup;
  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initFormBuilder();
    this.apiService.get('/clientes/' + this.route.snapshot.params.id)
    .subscribe(res => {
      if(res.status == 200){
        res.model.persona.fechaNacimiento =  new Date(res.model.persona.fechaNacimiento);
        this.myForm.patchValue(res.model);
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
        res.model.persona.fechaNacimiento =  new Date(res.model.persona.fechaNacimiento);
        this.myForm.patchValue(res.model);
      }
    });

  }

  protected initFormBuilder() {
    this.myForm = this.formBuilder.group({
      id: null ,
      activo: 'S'
    },{ updateOn: 'change' });
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
                //this.paginator._changePageSize(this.paginator.pageSize);
              }
          });
        }
      })
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
