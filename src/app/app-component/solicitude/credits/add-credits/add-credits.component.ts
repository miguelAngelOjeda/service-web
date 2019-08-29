import { Component, OnInit, EventEmitter, ViewChild, AfterViewInit  } from '@angular/core';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { UserService, ApiService, FormsService} from '../../../../core/services';
import { SnackbarService } from '../../../../shared';
import { HttpParams } from '@angular/common/http';
import { CreditsService } from '../add-credits';
import { PeopleService } from '../../../shared/people/people.service';
import { MatDialog, PageEvent, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';
import { EditModalPeopleComponent, AddModalPeopleComponent, ViewModalPeopleComponent } from '../../../shared/people';


@Component({
  selector: 'app-add-credits',
  templateUrl: './add-credits.component.html',
  styleUrls: ['./add-credits.component.scss']
})
export class AddCreditsComponent implements OnInit{
  public params = new HttpParams({fromObject :
    {'included' : 'inmuebles,vehiculos,referencias,ingresos,egresos,ocupaciones,vinculos'}});
  myForm: FormGroup;
  validateForm = true;
  isSeparacionBienes = true;
  isTieneHipoteca = 0;

  constructor(
    private creditsService:CreditsService,
    private snackbarService: SnackbarService,
    private formBuilder: FormBuilder,
    private peopleService: PeopleService,
    private apiService: ApiService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.initFormBuilder();
    this.valueChange();
  }

  protected initFormBuilder() {
    this.myForm = this.formBuilder.group({
      id: null ,
      cliente: this.formBuilder.group({
        id: null ,
        persona: this.formBuilder.group({
          id: [null],
          profesion: [null],
          documento: [null],
          nombre: null ,
          email: [null],
          sexo: [null],
          telefonoParticular: [null],
          telefonoSecundario: null,
          primerNombre: [null],
          segundoNombre: null,
          primerApellido: [null],
          segundoApellido: null
        })}),
      modalidad: [null, [Validators.required]],
      tipoCalculoImporte: [null, [Validators.required]],
      tipoDestino: [null, [Validators.required]],
      tipoGarantia: [null, [Validators.required]],
      tipoDescuento: [null, [Validators.required]],
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

  onSubmit() {
    console.log(this.myForm.value);
    this.snackbarService.show('This is test');
    this.apiService.post('/solicitud_creditos', this.myForm.value)
    .subscribe(res => {
      if(res.status == 200){

      }
    });
  }

  clientCi(data: any) {
    (<FormGroup>this.myForm.get('cliente')).reset();
    this.apiService.get('/clientes/documento/' + data)
    .subscribe(res => {
      if(res.status == 200){
        console.log(res);

        res.model.persona.fechaNacimiento =  new Date(res.model.persona.fechaNacimiento);
        res.model.persona.nombre = (res.model.persona.primerNombre == null ? '' : res.model.persona.primerNombre) + ' '
                            + (res.model.persona.segundoNombre == null ? '' : res.model.persona.segundoNombre) + ' '
                            + (res.model.persona.primerApellido == null ? '' : res.model.persona.primerApellido) + ' ' + (res.model.persona.segundoApellido == null ? '' : res.model.persona.segundoApellido);

        (<FormGroup>this.myForm.get('cliente')).patchValue(res.model);
      }
    });
  }

  editPeople(id: number) {

      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = { model: null, title:'Editar Deudor' , addSpouse:true};

      this.peopleService.editModalPeople(id, <FormGroup>this.myForm.get('cliente').get('persona'), dialogConfig);
  }

  addPeople(id: number) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { model: null, title:'Agregar Deudor' , addSpouse:true};

    this.peopleService.addModalPeople(id, <FormGroup>this.myForm.get('cliente').get('persona'), dialogConfig);
  }

  viewPeople(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { model: null, title:'Visualizar Deudor' };
    //dialogConfig.disableClose = true;
    //dialogConfig.maxHeight = "65vh";
    dialogConfig.autoFocus = true;
    this.peopleService.viewModalPeople(id, dialogConfig);
  }

  editCodeudor(id: number) {

      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = { model: null, title:'Editar Codeudor' , addSpouse:true};

      this.peopleService.editModalPeople(id, <FormGroup>this.myForm.get('codeudor'), dialogConfig);
  }

  addCodeudor(id: number) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { model: null, title:'Agregar Codeudor' , addSpouse:true};

    this.peopleService.addModalPeople(id, <FormGroup>this.myForm.get('codeudor'), dialogConfig);
  }

  viewCodeudor(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { model: null, title:'Visualizar Codeudor' };
    //dialogConfig.disableClose = true;
    //dialogConfig.maxHeight = "65vh";
    dialogConfig.autoFocus = true;
    this.peopleService.viewModalPeople(id, dialogConfig);
  }

  getValue(data: any, form : any): void {
    (<FormControl>this.myForm.get(form)).setValue(data);
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
          if(this.myForm.get('tipoDescuento').value !== null){
            if(this.myForm.get('tipoDescuento').value == 'I-D'){
              let valorDescuento = this.myForm.get('impuestos').value + this.myForm.get('comision').value + this.myForm.get('gastosVarios').value;
              let montoEntregar = this.myForm.get('montoSolicitadoOriginal').value - valorDescuento;
              this.myForm.controls['importeEntregar'].setValue(montoEntregar);
              this.myForm.controls['montoSolicitado'].setValue(this.myForm.get('montoSolicitadoOriginal').value);
            }else{
              let valorDescuento = this.myForm.get('impuestos').value + this.myForm.get('comision').value + this.myForm.get('gastosVarios').value;
              let montoEntregar = this.myForm.get('montoSolicitadoOriginal').value + valorDescuento;
              this.myForm.controls['importeEntregar'].setValue(montoEntregar);
              this.myForm.controls['montoSolicitado'].setValue(this.myForm.get('importeEntregar').value);
            }
          }
        }
    );

    this.myForm.controls['comision'].valueChanges.subscribe(
        (impuestos) => {
          if(this.myForm.get('tipoDescuento').value !== null){
            if(this.myForm.get('tipoDescuento').value == 'I-D'){
              let valorDescuento = this.myForm.get('impuestos').value + this.myForm.get('comision').value + this.myForm.get('gastosVarios').value;
              let montoEntregar = this.myForm.get('montoSolicitadoOriginal').value - valorDescuento;
              this.myForm.controls['importeEntregar'].setValue(montoEntregar);
              this.myForm.controls['montoSolicitado'].setValue(this.myForm.get('montoSolicitadoOriginal').value);
            }else{
              let valorDescuento = this.myForm.get('impuestos').value + this.myForm.get('comision').value + this.myForm.get('gastosVarios').value;
              let montoEntregar = this.myForm.get('montoSolicitadoOriginal').value + valorDescuento;
              this.myForm.controls['importeEntregar'].setValue(montoEntregar);
              this.myForm.controls['montoSolicitado'].setValue(this.myForm.get('importeEntregar').value);
            }
          }
        }
    );

    this.myForm.controls['gastosVarios'].valueChanges.subscribe(
        (impuestos) => {
          if(this.myForm.get('tipoDescuento').value !== null){
            if(this.myForm.get('tipoDescuento').value == 'I-D'){
              let valorDescuento = this.myForm.get('impuestos').value + this.myForm.get('comision').value + this.myForm.get('gastosVarios').value;
              let montoEntregar = this.myForm.get('montoSolicitadoOriginal').value - valorDescuento;
              this.myForm.controls['importeEntregar'].setValue(montoEntregar);
              this.myForm.controls['montoSolicitado'].setValue(this.myForm.get('montoSolicitadoOriginal').value);
            }else{
              let valorDescuento = this.myForm.get('impuestos').value + this.myForm.get('comision').value + this.myForm.get('gastosVarios').value;
              let montoEntregar = this.myForm.get('montoSolicitadoOriginal').value + valorDescuento;
              this.myForm.controls['importeEntregar'].setValue(montoEntregar);
              this.myForm.controls['montoSolicitado'].setValue(this.myForm.get('importeEntregar').value);
            }
          }
        }
    );

    this.myForm.controls['seguros'].valueChanges.subscribe(
        (impuestos) => {
          if(this.myForm.get('tipoDescuento').value !== null){
            if(this.myForm.get('tipoDescuento').value == 'I-D'){
              let valorDescuento = this.myForm.get('impuestos').value + this.myForm.get('comision').value + this.myForm.get('gastosVarios').value;
              let montoEntregar = this.myForm.get('montoSolicitadoOriginal').value - valorDescuento;
              this.myForm.controls['importeEntregar'].setValue(montoEntregar);
              this.myForm.controls['montoSolicitado'].setValue(this.myForm.get('montoSolicitadoOriginal').value);
            }else{
              let valorDescuento = this.myForm.get('impuestos').value + this.myForm.get('comision').value + this.myForm.get('gastosVarios').value;
              let montoEntregar = this.myForm.get('montoSolicitadoOriginal').value + valorDescuento;
              this.myForm.controls['importeEntregar'].setValue(montoEntregar);
              this.myForm.controls['montoSolicitado'].setValue(this.myForm.get('importeEntregar').value);
            }
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
              id: [null],
              profesion: [null],
              documento: [null],
              nombre: null ,
              email: [null],
              sexo: [null],
              telefonoParticular: [null],
              telefonoSecundario: null,
              primerNombre: [null],
              segundoNombre: null,
              primerApellido: [null],
              segundoApellido: null }));
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

    this.myForm.controls['tipoDescuento'].valueChanges.subscribe(
        (selectedValue) => {
          //Guardar el monto original
          if(this.myForm.get('montoSolicitadoOriginal').value == null){
            this.myForm.controls['montoSolicitadoOriginal'].setValue(this.myForm.get('montoSolicitado').value);
          }

          if(selectedValue == 'I-D'){
            let valorDescuento = this.myForm.get('impuestos').value + this.myForm.get('comision').value + this.myForm.get('gastosVarios').value;
            let montoEntregar = this.myForm.get('montoSolicitadoOriginal').value - valorDescuento;
            this.myForm.controls['importeEntregar'].setValue(montoEntregar);
            this.myForm.controls['montoSolicitado'].setValue(this.myForm.get('montoSolicitadoOriginal').value);
          }else{
            let valorDescuento = this.myForm.get('impuestos').value + this.myForm.get('comision').value + this.myForm.get('gastosVarios').value;
            let montoEntregar = (this.myForm.get('montoSolicitadoOriginal').value + valorDescuento) - valorDescuento;
            this.myForm.controls['importeEntregar'].setValue(montoEntregar);
            this.myForm.controls['montoSolicitado'].setValue(this.myForm.get('montoSolicitadoOriginal').value + valorDescuento);
          }
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


}
