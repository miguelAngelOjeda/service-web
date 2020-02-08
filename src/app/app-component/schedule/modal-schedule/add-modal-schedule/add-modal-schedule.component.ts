import { Component, OnInit, Inject, ElementRef, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ValidationService } from '../../../../core/services/validation.service';
import { Message, Location } from '../../../../core/models';
import { DeleteDialogComponent } from '../../../../shared';
import { UserService, ApiService, ReviewService } from '@core/service';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators} from '@angular/forms';
import {MatDatepicker, MatDatepickerInputEvent} from '@angular/material/datepicker';
import { MatPaginator, MatTableDataSource, MatDialog, MatSort, PageEvent,
   Sort, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-add-modal-schedule',
  templateUrl: './add-modal-schedule.component.html',
  styleUrls: ['./add-modal-schedule.component.css']
})
export class AddModalScheduleComponent implements OnInit{
  public CLOSE_ON_SELECTED = false;
  public init = new Date();
  public resetModel = new Date(0);
  public minDate = new Date();
  public modelForm: FormGroup;
  public displayedColumns = ['tipoCitas', 'horaInicio', 'horaFin','estadoCitas'];
  public dataSource = new MatTableDataSource<any>();


  @ViewChild('picker', { static: true }) _picker: MatDatepicker<Date>;

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

  public onSubmit() {
    this.apiService.post('/citas', this.modelForm.value)
    .subscribe(res => {
      if(res.status == 200){
        res.model.fechaConsulta = new Date(res.model.fechaConsulta);
        this.modelForm.patchValue(res.model);
      }
    });
  }

  public initFormBuilder() {
    this.modelForm = this.formBuilder.group({
      id: null,
      codigoConsulta: null ,
      nuevoCliente: false ,
      citaRepetida: false ,
      fechasRepetidas: this.formBuilder.array([]),
      fechaConsulta: [new Date(), [Validators.required]],
      horaInicio: [null, [Validators.required]],
      horaFin: [null, [Validators.required]],
      duracion: [null, [Validators.required]],
      tipoCitas: [null, [Validators.required]],
      estadoCitas: [null, [Validators.required]],
      especialidad: [null],
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

  public getValue(data: any, form : any): void {
    (<FormControl>this.modelForm.get(form)).setValue(data);
  }

  public dateClass = (date: Date) => {
    if (this._findDate(date) !== -1) {
      return [ 'selected' ];
    }
    return [ ];
  }

  public dateChanged(event: MatDatepickerInputEvent<Date>): void {
    if (event.value) {
      const date = event.value;
      const index = this._findDate(date);
      if (index === -1) {
        const fechas = (<FormArray>this.modelForm.get('fechasRepetidas'));
        fechas.push(new FormControl(date));
        // this.model.push(date);
      } else {
        (<FormArray>this.modelForm.get('fechasRepetidas')).controls.splice(index, 1)
      }
      this.resetModel = new Date(0);
      if (!this.CLOSE_ON_SELECTED) {
        const closeFn = this._picker.close;
        this._picker.close = () => { };
        //this._picker['_popupComponentRef'].instance._calendar.monthView._createWeekCells()
        setTimeout(() => {
          this._picker.close = closeFn;
        });
      }
    }
  }

  public remove(date: Date): void {
    const index = this._findDate(date);
    (<FormArray>this.modelForm.get('fechasRepetidas')).removeAt(index)
  }

  private _findDate(date: Date): number {
    return (<FormArray>this.modelForm.get('fechasRepetidas')).value.findIndex(dep => dep === date);
  }

}
