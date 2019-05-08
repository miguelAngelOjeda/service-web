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

  private model = new Role;
  private authorities: Array<Authorities> = [];
  authoritySelect: Authorities[];
  selectedOption;

  formControl = new FormControl('', [Validators.required]);

  constructor(
    private apiService: ApiService
  ) {
    this.authorities = [];
  }

  ngOnInit() {
    this.apiService.getPageList('/roles/group',false)
    .subscribe(res => {
        this.authorities = res.rows;
        console.log(this.authorities);
        //this.snackBarService.openSnackBar('res');

    });
  }



  submit(form) {

    console.log(this.model);


    // this.apiService.post('/roles/group', this.model)
    // .subscribe(res => {
    //     this.model = res.model as Role;
    //     //this.snackBarService.openSnackBar('res');
    //
    // });
  }

  onNgModelChange($event){
    console.log('selected room', $event);
    this.selectedOption=$event;
  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Campo requerido' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

}
