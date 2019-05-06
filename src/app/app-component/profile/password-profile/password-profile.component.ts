import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Users, People, Rol, Subsidiary, Business } from '../../../core/models';
import { ApiService } from '../../../core/services';

@Component({
  selector: 'app-password-profile',
  templateUrl: './password-profile.component.html',
  styleUrls: ['./password-profile.component.css']
})
export class PasswordProfileComponent implements OnInit {
  passwordForm: FormGroup;
  private model: Users;
  formControl = new FormControl('', [
    Validators.required
  // Validators.email,
  ]);
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {
      this.model = new Users;
   }

   ngOnInit() {
     this.apiService.get('/usuarios/' + this.route.snapshot.params.id)
     .subscribe(res => {
        this.model = res.model;
     });
     this.passwordForm = this.formBuilder.group({
       contraseña: ['', [Validators.required]],
       nueva_contraseña: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
       confirmar_contraseña: ['', [Validators.required]]
     });
   }

   onSubmit() {

   }


}
