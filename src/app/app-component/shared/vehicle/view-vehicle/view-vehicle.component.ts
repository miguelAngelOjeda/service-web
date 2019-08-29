import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../../../../core/services';
import {merge, fromEvent, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap, filter} from 'rxjs/operators';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators,
   ControlContainer, FormGroupDirective} from '@angular/forms';

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class ViewVehicleComponent implements OnInit {
  vehicleForm: FormGroup;
  peopleForm: FormGroup;

  formArrayName = 'bienesVehiculo';
  @Input() minRow;

  @Input()
  set fkFilterModel(id: any) {
    if(id){
      this.onChangesFkModel(id);
    }
  }

  constructor(
    private parentF: FormGroupDirective,
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.vehicleForm = this.parentF.form;
    this.peopleForm = (<FormGroup>this.vehicleForm.get('persona'));

    this.peopleForm.addControl(this.formArrayName, this.formBuilder.array([]));
  }

  //bienes Vehiculo
  addFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [''],
      marca: ['', Validators.required],
      modeloAnio: [null, [Validators.required]],
      valorActual: [null, [Validators.required]],
      cuotaMensual: '',
      saldo: '',
      tipoBien: 'VEHICULO',
      activo: ['S']
    });
  }

  onChangesFkModel(id:any){
      this.apiService.getPageList('/vehiculos',false,null,null, 'desc', 'id',0,50, false,id)
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

  addButton(): void {
    (<FormArray>this.peopleForm.get(this.formArrayName)).push(this.addFormGroup());
  }

}
