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
  selector: 'app-view-client',
  templateUrl: './view-client.component.html',
  styleUrls: ['./view-client.component.css']
})
export class ViewClientComponent implements OnInit {
  myForm: FormGroup;
  params = new HttpParams({fromObject : {'included' : 'inmuebles,ocupaciones'}});

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

  protected initFormBuilder() {
    this.myForm = this.formBuilder.group({
      id: null ,
      sucursal: null ,
      activo: 'S'
    });
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

  //Cargar datos
  protected loadData(response: any) {
    response.persona.fechaNacimiento =  new Date(response.persona.fechaNacimiento);
    this.myForm.patchValue(response);
    //Cargar Ocupaciones
    if( response.ocupaciones != null && response.ocupaciones.length > 0){
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

    //Cargar Inmuebles
    if(response.bienesInmuebles != null && response.bienesInmuebles.length > 0){
      console.log('oooooooooooooooooooooo');
      const bienesInmuebles = (<FormArray>this.myForm.get('bienesInmuebles'));
      while (bienesInmuebles.length) {
        bienesInmuebles.removeAt(0);
      }
      response.bienesInmuebles.forEach(staff => {
        bienesInmuebles.push(this.formBuilder.group(staff));
      });
    }


  }

}
