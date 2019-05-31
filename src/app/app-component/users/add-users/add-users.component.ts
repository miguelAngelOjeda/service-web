import { Component, OnInit, Inject, ViewChild, ElementRef  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { FormControl, Validators, FormBuilder, FormGroup} from '@angular/forms';
import { UserService, ApiService} from '../../../core/services';
import { Users, Role, Rules, Filter, Countries, DepartmentsCountri, Cities,
   Subsidiary, Departments, Nationalities } from '../../../core/models';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent implements OnInit {
    myForm: FormGroup;
    protected departments: Array<Departments> = [];

    constructor(
      private formBuilder: FormBuilder,
      private apiService: ApiService,
    ) { }

    ngOnInit() {
      this.initFormBuilder();
      this.myForm.get('sucursal').valueChanges.subscribe(
        uname => {
      	  this.filterDepartments();
        }
      );
    }

    submit() {
      this.apiService.post('/usuarios/', this.myForm.value)
      .subscribe(res => {

      });
    }

    protected initFormBuilder() {
      this.myForm = this.formBuilder.group({
        id: null ,
        alias: [null, [Validators.required]],
        expirationTimeTokens: [5, [Validators.required]],
        claveAcceso: [null, [Validators.required]],
        rol: [null, [Validators.required]],
        sucursal: [null, [Validators.required]],
        departamentos: [null, [Validators.required]],
        activo: 'S'
      });
    }

    getValue(data: any, form : FormControl): void {
      form.setValue(data);
    }



    protected filterDepartments() {
      if(this.myForm.get('sucursal').value.id != null){
        this.apiService.getPageList('/sucursales/' + this.myForm.get('sucursal').value.id +'/departamentos',false,null,null, 'desc', 'id',
        0,10)
        .subscribe(res => {
          if(res.status == 200){
            this.departments = res.rows as Departments[];
          }
        });
      }
    }


    compareObjects(o1: any, o2: any): boolean {
      if(!o1
            || !o2){
        return false;
      }
      return  o1.id === Number(o2.id);
    }




  }
