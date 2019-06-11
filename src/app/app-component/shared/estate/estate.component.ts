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
  formArrayName = 'bienesInmuebles';
  @Input() minRow;
  @Input()
  set fkFilterModel(model: any) {
    if(model){

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
    this.estateForm.addControl(this.formArrayName, this.formBuilder.array([]));
    this.addButton();
    this.onChangesPeopleId();
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
      tipoBien: 'INMUEBLE',
      activo: ['S']
    });
  }

  addButton(): void {
    (<FormArray>this.estateForm.get(this.formArrayName)).push(this.addFormGroup());
  }

  onChangesPeopleId(){
    (<FormGroup>this.estateForm.get('persona')).controls['id'].valueChanges
    .subscribe(id => {
      this.apiService.getPageList('/inmuebles',false,null,null, 'desc', 'id',0,50, false,id)
      .subscribe(res => {
        if(res.status == 200){
          if(res.rows != null
              && res.rows.length > 0){
                const formArray = (<FormArray>this.estateForm.get(this.formArrayName));
                while (formArray.length) {
                  formArray.removeAt(0);
                }
                res.rows.forEach(staff => formArray.push(this.formBuilder.group(staff)));
          }
        }
      });
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
                (<FormArray>this.estateForm.get(this.formArrayName)).removeAt((<FormArray>this.estateForm.get(this.formArrayName)).value.findIndex(dep => dep === data))
              }
          });
        }
      })
    }else{
      (<FormArray>this.estateForm.get(this.formArrayName)).removeAt((<FormArray>this.estateForm.get(this.formArrayName)).value.findIndex(dep => dep === data))
    }

    if(this.minRow > 0){
      if((<FormArray>this.estateForm.get(this.formArrayName)).controls.length < this.minRow){
        this.addButton();
      }
    }
  }

  getValue(data: any, form : FormControl): void {
    form.setValue(data);
  }

}
