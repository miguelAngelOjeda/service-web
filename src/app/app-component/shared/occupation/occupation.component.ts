import { Component, OnInit, EventEmitter, Output, Input, ElementRef } from '@angular/core';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators, ControlContainer, FormGroupDirective} from '@angular/forms';
import { MatDialog, PageEvent, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';
import { DeleteDialogComponent } from '../../../shared';
import { Estate, Message } from '../../../core/models';
import { UserService, ApiService, FormsService} from '../../../core/services';

@Component({
  selector: 'app-occupation',
  templateUrl: './occupation.component.html',
  styleUrls: ['./occupation.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class OccupationComponent implements OnInit {
  occupationForm: FormGroup;
  peopleForm: FormGroup;

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
    this.peopleForm = (<FormGroup>this.occupationForm.get('persona'));

    this.peopleForm.addControl(this.formArrayName, this.formBuilder.array([]));
    this.addButton();
    //this.onChanges();
    //this.onChangesPeople();
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

  onChanges(){
    (<FormGroup>this.peopleForm.get('persona')).controls['tipoPersona'].valueChanges
    .subscribe(tipoPersona => {
        if(tipoPersona != 'FISICA'){
          (<FormArray>this.peopleForm.get(this.formArrayName)).controls
            .forEach(control => {
              control.disable();
            });
        }else{
          (<FormArray>this.peopleForm.get(this.formArrayName)).controls
            .forEach(control => {
              control.enable();
            });
        }
    });
  }

  onChangesFkModel(id:any){
      this.apiService.getPageList('/ocupaciones',false,null,null, 'desc', 'id',0,50, false,id)
      .subscribe(res => {
        if(res.status == 200){
          if(res.rows != null
              && res.rows.length > 0){
                const ocupaciones = (<FormArray>this.peopleForm.get(this.formArrayName));
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

  addButton(): void {
    (<FormArray>this.peopleForm.get(this.formArrayName)).push(this.addFormGroup());
  }

  delete(data: any){
    if(data.id){
      const message = new Message;
      message.titulo = "Eliminar Registro"
      message.texto = "Esta seguro que desea eliminar el registro ";

      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = message;

      let dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.apiService.delete('/ocupaciones/' + data.id)
          .subscribe(res => {
              if(res.status == 200){
                (<FormArray>this.peopleForm.get(this.formArrayName)).removeAt((<FormArray>this.peopleForm.get(this.formArrayName)).value.findIndex(dep => dep === data))
              }
          });
        }
      })
    }else{
      (<FormArray>this.peopleForm.get(this.formArrayName)).removeAt((<FormArray>this.peopleForm.get(this.formArrayName)).value.findIndex(dep => dep === data))
    }

    if(this.minRow > 0){
      if((<FormArray>this.peopleForm.get(this.formArrayName)).controls.length < this.minRow){
        this.addButton();
      }
    }
  }

  onChangesPeople(){
    this.peopleForm.controls['id'].valueChanges
    .subscribe(id => {
        this.onChangesFkModel(id);
    });
  }

  getValue(data: any, form : FormControl): void {
    form.setValue(data);
  }

}
