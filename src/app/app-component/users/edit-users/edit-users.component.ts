import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot , ActivatedRoute} from '@angular/router';
import { UserService} from '../../../core/services';
import { ApiService } from '../../../core/services';
import { Users } from '../../../core/models';
import * as $ from 'jquery';
import 'dropify';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.scss']
})
export class EditUsersComponent implements OnInit {
  private model = new Users();
  formControl = new FormControl('', [Validators.required]);
  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.onInitDropify();

    this.apiService.get('/usuarios/' + this.route.snapshot.params.id)
    .subscribe(res => {
       this.model = res.model as Users;
    });

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

  submit() {
    console.log(this.model);
  }



}
