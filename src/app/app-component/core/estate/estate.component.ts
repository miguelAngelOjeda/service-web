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
  @Input() urlFilter;
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
    this.estateForm.addControl('bienesInmuebles', this.formBuilder.array([]));
    this.addButton();
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
      edificado: '',
      numeroFinca: '',
      numeroMatricula: '',
      cuentaCatastral: '',
      escriturado: '',
      valorActual: [null, [Validators.required]],
      hipotecado: '',
      lugarHipoteca: '',
      fechaHipoteca: '',
      saldo: '',
      cuotaMensual: '',
      tipoBien: 'INMUEBLE',
      activo: ['S']
    });
  }

  addButton(): void {
    (<FormArray>this.estateForm.get('bienesInmuebles')).push(this.addFormGroup());
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
          this.apiService.delete('/' + this.urlFilter +'/' + data.id)
          .subscribe(res => {
              if(res.status == 200){
                (<FormArray>this.estateForm.get('bienesInmuebles')).removeAt((<FormArray>this.estateForm.get('bienesInmuebles')).value.findIndex(dep => dep === data))
              }
          });
        }
      })
    }else{
      (<FormArray>this.estateForm.get('bienesInmuebles')).removeAt((<FormArray>this.estateForm.get('bienesInmuebles')).value.findIndex(dep => dep === data))
    }
  }

  getValue(data: any, form : FormControl): void {
    form.setValue(data);
  }

}
