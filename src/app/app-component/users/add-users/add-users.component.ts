import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { FormControl, Validators} from '@angular/forms';
import { Users, Rules} from '../../../core/models';
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
    private rules: Array<Rules> = [];
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

    showpreview(event) {
      let reader = new FileReader();
      if(event.target.files && event.target.files.length > 0) {
        let file = event.target.files[0];
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.model.persona.avatar ={
            filename: file.name,
            filetype: file.type,
            url: reader.result,
            value: reader.result.toString().split(',')[1]
          };
        };
      }
    }

    getErrorMessage() {
      return this.formControl.hasError('required') ? 'Campo requerido' :
        this.formControl.hasError('email') ? 'Not a valid email' :
          '';
    }


  }
