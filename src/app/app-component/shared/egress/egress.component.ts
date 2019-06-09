import { Component, OnInit, EventEmitter, Output, Input, ElementRef } from '@angular/core';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators, ControlContainer, FormGroupDirective} from '@angular/forms';
import { MatDialog, PageEvent, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';
import { DeleteDialogComponent } from '../../../shared';
import { Estate, Message } from '../../../core/models';
import { UserService, ApiService, FormsService} from '../../../core/services';

@Component({
  selector: 'app-egress',
  templateUrl: './egress.component.html',
  styleUrls: ['./egress.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class EgressComponent implements OnInit {
  egressForm: FormGroup;
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
    this.egressForm = this.parentF.form;
    this.egressForm.addControl('egresos', this.formBuilder.array([]));
    this.addButton();
  }

  //Egresos
  addFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [''],
      monto: [0, [Validators.required, Validators.minLength(5)]],
      tipoIngresosEgresos: [null, [Validators.required]],
      activo: ['S']
    });
  }

  addButton(): void {
    (<FormArray>this.egressForm.get('egresos')).push(this.addFormGroup());
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
          this.apiService.delete('/egresos/' + data.id)
          .subscribe(res => {
              if(res.status == 200){
                (<FormArray>this.egressForm.get('egresos')).removeAt((<FormArray>this.egressForm.get('egresos')).value.findIndex(dep => dep === data))
              }
          });
        }
      })
    }else{
      (<FormArray>this.egressForm.get('egresos')).removeAt((<FormArray>this.egressForm.get('egresos')).value.findIndex(dep => dep === data))
    }

    if(this.minRow > 0){
      if((<FormArray>this.egressForm.get('egresos')).controls.length < this.minRow){
        this.addButton();
      }
    }
  }

  getValue(data: any, form : FormControl): void {
    form.setValue(data);
  }

}
