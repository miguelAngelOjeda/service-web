import { Component, OnInit, Inject } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Users } from '../../../core/models';
import { ApiService } from '../../../core/services';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig  } from '@angular/material';

@Component({
  selector: 'app-password-profile',
  templateUrl: './password-profile.component.html',
  styleUrls: ['./password-profile.component.css']
})
export class PasswordProfileComponent implements OnInit {
  passwordForm: FormGroup;
  private model = new Users;
  formControl = new FormControl('', [
    Validators.required
  // Validators.email,
  ]);
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    public dialogRef: MatDialogRef<PasswordProfileComponent>,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: Users
  ) {}

   ngOnInit() {
     this.passwordForm = this.formBuilder.group({
       contraseña: ['', [Validators.required]],
       nueva_contraseña: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
       confirmar_contraseña: ['', [Validators.required]]
     });
   }

   onSubmit() {

   }


}
