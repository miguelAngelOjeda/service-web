import { Component, OnInit, EventEmitter, Output, Input, ElementRef } from '@angular/core';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators, ControlContainer, FormGroupDirective} from '@angular/forms';
import { MatDialog, PageEvent, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';
import { UserService, ApiService, FormsService} from '../../../../core/services';

@Component({
  selector: 'app-view-occupation',
  templateUrl: './view-occupation.component.html',
  styleUrls: ['./view-occupation.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class ViewOccupationComponent implements OnInit {
  occupationForm: FormGroup;
  formArrayName = 'ocupaciones';
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
    private apiService: ApiService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.occupationForm = this.parentF.form;
    this.occupationForm.addControl(this.formArrayName, this.formBuilder.array([]));
  }

  //bienes Inmueble
  addFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: null,
      cargo: [null, Validators.required],
      empresa: [null, Validators.required],
      tipoTrabajo: [null, [Validators.required]],
      direccion: [null, [Validators.required]],
      telefonoPrincipal: [null, [Validators.required]],
      telefonoSecundario: null,
      fechaIngreso: [null, [Validators.required]],
      fechaSalida: null,
      interno: null,
      ingresosMensuales: 0,
      tipoOcupacion: [null, [Validators.required]]
    });
  }


  onChangesFkModel(id:any){
      this.apiService.getPageList('/ocupaciones',false,null,null, 'desc', 'id',0,50, false,id)
      .subscribe(res => {
        if(res.status == 200){
          if(res.rows != null
              && res.rows.length > 0){
                const ocupaciones = (<FormArray>this.occupationForm.get(this.formArrayName));
                while (ocupaciones.length) {
                  ocupaciones.removeAt(0);
                }
                res.rows.forEach(staff => {
                  staff.fechaIngreso = new Date(staff.fechaIngreso);
                  if(staff.fechaSalida){
                    staff.fechaSalida = new Date(staff.fechaSalida);
                  }
                  ocupaciones.push(this.formBuilder.group(staff));
                });
          }
        }
      });
  }

}
