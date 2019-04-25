import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Business } from '../../../core/models';
import { ApiService } from '../../../core/services';

@Component({
  selector: 'app-add-business',
  templateUrl: './add-business.component.html',
  styleUrls: ['./add-business.component.css']
})
export class AddBusinessComponent implements OnInit {
  private model: Business;
  formControl = new FormControl('', [
    Validators.required
  // Validators.email,
  ]);

  constructor(
    private apiService: ApiService
  ) {
    this.model = new Business();
   }

  ngOnInit() {
  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Campo requerido' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit(form) {
    this.apiService.post('/empresas', this.model)
    .subscribe(res => {
        this.model = res.model as Business;
        //this.snackBarService.openSnackBar('res');

    });
  }

}
