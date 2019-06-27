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
  public isViewClave: Boolean = true;
  public isViewNewClave: Boolean = true;
  public isViewNewConf: Boolean = true;
  public model = new Users;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    public dialogRef: MatDialogRef<PasswordProfileComponent>,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: Users
  ) {
    this.model = data;
  }

   ngOnInit() {
     this.passwordForm = this.formBuilder.group({
       claveAcceso: ['', [Validators.required]],
       nuevaClaveAcceso: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
       confirmarClaveAcceso: ['', [Validators.required]]
     });
   }

   onSubmit() {

     this.apiService.put('/usuarios/password/' + this.model.id, this.passwordForm.value)
     .subscribe(res => {
       if(res.status == 200){

       }
     });
   }


}
