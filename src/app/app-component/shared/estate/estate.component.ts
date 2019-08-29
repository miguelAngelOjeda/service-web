import { Component, OnInit, EventEmitter, Output, Input, ElementRef } from '@angular/core';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators, ControlContainer, FormGroupDirective} from '@angular/forms';
import { MatDialog, PageEvent, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';
import { DeleteDialogComponent } from '../../../shared';
import { Estate, Message } from '../../../core/models';
import { UserService, ApiService, FormsService} from '../../../core/services';

@Component({
  selector: 'app-estate',
  templateUrl: './estate.component.html',
  styleUrls: ['./estate.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class EstateComponent implements OnInit {
  estateForm: FormGroup;
  peopleForm: FormGroup;

  formArrayName = 'bienesInmuebles';
  @Input() minRow;
  @Input()
  set fkFilterModel(id: any) {
    if(id){
      this.onChangesFkModel(id);
    }
  }

  constructor(
    private parentF: FormGroupDirective,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.estateForm = this.parentF.form;
    this.peopleForm = (<FormGroup>this.estateForm.get('persona'));
    this.peopleForm.addControl(this.formArrayName, this.formBuilder.array([]));
    this.addButton();
    //this.onChangesPeople();
  }

  //bienes Inmueble
  addFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [''],
      direccion: ['', Validators.required],
      pais: [null, [Validators.required]],
      departamento: [null, [Validators.required]],
      ciudad: [null, [Validators.required]],
      barrio: '',
      edificado: false,
      numeroFinca: '',
      numeroMatricula: '',
      cuentaCatastral: '',
      escriturado: false,
      valorActual: [null, [Validators.required]],
      hipotecado: false,
      lugarHipoteca: '',
      fechaHipoteca: '',
      saldo: '',
      cuotaMensual: '',
      latitud: null,
      longitud: null,
      tipoBien: 'INMUEBLE',
      activo: ['S']
    });
  }

  addButton(): void {
    (<FormArray>this.peopleForm.get(this.formArrayName)).push(this.addFormGroup());
  }

  onChangesFkModel(id:any){
      this.apiService.getPageList('/inmuebles',false,null,null, 'desc', 'id',0,50, false,id)
      .subscribe(res => {
        if(res.status == 200){
          if(res.rows != null
              && res.rows.length > 0){
                const formArray = (<FormArray>this.peopleForm.get(this.formArrayName));
                while (formArray.length) {
                  formArray.removeAt(0);
                }
                res.rows.forEach(staff => formArray.push(this.formBuilder.group(staff)));
          }
        }
      });
  }

  delete(data: any){
    if(data.id){

      const message = new Message;
      message.titulo = "Eliminar Registro"
      message.texto = "Esta seguro que desea eliminar el registro ";

      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = message;

      let dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.apiService.delete('/inmuebles/' + data.id)
          .subscribe(res => {
              if(res.status == 200){
                (<FormArray>this.peopleForm.get(this.formArrayName)).removeAt((<FormArray>this.peopleForm.get(this.formArrayName)).value.findIndex(dep => dep === data))
              }
          });
        }
      })
    }else{
      (<FormArray>this.peopleForm.get(this.formArrayName)).removeAt((<FormArray>this.peopleForm.get(this.formArrayName)).value.findIndex(dep => dep === data))
    }

    if(this.minRow > 0){
      if((<FormArray>this.peopleForm.get(this.formArrayName)).controls.length < this.minRow){
        this.addButton();
      }
    }
  }

  onChangesPeople(){
    this.peopleForm.controls['id'].valueChanges
    .subscribe(id => {
        this.onChangesFkModel(id);
    });
  }

  getValue(data: any, form : FormControl): void {
    form.setValue(data);
  }

  // Get Current Location Coordinates
  getAddress(location: any): void {
    (<FormGroup>this.peopleForm.get(this.formArrayName)).controls['latitud'].setValue(location.lat);
    (<FormGroup>this.peopleForm.get(this.formArrayName)).controls['longitud'].setValue(location.lng);
    (<FormGroup>this.peopleForm.get(this.formArrayName)).controls['direccion'].setValue(location.address);
  }

}
