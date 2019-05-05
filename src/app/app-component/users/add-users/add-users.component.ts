import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import {Users} from '../../../core/models';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent implements OnInit {

    selectedValue: string;

    sexos = [
      {value: 'MASCULINO', viewValue: 'Masculino'},
      {value: 'FEMENINO', viewValue: 'Femenino'}
    ];

    departamentos = [
      {id: 1, nombre: 'TECNOLOGIA'},
      {id: 2, nombre: 'ARCHIVO'}
    ];

    constructor() { }

    ngOnInit() {
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
