import { Component, OnInit, Inject, ElementRef, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ValidationService } from '../../../../core/services/validation.service';
import { Message, Location } from '../../../../core/models';
import { DeleteDialogComponent } from '../../../../shared';
import { UserService, ApiService, ReviewService } from '@core/service';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators} from '@angular/forms';
import { MatPaginator, MatTableDataSource, MatDialog, MatSort, PageEvent,
   Sort, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-add-modal-schedule',
  templateUrl: './add-modal-schedule.component.html',
  styleUrls: ['./add-modal-schedule.component.css']
})
export class AddModalScheduleComponent implements OnInit{
  style = "max-height: 75vh";
  public minDate = new Date();
  public modelForm: FormGroup;

  constructor(
            public dialog: MatDialog,
            private formBuilder: FormBuilder,
            public dialogRef: MatDialogRef<AddModalScheduleComponent>,
            private apiService: ApiService,
            @Inject(MAT_DIALOG_DATA) public data: any) {

            }

  ngOnInit() {
    this.initFormBuilder();
  }

  onSubmit() {
    this.apiService.post('/citas', this.modelForm.value)
    .subscribe(res => {
      if(res.status == 200){
        res.model.fechaConsulta = new Date(res.model.fechaConsulta);
        this.modelForm.patchValue(res.model);
      }
    });
  }

  initFormBuilder() {
    this.modelForm = this.formBuilder.group({
      id: null,
      codigoConsulta: null ,
      nuevoCliente: false ,
      fechaConsulta: [new Date(), [Validators.required]],
      horaInicio: [null, [Validators.required]],
      horaFin: [null, [Validators.required]],
      duracion: [null, [Validators.required]],
      tipoCitas: [null, [Validators.required]],
      estadoCitas: [null, [Validators.required]],
      funcionario: [null, [Validators.required]],
      cliente: [null, [Validators.required]],
      observacion: null,
      color: null,
      recordatorio: true
    });

    this.modelForm.controls['horaInicio'].valueChanges.subscribe(
        (horaInicio) => {
          if(horaInicio){
            let arrayInicio: Array<any> = horaInicio.split(':');
            let minutoInicio = Number(arrayInicio[0]) * 60 + Number(arrayInicio[1]);

            let horaFin = this.modelForm.get('horaFin').value;
            if(horaFin){
              let arrayFin: Array<any> = horaFin.split(':');
              let minutoFin = Number(arrayFin[0]) * 60 + Number(arrayFin[1]);
              if(minutoFin > minutoInicio){
                this.modelForm.get('duracion').setValue(minutoFin - minutoInicio, {emitEvent:false});
              }
            }
          }
        }
    );
    this.modelForm.controls['horaFin'].valueChanges.subscribe(
        (horaFin) => {
          if(horaFin){
            let array: Array<any> = horaFin.split(':');
            let minutoFin = Number(array[0]) * 60 + Number(array[1]);

            let horaInicio = this.modelForm.get('horaInicio').value;
            if(horaInicio){
              let arrayInicio: Array<any> = horaInicio.split(':');
              let minutoInicio = Number(arrayInicio[0]) * 60 + Number(arrayInicio[1]);
              if(minutoFin > minutoInicio){
                this.modelForm.get('duracion').setValue(minutoFin - minutoInicio, {emitEvent:false});
              }
            }
          }
        }
    );
  }

  getValue(data: any, form : any): void {
    (<FormControl>this.modelForm.get(form)).setValue(data);
    console.log(this.modelForm);
  }

}
