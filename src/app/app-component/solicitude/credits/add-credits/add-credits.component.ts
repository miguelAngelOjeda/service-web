import { Component, OnInit, EventEmitter, ViewChild  } from '@angular/core';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { UserService, ApiService, FormsService} from '../../../../core/services';
import { SnackbarService, GalleryDialogComponent } from '../../../../shared';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload';

@Component({
  selector: 'app-add-credits',
  templateUrl: './add-credits.component.html',
  styleUrls: ['./add-credits.component.scss']
})
export class AddCreditsComponent implements OnInit {
  myForm: FormGroup;
  validateForm = true;
  isSeparacionBienes = true;
  isTieneHipoteca = 0;

  public uploader: FileUploader = new FileUploader({
    url: 'URL',
    disableMultipart : false,
    autoUpload: false,
    method: 'post',
    itemAlias: 'attachment',
    allowedFileType: ['image', 'pdf']
    });

  constructor(
    public dialog: MatDialog,
    private snackbarService: SnackbarService,
    private formBuilder: FormBuilder,
    private apiService: ApiService) { }

  ngOnInit() {
    this.initFormBuilder();
    this.valueChange();
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

  viewImage(file : any): void {
    let image;
    var reader = new FileReader();
    reader.onloadend = (readerEvent) => {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = reader.result.toString().split(',')[1];
      dialogConfig.minWidth = '50%';
      let dialogRef = this.dialog.open(GalleryDialogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        if(result){

        }
      })
    }
    reader.readAsDataURL(file);
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

    this.myForm.controls['tipoGarantia'].valueChanges.subscribe(
        (tipoGarantia) => {
          if(tipoGarantia.id == 3){
            this.snackbarService.show('Cargar datos de la Hipoteca en Inmuebles!!','warning');
            this.isTieneHipoteca = 1;
          }else{
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

            //let tasaInteres = ((this.myForm.get('tasaInteres').value / 100) / 365) * 30;



            let montoInteres = this.myForm.get('montoSolicitado').value * Math.pow( (  1 + tasaInteres), this.myForm.get('plazo').value);

            let montoTotal = Math.round(this.myForm.get('montoSolicitado').value + montoInteres);

            let montoCuota = montoTotal / this.myForm.get('plazo').value;

            //this.myForm.controls['importeCuota'].setValue(Math.round(montoCuota));
            return Math.round(montoCuota);
          }

        }
  }


  protected initFormBuilder() {
    this.myForm = this.formBuilder.group({
      id: null ,
      cliente: null ,
      modalidad: [null, [Validators.required]],
      tipoCalculoImporte: [null, [Validators.required]],
      tipoDestino: [null, [Validators.required]],
      tipoGarantia: [null, [Validators.required]],
      tipoPago: [null, [Validators.required]],
      tipoDesembolso: [null, [Validators.required]],
      plazo: [null, [Validators.required]],
      vencimientoInteres: ['30', [Validators.required]],
      periodoInteres: [30, [Validators.required]],
      tasaInteres: [null, [Validators.required]],
      gastosAdministrativos: [null, [Validators.required]],
      impuestos: [null],
      beneficiarioCheque: [null],
      detalleDestino: [null],
      comision: [null],
      gastosVarios: [null],
      seguros: [null],
      montoSolicitado: [null, [Validators.required]],
      montoEntregar: [null, [Validators.required]],
      importeCuota: [null, [Validators.required]],
      periodoGracia: [30, [Validators.required]],
      periodoCapital: ['30', [Validators.required]],
      activo: 'S'
    });
  }

}
