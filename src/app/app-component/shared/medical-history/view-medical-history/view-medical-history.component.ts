import { Component, OnInit, OnChanges, EventEmitter, Output, Input, ElementRef } from '@angular/core';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators, ControlContainer, FormGroupDirective} from '@angular/forms';
import { MatDialog, PageEvent, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';
import { UserService, ApiService, ReviewService, ValidationService } from '@core/service';

@Component({
  selector: 'app-view-medical-history',
  templateUrl: './view-medical-history.component.html',
  styleUrls: ['./view-medical-history.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class ViewMedicalhistoryComponent implements OnInit{
  public modelForm: FormGroup;
  public form: FormGroup;

  constructor(
    private controlContainer: ControlContainer,
    private parentF: FormGroupDirective,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    public dialog: MatDialog
  ) {}


  ngOnInit() {
    this.modelForm = this.parentF.form;
    this.modelForm.addControl('historialMedico', this.formBuilder.group({
      id: null ,
      tratamientoMedico: null,
      motivoTratamiento: null,
      tiempoTratamiento: null,
      medicoTratante: null,
      telefMedicoTratante: null,
      medicacion: null,
      motivoMedicacion: null,
      variacionPeso: null,
      hipertensionArterial: null,
      problemasCardiacos: null,
      afeccionesRenales: null,
      lesionesHepaticas: null,
      alergias: null,
      diabetes: null,
      problemasCoagulacion: null,
      hemofilia: null,
      fiebreReumatica: null,
      ulceras: null,
      ets: null,
      anemias: null,
      afeccionesPsiquicas: null,
      epilepsia: null,
      sinusitis: null,
      transtornosRespiratorios: null,
      observaciones: null,
      operacion: null,
      motivoOperacion: null,
      anestesia: null,
      inconvenienteAnestesia: null,
      motivoInconveniente: null,
      embarazo: null,
      semanasEmbarazo: null,
      sienteNervios: null,
      malaExperiencia: null
    }));
  }
}
