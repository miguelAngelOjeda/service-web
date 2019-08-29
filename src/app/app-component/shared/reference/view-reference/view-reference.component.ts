import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../../../../core/services';
import {merge, fromEvent, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap, filter} from 'rxjs/operators';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators, ControlContainer, FormGroupDirective} from '@angular/forms';

@Component({
  selector: 'app-view-reference',
  templateUrl: './view-reference.component.html',
  styleUrls: ['./view-reference.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class ViewReferenceComponent implements OnInit {
  peopleForm: FormGroup;
  referenceForm: FormGroup;

  formArrayName = 'referencias';

  @Input() minRow;

  @Input()
  set fkFilterModel(id: any) {
    if(id){
      this.onChangesFkModel(id);
    }
  }

  @Input()
  set formControlNameArray(model: any) {
    if(model){
      this.formArrayName = model;
    }
  }

  constructor(
    private parentF: FormGroupDirective,
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.referenceForm = this.parentF.form;
    this.peopleForm = (<FormGroup>this.referenceForm.get('persona'));

    this.peopleForm.addControl(this.formArrayName, this.formBuilder.array([]));
    //this.addButton();
  }

  onChangesFkModel(id:any){
      this.apiService.getPageList('/referencias',false,null,null, 'desc', 'id',0,50, false,id)
      .subscribe(res => {
        if(res.status == 200){
          if(res.rows != null
              && res.rows.length > 0){
                const formArray = (<FormArray>this.peopleForm.get(this.formArrayName));
                while (formArray.length) {
                  formArray.removeAt(0);
                }
                res.rows.forEach(staff => formArray.push(this.formBuilder.group(staff)));
          }
        }
      });
  }

  //Referencias
  addFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [''],
      nombreContacto: ['', Validators.required],
      telefonoCelular : ['', Validators.required],
      telefono: [''],
      tipoReferencia : ['', Validators.required],
      activo: ['S']
    });
  }

  addButton(): void {
    (<FormArray>this.peopleForm.get(this.formArrayName)).push(this.addFormGroup());
  }

}
