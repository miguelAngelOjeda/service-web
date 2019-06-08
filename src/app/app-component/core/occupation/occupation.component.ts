import { Component, OnInit, EventEmitter, Output, Input, ElementRef } from '@angular/core';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators, ControlContainer, FormGroupDirective} from '@angular/forms';
import { MatDialog, PageEvent, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';
import { DeleteDialogComponent } from '../../../shared';
import { Estate, Message } from '../../../core/models';
import { UserService, ApiService, FormsService} from '../../../core/services';

@Component({
  selector: 'app-occupation',
  templateUrl: './occupation.component.html',
  styleUrls: ['./occupation.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class OccupationComponent implements OnInit {
  occupationForm: FormGroup;
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
    this.occupationForm = this.parentF.form;
    this.occupationForm.addControl('ocupaciones', this.formBuilder.array([]));
    this.addButton();
    this.onChanges();
  }

  //bienes Inmueble
  addFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      cargo: [null, Validators.required],
      empresa: [null, Validators.required],
      tipoTrabajo: [null, [Validators.required]],
      direccion: [null, [Validators.required]],
      telefonoPrincipal: [null, [Validators.required]],
      telefonoSecundario: null,
      fechaIngreso: [null, [Validators.required]],
      fechaSalida: null,
      interno: null,
      ingresosMensuales: 0,
      tipoOcupacion: [null, [Validators.required]],
      activo: ['S']
    });
  }

  onChanges(){
    (<FormGroup>this.occupationForm.get('persona')).controls['tipoPersona'].valueChanges
    .subscribe(tipoPersona => {
        if(tipoPersona != 'FISICA'){
          this.occupationForm.removeControl('ocupaciones');
          this.occupationForm.updateValueAndValidity();
        }else{
          this.occupationForm.addControl('ocupaciones', this.formBuilder.array([]));
          this.addButton();
        }
    });
  }

  addButton(): void {
    (<FormArray>this.occupationForm.get('ocupaciones')).push(this.addFormGroup());
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
          this.apiService.delete('/bienes/' + data.id)
          .subscribe(res => {
              if(res.status == 200){
                (<FormArray>this.occupationForm.get('ocupaciones')).removeAt((<FormArray>this.occupationForm.get('ocupaciones')).value.findIndex(dep => dep === data))
              }
          });
        }
      })
    }else{
      (<FormArray>this.occupationForm.get('ocupaciones')).removeAt((<FormArray>this.occupationForm.get('ocupaciones')).value.findIndex(dep => dep === data))
    }

    if(this.minRow > 0){
      if((<FormArray>this.occupationForm.get('ocupaciones')).controls.length < this.minRow){
        this.addButton();
      }
    }
  }

  getValue(data: any, form : FormControl): void {
    form.setValue(data);
  }

}
