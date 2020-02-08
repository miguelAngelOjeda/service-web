import { Component, OnInit, Inject, ElementRef, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService, ApiService, ReviewService, PeopleService, ValidationService } from '@core/service';
import { Subsidiary, Departments, Message, Location } from '../../../../core/models';
import { DeleteDialogComponent } from '../../../../shared';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators} from '@angular/forms';
import { MatPaginator, MatTableDataSource, MatDialog, MatSort, PageEvent,
   Sort, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-view-modal-schedule',
  templateUrl: './view-modal-schedule.component.html',
  styleUrls: ['./view-modal-schedule.component.css']
})
export class ViewModalScheduleComponent implements OnInit{
  modelForm: FormGroup;

  constructor(
            public dialog: MatDialog,
            private formBuilder: FormBuilder,
            private peopleService: PeopleService,
            public dialogRef: MatDialogRef<ViewModalScheduleComponent>,
            private apiService: ApiService,
            @Inject(MAT_DIALOG_DATA) public data: any) {
              this.initFormBuilder();
              this.modelForm.patchValue(data);
  }

  ngOnInit() {
  }


  initFormBuilder() {
    this.modelForm = this.formBuilder.group({
      id: null,
      codigoConsulta: null ,
      nuevoCliente: false ,
      fechaConsulta: [{ value: new Date(), disabled: true }, [Validators.required]],
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
  }
}
