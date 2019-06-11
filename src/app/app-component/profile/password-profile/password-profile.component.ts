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
  hide = true;
  public model = new Users;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    public dialogRef: MatDialogRef<PasswordProfileComponent>,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: Users
  ) {}

   ngOnInit() {
     this.passwordForm = this.formBuilder.group({
       claveAcceso: ['', [Validators.required]],
       nuevaClaveAcceso: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
       confirmarClaveAcceso: ['', [Validators.required]]
     });
   }

   onSubmit() {
     this.apiService.put('/usuarios/password/' + this.route.snapshot.params.id, this.passwordForm.value)
     .subscribe(res => {
       if(res.status == 200){

       }
     });
   }


}
