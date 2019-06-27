import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Role, Authorities} from '../../../core/models';
import { ApiService } from '../../../core/services';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent implements OnInit {
  public model = new Role;
  public authorities: Array<Authorities> = [];
  formControl = new FormControl('', [Validators.required]);

  constructor(
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.apiService.getPageList('/roles/group',false)
    .subscribe(res => {
        this.authorities = res.rows;

    });
  }



  submit(form) {
    this.authorities.forEach(item => {
       item.authority.forEach(auth=> {
         if(auth.checked){
           this.model.authorities.push(auth);
         }
       });
    });

    this.apiService.post('/roles', this.model)
    .subscribe(res => {
      if(res.status == 200){
        this.model = res.model as Role;
      }
    });
  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Campo requerido' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

}
