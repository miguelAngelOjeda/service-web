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
  @Input() urlFilter;
  @Input()
  set fkFilterModel(model: any) {
    if(model){

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
    this.vehicleForm.addControl('bienesVehiculo', this.formBuilder.array([]));
    this.addButton();
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

  addButton(): void {
    (<FormArray>this.vehicleForm.get('bienesVehiculo')).push(this.addFormGroup());
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
          this.apiService.delete('/' + this.urlFilter +'/' + data.id)
          .subscribe(res => {
              if(res.status == 200){
                (<FormArray>this.vehicleForm.get('bienesVehiculo')).removeAt((<FormArray>this.vehicleForm.get('bienesVehiculo')).value.findIndex(dep => dep === data))
              }
          });
        }
      })
    }else{
      (<FormArray>this.vehicleForm.get('bienesVehiculo')).removeAt((<FormArray>this.vehicleForm.get('bienesVehiculo')).value.findIndex(dep => dep === data))
    }
  }

}
