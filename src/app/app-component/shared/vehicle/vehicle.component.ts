import { Component, OnInit, EventEmitter, Output, Input, ElementRef } from '@angular/core';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators, ControlContainer, FormGroupDirective} from '@angular/forms';
import { MatDialog, PageEvent, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';
import { DeleteDialogComponent } from '../../../shared';
import { Estate, Message } from '../../../core/models';
import { UserService, ApiService, FormsService} from '../../../core/services';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class VehicleComponent implements OnInit {
  vehicleForm: FormGroup;
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
    private apiService: ApiService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.vehicleForm = this.parentF.form;
    this.vehicleForm.addControl(this.formArrayName, this.formBuilder.array([]));
    this.addButton();
    this.onChangesPeople();
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
                const formArray = (<FormArray>this.vehicleForm.get(this.formArrayName));
                while (formArray.length) {
                  formArray.removeAt(0);
                }
                res.rows.forEach(staff => formArray.push(this.formBuilder.group(staff)));
          }
        }
      });
  }

  addButton(): void {
    (<FormArray>this.vehicleForm.get(this.formArrayName)).push(this.addFormGroup());
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
          this.apiService.delete('/vehiculos/' + data.id)
          .subscribe(res => {
              if(res.status == 200){
                (<FormArray>this.vehicleForm.get(this.formArrayName)).removeAt((<FormArray>this.vehicleForm.get(this.formArrayName)).value.findIndex(dep => dep === data))
              }
          });
        }
      })
    }else{
      (<FormArray>this.vehicleForm.get(this.formArrayName)).removeAt((<FormArray>this.vehicleForm.get(this.formArrayName)).value.findIndex(dep => dep === data))
    }

    if(this.minRow > 0){
      if((<FormArray>this.vehicleForm.get(this.formArrayName)).controls.length < this.minRow){
        this.addButton();
      }
    }
  }

  onChangesPeople(){
    (<FormGroup>this.vehicleForm.get('persona')).controls['id'].valueChanges
    .subscribe(id => {
        this.onChangesFkModel(id);
    });
  }

}
