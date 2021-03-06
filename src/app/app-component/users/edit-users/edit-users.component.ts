import { Component, OnInit, Inject, ViewChild, ElementRef  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { FormControl, Validators, FormBuilder, FormGroup} from '@angular/forms';
import { UserService, ApiService} from '../../../core/services';
import { ActivatedRoute } from '@angular/router';
import { Users, Role, Rules, Filter, Countries, DepartmentsCountri, Cities,
   Subsidiary, Departments, Nationalities } from '../../../core/models';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.scss']
})
export class EditUsersComponent implements OnInit {
  myForm: FormGroup;
  hide = true;
  public departments: Array<Departments> = [];

  constructor(
    private route: ActivatedRoute,
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
    this.apiService.get('/usuarios/' + this.route.snapshot.params.id)
    .subscribe(res => {
      if(res.status == 200){
        res.model.persona.fechaNacimiento =  new Date(res.model.persona.fechaNacimiento);
        (<FormGroup>this.myForm).patchValue(res.model);
      }
    });
  }

  submit() {
    this.apiService.put('/usuarios/' + this.route.snapshot.params.id, this.myForm.value)
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
      departamentos: [null, [Validators.required]],
      sucursal: ['', [Validators.required]],
      activo: 'S'
    });
  }

  getValue(data: any, form : any): void {
    (<FormControl>this.myForm.get(form)).setValue(data);
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
