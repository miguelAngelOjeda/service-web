import { Component, OnInit, Inject, ElementRef, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ValidationService } from '../../../core/services/validation.service';
import { PeopleService } from '../people/people.service';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators} from '@angular/forms';
import { MatPaginator, MatTableDataSource, MatDialog, MatSort, PageEvent,
   Sort, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-informconf',
  templateUrl: './informconf.component.html',
  styleUrls: ['./informconf.component.css']
})
export class InformconfComponent implements OnInit{
  public isMobile: Boolean;
  informconfForm: FormGroup;
  displayedColumnsMorosidad: string[] = ['actividadAfiliado', 'cantTotalMorosidades', 'menorFechaVencimientoPendie',
   'mayorFechaVencimientoPendie', 'sumaSaldoAcreedor', 'moneda'];
   displayedColumnsHistorialTrabajo: string[] = ['lugarTrabajo', 'cargo', 'telefono','fechaPrimeraReferencia'];
   displayedColumnsHistorialDireccion: string[] = ['ciuda', 'barrio', 'barrio', 'calle','fechaPrimeraReferencia'];
   displayedColumnsDetalleSolicitud: string[] = ['nombreRazonSocial', 'fecha', 'telefono','tipoOperacion'];
  constructor(
            public dialog: MatDialog,
            private formBuilder: FormBuilder,
            public dialogRef: MatDialogRef<InformconfComponent>,
            @Inject(MAT_DIALOG_DATA) public data: any) {
              this.initFormBuilder();
              this.informconfForm.patchValue(data);
              //Cargar historialDirecciones
              if(data.historialDirecciones != null && data.historialDirecciones.length > 0){
                const historialDirecciones = (<FormArray>this.informconfForm.get('historialDirecciones'));
                if(historialDirecciones){
                  while (historialDirecciones.length) {
                    historialDirecciones.removeAt(0);
                  }

                  data.historialDirecciones.forEach(staff => {
                    historialDirecciones.push(this.formBuilder.group(staff));
                  });
                }
              }
              //Cargar historialLugarTrabajo
              if(data.historialLugarTrabajo != null && data.historialLugarTrabajo.length > 0){
                const historialLugarTrabajo = (<FormArray>this.informconfForm.get('historialLugarTrabajo'));
                if(historialLugarTrabajo){
                  while (historialLugarTrabajo.length) {
                    historialLugarTrabajo.removeAt(0);
                  }

                  data.historialLugarTrabajo.forEach(staff => {
                    historialLugarTrabajo.push(this.formBuilder.group(staff));
                  });
                }
              }
              //Cargar morosidadesActividad
              if(data.morosidadesActividad != null && data.morosidadesActividad.length > 0){
                const morosidadesActividad = (<FormArray>this.informconfForm.get('morosidadesActividad'));
                if(morosidadesActividad){
                  while (morosidadesActividad.length) {
                    morosidadesActividad.removeAt(0);
                  }

                  data.morosidadesActividad.forEach(staff => {
                    morosidadesActividad.push(this.formBuilder.group(staff));
                  });
                }
              }
              //Cargar morosidadesActividadAdefi
              if(data.morosidadesActividadAdefi != null && data.morosidadesActividadAdefi.length > 0){
                const morosidadesActividadAdefi = (<FormArray>this.informconfForm.get('morosidadesActividadAdefi'));
                if(morosidadesActividadAdefi){
                  while (morosidadesActividadAdefi.length) {
                    morosidadesActividadAdefi.removeAt(0);
                  }

                  data.morosidadesActividadAdefi.forEach(staff => {
                    morosidadesActividadAdefi.push(this.formBuilder.group(staff));
                  });
                }
              }
              //Cargar solicitudesDetalle
              if(data.solicitudesDetalle != null && data.solicitudesDetalle.length > 0){
                const solicitudesDetalle = (<FormArray>this.informconfForm.get('solicitudesDetalle'));
                if(solicitudesDetalle){
                  while (solicitudesDetalle.length) {
                    solicitudesDetalle.removeAt(0);
                  }

                  data.solicitudesDetalle.forEach(staff => {
                    solicitudesDetalle.push(this.formBuilder.group(staff));
                  });
                }
              }
              console.log(this.informconfForm);
  }

  ngOnInit() {

    setTimeout(() => {

    });
  }


  protected initFormBuilder() {
    this.informconfForm = this.formBuilder.group({
      scoring: [null],
      datosPersonales: [null],
      historialDirecciones: this.formBuilder.array([]),
      historialLugarTrabajo: this.formBuilder.array([]),
      inhibicionesResumen: [null],
      morosidadesActividad: this.formBuilder.array([]),
      morosidadesActividadAdefi: this.formBuilder.array([]),
      quiebras: [null],
      solicitudesDetalle: this.formBuilder.array([]),
      convocatoriasResumen: [null],
      inhabilitacionesResumen: [null],
      rematesResumen: [null],
      datosConyuge: [null],
      demandasResumen: [null]
    });
  }
}
