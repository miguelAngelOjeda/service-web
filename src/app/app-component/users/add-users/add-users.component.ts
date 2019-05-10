import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import {Users} from '../../../core/models';
import * as $ from 'jquery';
import 'dropify';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent implements OnInit {
    hide = true;
    private model = new Users();
    formControl = new FormControl('', [Validators.required]);

    constructor() { }

    ngOnInit() {
      this.onInitDropify();
    }


    onInitDropify() {
      (<any>$('.dropify') ).dropify({
          messages: {
                  default: 'Arrastre un archivo o haga clic aquí',
                  replace: 'Arrastre un archivo o haga clic en reemplazar',
                  remove: 'Eliminar',
                  error: 'Lo sentimos, el archivo demasiado grande'
          }
      });
    }

    getErrorMessage() {
      return this.formControl.hasError('required') ? 'Campo requerido' :
        this.formControl.hasError('email') ? 'Not a valid email' :
          '';
    }


  }
