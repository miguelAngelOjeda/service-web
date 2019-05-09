import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Role, Authorities} from '../../../core/models';
import { ApiService } from '../../../core/services';
import {FormControl, Validators, FormGroup, FormBuilder, FormArray} from '@angular/forms';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent implements OnInit {
  authoritiesForm: FormGroup;
  private model = new Role;
  private authorities: Array<Authorities> = [new Authorities];
  authoritySelect: Array<Authorities> = [];
  selectedOption;

  formControl = new FormControl('', [Validators.required]);

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
    this.authoritiesForm = this.fb.group({
      id: [''],
      nombre: [''],
      authorities: new FormArray([this.addFormGroup()])
    });
  }
  ngOnInit() {
    this.apiService.getPageList('/roles/group',false)
    .subscribe(res => {

        this.model.authorities = res.rows;
        console.log(this.model);
        this.addDinamicClick();
        this.authoritiesForm.setValue(this.model);
        console.log(this.authoritiesForm.controls['authorities']);
        //this.snackBarService.openSnackBar('res');

    });
  }



  submit(form) {
    console.log(this.authoritySelect);
    this.model.authorities = this.authoritySelect;
    console.log(this.model);


    // this.apiService.post('/roles/group', this.model)
    // .subscribe(res => {
    //     this.model = res.model as Role;
    //     //this.snackBarService.openSnackBar('res');
    //
    // });
  }

  onNgModelChange($event, sel:any){
    console.log(sel);
    if(sel.selected){
      console.log(sel.value);
      this.authoritySelect.push(sel.value);
    }else{
      this.authoritySelect.splice(this.authoritySelect.indexOf(sel.value), 1);
    }
    this.selectedOption=$event;
  }

  addDinamicClick(): void {
    for (let i = 0; i < this.model.authorities.length - 1; i++) {
      (<FormArray>this.authoritiesForm.get('authorities')).push(this.addFormGroup());
    }
  }

  addFormGroup(): FormControl {
    return new FormControl({
      id: [''],
      role: [''],
      descripcion: [''],
      nombre: [''],
      grupo: [''],
      authority: ['']
    });
  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Campo requerido' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

}
