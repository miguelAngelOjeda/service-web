import { Component, OnInit, Inject, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSelect, MatDialog, MatDialogConfig} from '@angular/material';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { Router, CanActivate, ActivatedRoute} from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { People, Role, Rules, Filter, Countries, DepartmentsCountri, Cities,
   Subsidiary, Departments, Nationalities, Location, Message } from '../../../core/models';
import { UserService, ApiService} from '../../../core/services';
import { DeleteDialogComponent } from '../../../shared';
import { PeopleService } from '../../shared/people';

@Component({
  selector: 'app-view-message',
  templateUrl: './view-message.component.html',
  styleUrls: ['./view-message.component.css']
})
export class ViewMessageComponent implements OnInit {
  myForm: FormGroup;
  params = new HttpParams({fromObject : {'included' : 'inmuebles,ocupaciones,referencias,vehiculos,vinculos'}});

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private peopleService: PeopleService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initFormBuilder();
    this.apiService.get('/compromisos/' + this.route.snapshot.params.id, this.params)
    .subscribe(res => {
      if(res.status == 200){
        this.myForm.patchValue(res.model);
        this.peopleService.loadData((<FormGroup>this.myForm.get('persona')),res.model.cliente.persona);
        console.log(this.myForm);
      }
    });
  }

  protected initFormBuilder() {
    this.myForm = this.formBuilder.group({
      id: null ,
      activo: 'S',
      nroCredito: null,
      cuotas: null,
      monto: null,
      motivo: null,
      fechaPago: null
    });
    this.myForm.addControl('persona', this.formBuilder.group({
      id: null ,
      avatar: null ,
      primerNombre: null,
      segundoNombre: null,
      primerApellido: null,
      segundoApellido: null,
      documento: null,
      ruc: null,
      fechaNacimiento: null,
      sexo: null,
      numeroHijos: null,
      numeroDependientes: null,
      separacionBienes: null,
      email: null,
      telefonoParticular: null,
      direccionParticular: null,
      direccionDetallada: null,
      observacion: null,
      latitud: '',
      longitud: '',
      activo: 'S',
      imagePath: null,
      nacionalidad: null,
      profesion: null,
      pais: null,
      departamento: null,
      ciudad: null,
      barrio: null
    }));
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
