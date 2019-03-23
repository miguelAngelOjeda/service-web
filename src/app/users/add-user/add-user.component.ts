import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import {User} from '../../core/models';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

    selectedValue: string;

    sexos = [
      {value: 'MASCULINO', viewValue: 'Masculino'},
      {value: 'FEMENINO', viewValue: 'Femenino'}
    ];

    departamentos = [
      {id: 1, nombre: 'TECNOLOGIA'},
      {id: 2, nombre: 'ARCHIVO'}
    ];

    constructor(public dialogRef: MatDialogRef<AddUserComponent>,
                @Inject(MAT_DIALOG_DATA) public data: User) { }

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

    onNoClick(): void {
      this.dialogRef.close();
    }

  }
