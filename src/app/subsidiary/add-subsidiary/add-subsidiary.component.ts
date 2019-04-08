import { Component, OnInit } from '@angular/core';
import { Subsidiary } from '../../core/models';
import {FormControl, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../core/services';

@Component({
  selector: 'app-add-subsidiary',
  templateUrl: './add-subsidiary.component.html',
  styleUrls: ['./add-subsidiary.component.css']
})
export class AddSubsidiaryComponent implements OnInit {
  private model: Subsidiary;
  formControl = new FormControl('', [
    Validators.required
  // Validators.email,
  ]);

  constructor(
    private apiService: ApiService
  ) {
    this.model = new Subsidiary();
   }

  ngOnInit() {
  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Campo requerido' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit(form) {
    this.apiService.post('/sucursales', this.model)
    .subscribe(res => {
        this.model = res.model as Subsidiary;
        //this.snackBarService.openSnackBar('res');

    });
  }
}
