import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import { AppComponent } from '../../app.component';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot , ActivatedRoute} from '@angular/router';
import { UserService} from '../../services';
import {User} from '../../models';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  user: User;

  sexos = [
    {value: 'MASCULINO', viewValue: 'Masculino'},
    {value: 'FEMENINO', viewValue: 'Femenino'}
  ];

  departamentos = [
    {id: 1, nombre: 'TECNOLOGIA'},
    {id: 2, nombre: 'ARCHIVO'}
  ];

  constructor(private appComponent: AppComponent,
    private userService: UserService, router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    console.log(id);
    this.user = {id: 1, nombre: 'Miguel Angel', usuario: 'mojeda', email: 'lanymicole@gmail.com', apellido: 'Ojeda', sexo: 'Masculino',
    especialidad: null, telefono: '0961338960', documento: '49928387', activo:'S'};
  }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Campo requerido' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
    // emppty stuff
  }



}
