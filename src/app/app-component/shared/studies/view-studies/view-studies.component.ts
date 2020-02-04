import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../../../../core/services';
import { MatTableDataSource, MatSort, PageEvent, Sort} from '@angular/material';
import {merge, fromEvent, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap, filter} from 'rxjs/operators';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators,
   ControlContainer, FormGroupDirective} from '@angular/forms';

@Component({
  selector: 'app-view-studies',
  templateUrl: './view-studies.component.html',
  styleUrls: ['./view-studies.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class ViewStudiesComponent implements OnInit {
  public studiesForm: FormGroup;
  public peopleForm: FormGroup;
  public displayedColumns = ['tipoEstudio', 'nombre', 'semestre','fechaInicio','fechaFin','concluido','titulo','numeroRegistro'];
  public dataSource = new MatTableDataSource<any>();

  formArrayName = 'estudios';

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
    this.studiesForm = this.parentF.form;
    this.peopleForm = (<FormGroup>this.studiesForm.get('persona'));
    this.peopleForm.addControl(this.formArrayName, this.formBuilder.array([]));
    this.peopleForm.controls[this.formArrayName].valueChanges.subscribe(
        (registros) => {
          this.dataSource.data = registros;
        }
    );
  }

  onChangesFkModel(id:any){
      this.apiService.getPageList('/estudios',false,null,null, 'desc', 'id',0,50, false,id)
      .subscribe(res => {
        if(res.status == 200){
          if(res.rows != null
              && res.rows.length > 0){
                const formArray = (<FormArray>this.peopleForm.get(this.formArrayName));
                while (formArray.length) {
                  formArray.removeAt(0);
                }
                res.rows.forEach(staff => {
                  staff.fechaInicio =  new Date(staff.fechaInicio);
                  formArray.push(this.formBuilder.group(staff))
                });
          }
        }
      });
  }

  //Referencias
  addFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [''],
      fechaInicio: ['', Validators.required],
      fechaFin : [''],
      titulo: [''],
      concluido: [false, Validators.required],
      numeroRegistro: [null],
      nombre: [null],
      semestre: [null],
      tipoEstudio : ['', Validators.required],
      activo: ['S']
    });
  }

  addButton(): void {
    (<FormArray>this.peopleForm.get(this.formArrayName)).push(this.addFormGroup());
  }

}
