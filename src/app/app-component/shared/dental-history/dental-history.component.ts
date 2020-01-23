import { Component, OnInit, OnChanges, EventEmitter, Output, Input, ElementRef } from '@angular/core';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators, ControlContainer, FormGroupDirective} from '@angular/forms';
import { MatDialog, PageEvent, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';
import { DeleteDialogComponent } from '../../../shared';
import { HttpParams } from '@angular/common/http';
import { Estate, Message, Location } from '../../../core/models';
import { UserService, ApiService, PeopleService, FormsService } from '@core/service';

@Component({
  selector: 'app-dental-history',
  templateUrl: './dental-history.component.html',
  styleUrls: ['./dental-history.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class DentalHistoryComponent implements OnInit{
  public modelForm: FormGroup;
  public form: FormGroup;

  constructor(
    private controlContainer: ControlContainer,
    private parentF: FormGroupDirective,
    private peopleService: PeopleService,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    public dialog: MatDialog
  ) {}


  ngOnInit() {
    this.modelForm = this.parentF.form;
    this.modelForm.addControl('historialOdontologico', this.formBuilder.group({
      id: null ,
      ultimaConsulta: [null, [Validators.required]],
      higieneBucal: [null, [Validators.required]],
      cepillo: null,
      hiloDental: null,
      enjuagues: null,
      otros: null,
      perdidaPiezaDentaria: [null, [Validators.required]],
      motivoPerdidaDentaria: null,
      alteracionesPeriodentales: [null, [Validators.required]],
      tiposAlteraciones: null,
      lesiones: null,
      observaciones: null
    }));
  }
}
