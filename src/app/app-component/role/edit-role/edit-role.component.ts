import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Role, Authorities } from '../../../core/models';
import { ApiService } from '../../../core/services';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.scss']
})
export class EditRoleComponent implements OnInit {
  private model = new Role;
  private authorities: Array<Authorities> = [];

  formControl = new FormControl('', [Validators.required]);

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {

    this.apiService.get('/roles/' + this.route.snapshot.params.id)
    .subscribe(res => {
       this.model = res.model as Role;
    });

    this.apiService.getPageList('/roles/group',false)
    .subscribe(res => {
        this.authorities = res.rows;
        this.authorities.forEach(item => {
           item.authority.forEach(auth=> {
             this.model.authorities.forEach(authModel=> {
               if(auth.id === authModel.id){
                 auth.checked = true;
               }
             });
           });
        });
    });


  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Campo requerido' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit(form) {
    this.model.authorities = [];
    this.authorities.forEach(item => {
       item.authority.forEach(auth=> {
         if(auth.checked){
           this.model.authorities.push(auth);
         }
       });
    });
    this.apiService.put('/roles/' + this.route.snapshot.params.id, this.model)
    .subscribe(res => {
        //this.snackBarService.openSnackBar('res');
    });
  }

}
