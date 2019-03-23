import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, UserService } from '../core/services';
import { Errors } from '../core/models';

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css']})
export class LoginComponent implements OnInit {
    authType: String = '';
    title: String = '';
    errors: Errors = {errors: {}};
    isSubmitting = false;
    authForm: FormGroup;

    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private userService: UserService,
      private fb: FormBuilder) {

          // use FormBuilder to create a form group
          this.authForm = this.fb.group({
            'username': ['', Validators.required],
            'password': ['', Validators.required]
          });
        }

    ngOnInit() {
      this.route.url.subscribe(data => {
        // Get the last piece of the URL (it's either 'login' or 'register')
        this.authType = 'login';
        // Set a title for the page accordingly
        this.title = 'Login';
      });

    }

    submitForm() {
      this.isSubmitting = true;
      this.errors = {errors: {}};

      const credentials = this.authForm.value;
      console.log(credentials);
      this.userService
      .attemptAuth(this.authType, credentials)
      .subscribe(
        data => {
          console.log(data);
          this.router.navigateByUrl('service-web/home')
        },
        err => {
          this.errors = err;
          this.isSubmitting = false;
        }
      );
    }

}
