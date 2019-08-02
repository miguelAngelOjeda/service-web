import { Component, OnInit, EventEmitter, ViewChild, AfterViewInit  } from '@angular/core';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { UserService, ApiService, FormsService} from '../../../../core/services';
import { SnackbarService } from '../../../../shared';
import { MatDialog, PageEvent, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';
import { EditModalPeopleRelationsComponent } from '../../../shared/people-relationship/edit-modal-people-relationship';
import * as $ from 'jquery';
import 'dropify';

@Component({
  selector: 'app-add-credits',
  templateUrl: './add-credits.component.html',
  styleUrls: ['./add-credits.component.scss']
})
export class AddCreditsComponent implements OnInit, AfterViewInit {
  myForm: FormGroup;
  validateForm = true;
  isSeparacionBienes = true;
  isTieneHipoteca = 0;

  constructor(
    private snackbarService: SnackbarService,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.initFormBuilder();
    this.valueChange();
  }

  ngAfterViewInit() {
    this.onInitDropify();
  }

  public onFileSelected(event: EventEmitter<File[]>) {
    const file: File = event[0];
    console.log(file);

  }

  onSubmit() {
    this.snackbarService.show('This is test');
    // this.apiService.post('/empresas', this.myForm.value)
    // .subscribe(res => {
    //   if(res.status == 200){
    //
    //   }
    // });
  }

  getValue(data: any, form : any): void {
    (<FormControl>this.myForm.get(form)).setValue(data);
  }

  editRelationship(id: number) {

      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = id;
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;

      const dialogRef = this.dialog.open(EditModalPeopleRelationsComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(result => {
         if(result){

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
          this.myForm.controls['importeCuota'].setValue(this.calcularCuota());
        }
    );

    // this.myForm.controls['montoSolicitado'].valueChanges.subscribe(
    //     (montoSolicitado) => {
    //       this.myForm.controls['montoSolicitadoOriginal'].setValue(montoSolicitado);
    //     }
    // );

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
          this.myForm.controls['importeCuota'].setValue(this.calcularCuota());
        }
    );

    this.myForm.controls['gastosAdministrativos'].valueChanges.subscribe(
        (gastosAdministrativos) => {
          this.myForm.controls['importeCuota'].setValue(this.calcularCuota());
        }
    );

    this.myForm.controls['periodoInteres'].valueChanges.subscribe(
        (selectedValue) => {
          this.myForm.controls['importeCuota'].setValue(this.calcularCuota());
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
          this.myForm.controls['importeCuota'].setValue(this.calcularCuota());
        }
    );
  }

  protected calcularCuota() : number {
    if(this.myForm.get('modalidad').value != null
        && this.myForm.get('montoSolicitado').value != null && this.myForm.get('plazo').value != null
        && this.myForm.get('periodoCapital').value != null && this.myForm.get('tasaInteres').value != null){

          if(this.myForm.get('tipoCalculoImporte').value != null && this.myForm.get('tipoCalculoImporte').value.codigo == 'TC-2'){

            let tasaInteres = (this.myForm.get('gastosAdministrativos').value == null ? 0 : this.myForm.get('gastosAdministrativos').value) + this.myForm.get('tasaInteres').value;


            let valor_1 = ((this.myForm.get('montoSolicitado').value * tasaInteres) / 36500) * this.myForm.get('vencimientoInteres').value;

            let valor_2 = Math.pow((  1 + ((tasaInteres / 36500)* this.myForm.get('vencimientoInteres').value)), this.myForm.get('plazo').value) - 1;

            let valor_3 = Math.pow((  1 + ((tasaInteres / 36500)* this.myForm.get('vencimientoInteres').value)), this.myForm.get('plazo').value);

            let valor_4 = valor_1/valor_2;

            //this.myForm.controls['importeCuota'].setValue(Math.round(valor_4 * valor_3));
            return Math.round(valor_4 * valor_3);

          } else if(this.myForm.get('tipoCalculoImporte').value != null && this.myForm.get('tipoCalculoImporte').value.codigo == 'TC-4'){

            //Interés simple (i) = Capital (c) x Tipo de Interés (r) x Tiempo (t)
            //• Si la duración es 3 años, t = 3
            //• Si la duración es 18 meses, t = 18 / 12 = 1,5
            //• Si la duración es 1 año, t = 1
            //• Si la duración es 6 meses, t = 6 / 12 = 0,5
            //• Si la duración es 1 día, t = 1 / 365

            let tasaInteres = (this.myForm.get('gastosAdministrativos').value == null ? 0 : this.myForm.get('gastosAdministrativos').value) + this.myForm.get('tasaInteres').value;

            let interes = tasaInteres / 100;

            let periodoInteres = 0;
            if(this.myForm.get('vencimientoInteres').value == 30){
              periodoInteres = interes / 12;
            }else if(this.myForm.get('vencimientoInteres').value == 0){
              if(this.myForm.get('periodoCapital').value == 60){
                periodoInteres = interes / 6;
              }else if(this.myForm.get('periodoCapital').value == 90){
                periodoInteres = interes / 4;
              }else if(this.myForm.get('periodoCapital').value == 180){
                periodoInteres = interes / 2;
              }else if(this.myForm.get('periodoCapital').value == 360){
                periodoInteres = interes / 1;
              }else if(this.myForm.get('periodoCapital').value == 15){
                periodoInteres = interes / 24
              }else if(this.myForm.get('periodoCapital').value == 1){
                periodoInteres = interes / 365
              }else if(this.myForm.get('periodoCapital').value == 30){
                periodoInteres = interes / 12
              }
            }

            let montoInteres = this.myForm.get('montoSolicitado').value * periodoInteres * this.myForm.get('plazo').value;

            let montoTotal = Math.round(this.myForm.get('montoSolicitado').value + montoInteres);

            let montoCuota = montoTotal / this.myForm.get('plazo').value;

            //this.myForm.controls['importeCuota'].setValue();
            return Math.round(montoCuota);

          }else if(this.myForm.get('tipoCalculoImporte').value != null && this.myForm.get('tipoCalculoImporte').value.codigo == 'TC-5'){

            let tasaInteres = (this.myForm.get('gastosAdministrativos').value == null ? 0 : this.myForm.get('gastosAdministrativos').value) + this.myForm.get('tasaInteres').value;

            let interes = tasaInteres / 100;

            let periodoInteres = 0;
            if(this.myForm.get('vencimientoInteres').value == 30){
              periodoInteres = (Math.pow((  1 + interes ), this.myForm.get('plazo').value / 12)) - 1;
            }else if(this.myForm.get('vencimientoInteres').value == 0){
              if(this.myForm.get('periodoCapital').value == 60){
                periodoInteres = (Math.pow((  1 + (interes / 6) ), ((this.myForm.get('plazo').value/12 ) * 6))) - 1;
              }else if(this.myForm.get('periodoCapital').value == 90){
                periodoInteres = (Math.pow((  1 + (interes / 4) ), ((this.myForm.get('plazo').value/12 ) * 4))) - 1;
              }else if(this.myForm.get('periodoCapital').value == 180){
                periodoInteres = (Math.pow((  1 + (interes / 2) ), ((this.myForm.get('plazo').value/12 ) * 2))) - 1;
              }else if(this.myForm.get('periodoCapital').value == 360){
                periodoInteres = (Math.pow((  1 + interes ), this.myForm.get('plazo').value / 12)) - 1;
              }else if(this.myForm.get('periodoCapital').value == 15){
                periodoInteres = interes / 24
              }else if(this.myForm.get('periodoCapital').value == 1){
                periodoInteres = interes / 365
                periodoInteres = (Math.pow((  1 + (interes / 2) ), ((this.myForm.get('plazo').value/12 ) * 2))) - 1;
              }else if(this.myForm.get('periodoCapital').value == 30){
                periodoInteres = (Math.pow((  1 + interes ), this.myForm.get('plazo').value / 12)) - 1;
              }
            }


            let montoInteres = this.myForm.get('montoSolicitado').value * periodoInteres;

            let montoTotal = Math.round(this.myForm.get('montoSolicitado').value + montoInteres);

            let montoCuota = montoTotal / this.myForm.get('plazo').value;

            //this.myForm.controls['importeCuota'].setValue(Math.round(montoCuota));
            return Math.round(montoCuota);
          }

        }
  }

  onInitDropify() {
    let drEvent =  (<any>$('.dropify') ).dropify({
        tpl: {
            wrap:            '<div class="dropify-wrapper"></div>',
            loader:          '<div class="dropify-loader"></div>',
            message:         '<div class="dropify-message"><span class="file-icon" /> <p>{{ default }}</p></div>',
            preview:         '<div class="dropify-preview"><span class="dropify-render"></span><div class="dropify-infos"><div class="dropify-infos-inner"><p class="dropify-infos-message">{{ replace }}</p></div></div></div>',
            filename:        '<p class="dropify-filename"><span class="file-icon"></span> <span class="dropify-filename-inner"></span></p>',
            clearButton:     '<button type="button" (click)="onFileDelete($event)" class="dropify-clear">{{ remove }}</button>',
            errorLine:       '<p class="dropify-error">{{ error }}</p>',
            errorsContainer: '<div class="dropify-errors-container"><ul></ul></div>'
        },
        messages: {
                default: 'Arrastre un archivo o haga clic aquí',
                replace: 'Arrastre un archivo o haga clic en reemplazar',
                remove: 'Eliminar',
                error: 'Lo sentimos, el archivo demasiado grande'
        },
        error: {
              fileSize: 'El tamaño del archivo es demasiado grande ({{ value }} max).',
              minWidth: 'El ancho de la imagen es demasiado pequeño ({{ value }}}px min).',
              maxWidth: 'El ancho de la imagen es demasiado grande ({{ value }}}px max).',
              minHeight: 'The image height is too small ({{ value }}}px min).',
              maxHeight: 'La altura de la imagen es demasiado grande ({{ value }}px max).',
              imageFormat: 'El formato de la imagen no está permitido ({{ value }} only).'
        }
    });

  }


  protected initFormBuilder() {
    this.myForm = this.formBuilder.group({
      id: null ,
      cliente: this.formBuilder.group({
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

  peopleCi(data: any, index:any) {
    console.log(data);
    this.apiService.get('/personas/documento/' + data)
    .subscribe(res => {
      if(res.status == 200){
        res.model.avatar = null;
        res.model.fechaNacimiento =  new Date(res.model.fechaNacimiento);
        res.model.nombre = (res.model.primerNombre == null ? '' : res.model.primerNombre) + ' '
                            + (res.model.segundoNombre == null ? '' : res.model.segundoNombre) + ' '
                            + (res.model.primerApellido == null ? '' : res.model.primerApellido) + ' ' + (res.model.segundoApellido == null ? '' : res.model.segundoApellido);

        (<FormGroup>this.myForm.get('cliente')).patchValue(res.model);
      }
    });
  }

}
