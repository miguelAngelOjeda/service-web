import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Business } from '../../../core/models';
import { ApiService } from '../../../core/services';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-edit-business',
  templateUrl: './edit-business.component.html',
  styleUrls: ['./edit-business.component.css']
})
export class EditBusinessComponent implements OnInit {
  private model: Business;

  formControl = new FormControl('', [
    Validators.required
  // Validators.email,
  ]);
  constructor(
    private snackBar: MatSnackBar,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {
    this.model = new Business();
   }

  ngOnInit() {
    this.apiService.get('/empresas/' + this.route.snapshot.params.id)
    .subscribe(res => {
       this.model = res.model as Business;
    });

  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Campo requerido' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit(form) {
    this.apiService.put('/empresas/' + this.route.snapshot.params.id, this.model)
    .subscribe(res => {
        //this.snackBarService.openSnackBar('res');

    });
  }

}
