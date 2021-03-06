import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Login } from '../core/models';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, UserService } from '../core/services';
import { Errors } from '../core/models';

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css']})
export class LoginComponent implements OnInit {
    private model: Login;
    authType: String = '';
    title: String = '';
    errors: Errors = {errors: {}};
    isSubmitting = false;
    errorMsg: String = '';

    formControl = new FormControl('', [
      Validators.required
    // Validators.email,
    ]);

    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private userService: UserService) {
        this.model = new Login();
    }

    ngOnInit() {
      this.route.url.subscribe(data => {
        // Get the last piece of the URL (it's either 'login' or 'register')
        this.authType = 'login';
        // Set a title for the page accordingly
        this.title = 'Acceder';
      });

    }

    submitForm() {
      this.isSubmitting = true;
      this.errors = {errors: {}};

      this.userService
      .attemptAuth(this.authType, this.model)
      .subscribe(
        data => {
          this.router.navigateByUrl('service-web/home')
        },
        err => {
          this.errors = err;
          console.log(err);
          this.errorMsg = err;
          this.isSubmitting = false;
        }
      );
    }

    getErrorMessage() {
      return this.formControl.hasError('required') ? 'Campo requerido' :
        this.formControl.hasError('email') ? 'Not a valid email' :
          '';
    }

}
