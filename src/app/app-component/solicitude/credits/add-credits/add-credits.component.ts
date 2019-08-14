import { Component, OnInit, EventEmitter, ViewChild, AfterViewInit  } from '@angular/core';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { UserService, ApiService, FormsService} from '../../../../core/services';
import { SnackbarService } from '../../../../shared';
import { HttpParams } from '@angular/common/http';
import { CreditsService } from '../add-credits';
import { MatDialog, PageEvent, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';
import { EditModalPeopleComponent } from '../../../shared/people-relationship/edit-modal-people';
import { AddModalPeopleComponent } from '../../../shared/people-relationship/add-modal-people';
import { ViewModalPeopleComponent } from '../../../shared/people-relationship/view-modal-people';
import * as $ from 'jquery';
import 'dropify';

@Component({
  selector: 'app-add-credits',
  templateUrl: './add-credits.component.html',
  styleUrls: ['./add-credits.component.scss']
})
export class AddCreditsComponent implements OnInit{
  params = new HttpParams({fromObject :
    {'included' : 'inmuebles,vehiculos,referencias,ingresos,egresos,ocupaciones,vinculos'}});
  myForm: FormGroup;
  validateForm = true;
  isSeparacionBienes = true;
  isTieneHipoteca = 0;

  constructor(
    private creditsService:CreditsService,
    private snackbarService: SnackbarService,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.initFormBuilder();
    this.valueChange();
  }

  public onFileSelected(event: EventEmitter<File[]>) {
    const file: File = event[0];
    console.log(file);

  }

  onSubmit() {
    console.log(this.myForm.value);
    this.snackbarService.show('This is test');
    this.apiService.post('/solicitud_creditos', this.myForm.value)
    .subscribe(res => {
      if(res.status == 200){

      }
    });
  }

  getValue(data: any, form : any): void {
    (<FormControl>this.myForm.get(form)).setValue(data);
  }

  editPeople(id: number) {

    this.apiService.get('/personas/' + id,this.params)
    .subscribe(res => {
      if(res.status == 200){
        console.log(res);
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = { model: res.model, title:'Editar' };
        dialogConfig.disableClose = true;
        //dialogConfig.maxHeight = "65vh";
        dialogConfig.autoFocus = true;

        const dialogRef = this.dialog.open(EditModalPeopleComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
           if(result){
             res.nombre = (res.primerNombre == null ? '' : res.primerNombre) + ' '
                                 + (res.segundoNombre == null ? '' : res.segundoNombre) + ' '
                                 + (res.primerApellido == null ? '' : res.primerApellido) + ' ' + (res.segundoApellido == null ? '' : res.segundoApellido);

             (<FormGroup>this.myForm.get('persona')).patchValue(res);
           }
        });
      }
    });

  }

  addPeople() {

      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = { model: null, title:'Agregar' };
      //dialogConfig.maxHeight = "65vh";

      const dialogRef = this.dialog.open(AddModalPeopleComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(res => {
         if(res){
           res.nombre = (res.primerNombre == null ? '' : res.primerNombre) + ' '
                               + (res.segundoNombre == null ? '' : res.segundoNombre) + ' '
                               + (res.primerApellido == null ? '' : res.primerApellido) + ' ' + (res.segundoApellido == null ? '' : res.segundoApellido);

           (<FormGroup>this.myForm.get('persona')).patchValue(res);
         }
      });

  }

  viewPeople(id: number) {
    this.apiService.get('/personas/' + id,this.params)
    .subscribe(res => {
      if(res.status == 200){
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = { model: res.model, title:'Visualizar' };
        //dialogConfig.disableClose = true;
        //dialogConfig.maxHeight = "65vh";
        dialogConfig.autoFocus = true;

        const dialogRef = this.dialog.open(ViewModalPeopleComponent, dialogConfig);
      }
    });
  }

  protected valueChange(){
    this.myForm.controls['modalidad'].valueChanges.subscribe(
        (selectedValue) => {
          this.myForm.controls['tipoCalculoImporte'].setValue(selectedValue.tipoCalculos);
          this.myForm.controls['tasaInteres'].setValue(selectedValue.interes);
          this.myForm.controls['importeCuota'].setValue(this.calcularCuota());
        }
    );

    this.myForm.controls['plazo'].valueChanges.subscribe(
        (selectedValue) => {
          this.calcularCuota();
        }
    );

    this.myForm.controls['montoSolicitado'].valueChanges.subscribe(
        (montoSolicitado) => {
          this.calcularCuota();
        }
    );

    this.myForm.controls['impuestos'].valueChanges.subscribe(
        (impuestos) => {

          if(this.myForm.get('tipoDescuento').value === 'I-D'){

            let descuentos = impuestos + this.myForm.get('comision').value + this.myForm.get('gastosVarios').value;

            let montoEntregar = this.myForm.get('montoSolicitado').value - descuentos;

            this.myForm.controls['importeEntregar'].setValue(montoEntregar);

          }else{

            let descuentos = impuestos + this.myForm.get('comision').value + this.myForm.get('gastosVarios').value;

            let montoEntregar = this.myForm.get('montoSolicitado').value + descuentos;

            this.myForm.controls['importeEntregar'].setValue(montoEntregar);

            this.myForm.controls['montoSolicitado'].setValue(montoEntregar);

          }

        }
    );



    this.myForm.controls['tipoGarantia'].valueChanges.subscribe(
        (tipoGarantia) => {
          if(tipoGarantia.id == 3){
            this.snackbarService.show('Cargar datos de la Hipoteca en Inmuebles!!','warning');
            this.isTieneHipoteca = 1;
            this.myForm.removeControl('codeudor');
          }else if(tipoGarantia.id == 2){
            this.isTieneHipoteca = 0;

            this.myForm.addControl('codeudor', this.formBuilder.group({
              id: null ,
              documento: [null, [Validators.required]],
              nombre: [null, [Validators.required]] }));

          }else{
            this.myForm.removeControl('codeudor');
            this.isTieneHipoteca = 0;
          }
        }
    );

    this.myForm.controls['tasaInteres'].valueChanges.subscribe(
        (selectedValue) => {
          this.calcularCuota();
        }
    );

    this.myForm.controls['gastosAdministrativos'].valueChanges.subscribe(
        (gastosAdministrativos) => {
          this.calcularCuota();
        }
    );

    this.myForm.controls['periodoInteres'].valueChanges.subscribe(
        (selectedValue) => {
          this.calcularCuota();
        }
    );

    this.myForm.controls['periodoCapital'].valueChanges.subscribe(
        (selectedValue) => {
          if(Number(this.myForm.get('vencimientoInteres').value) == 0){
            this.myForm.controls['periodoInteres'].setValue(selectedValue);
          }else if(Number(this.myForm.get('vencimientoInteres').value) == -1){

          }else{
            this.myForm.controls['periodoInteres'].setValue(this.myForm.get('vencimientoInteres').value);
          }
        }
    );

    this.myForm.controls['vencimientoInteres'].valueChanges.subscribe(
        (selectedValue) => {
          if(Number(selectedValue) == 0){
            this.myForm.controls['periodoInteres'].setValue(this.myForm.get('periodoCapital').value);
          }else if(Number(selectedValue) == -1){

          }else{
            this.myForm.controls['periodoInteres'].setValue(selectedValue);
          }
          this.calcularCuota();
        }
    );
  }

  protected calcularCuota() {
    let importeCuota = this.creditsService.calcularCuota(this.myForm.get('modalidad').value, this.myForm.get('plazo').value,
          this.myForm.get('periodoCapital').value, this.myForm.get('vencimientoInteres').value,
          this.myForm.get('tasaInteres').value, this.myForm.get('montoSolicitado').value,
          this.myForm.get('tipoCalculoImporte').value.codigo, this.myForm.get('gastosAdministrativos').value);
    this.myForm.controls['importeCuota'].setValue(importeCuota);
  }


  protected initFormBuilder() {
    this.myForm = this.formBuilder.group({
      id: null ,
      persona: this.formBuilder.group({
        id: null ,
        documento: [null, [Validators.required]],
        ruc: [null],
        nombre: [null, [Validators.required]] }) ,
      modalidad: [null, [Validators.required]],
      tipoCalculoImporte: [null, [Validators.required]],
      tipoDestino: [null, [Validators.required]],
      tipoGarantia: [null, [Validators.required]],
      tipoDescuento: ['I-D', [Validators.required]],
      importeEntregar: [null, [Validators.required]],
      tipoPago: [null, [Validators.required]],
      tipoDesembolso: [null, [Validators.required]],
      plazo: [null, [Validators.required]],
      vencimientoInteres: ['30', [Validators.required]],
      periodoInteres: [30, [Validators.required]],
      tasaInteres: [null, [Validators.required]],
      gastosAdministrativos: [null, [Validators.required]],
      impuestos: [0],
      beneficiarioCheque: [null],
      detalleDestino: [null],
      comision: [0],
      gastosVarios: [0],
      seguros: [0],
      montoSolicitado: [0, [Validators.required]],
      montoSolicitadoOriginal: [null, [Validators.required]],
      importeCuota: [null, [Validators.required]],
      periodoGracia: [30, [Validators.required]],
      periodoCapital: ['30', [Validators.required]],
      activo: 'S'
    });
  }

  peopleCi(data: any) {
    this.apiService.get('/personas/documento/' + data)
    .subscribe(res => {
      if(res.status == 200){
        res.model.avatar = null;
        res.model.fechaNacimiento =  new Date(res.model.fechaNacimiento);
        res.model.nombre = (res.model.primerNombre == null ? '' : res.model.primerNombre) + ' '
                            + (res.model.segundoNombre == null ? '' : res.model.segundoNombre) + ' '
                            + (res.model.primerApellido == null ? '' : res.model.primerApellido) + ' ' + (res.model.segundoApellido == null ? '' : res.model.segundoApellido);

        (<FormGroup>this.myForm.get('persona')).patchValue(res.model);
      }
    });
  }

}
