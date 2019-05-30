import { Component, OnInit, EventEmitter, Output, Input, ElementRef } from '@angular/core';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators, ControlContainer, FormGroupDirective} from '@angular/forms';
import { MatDialog, PageEvent, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';
import { DeleteDialogComponent } from '../../../shared';
import { Estate, Message } from '../../../core/models';
import { UserService, ApiService, FormsService} from '../../../core/services';

@Component({
  selector: 'app-ingress',
  templateUrl: './ingress.component.html',
  styleUrls: ['./ingress.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class IngressComponent implements OnInit {
  ingressForm: FormGroup;
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
    this.ingressForm = this.parentF.form;
    this.ingressForm.addControl('ingresos', this.formBuilder.array([]));
    this.addButton();
  }

  //Egresos
  addFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [''],
      monto: [null, [Validators.required]],
      tipoIngresosEgresos: [null, [Validators.required]],
      activo: ['S']
    });
  }

  addButton(): void {
    (<FormArray>this.ingressForm.get('ingresos')).push(this.addFormGroup());
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
                (<FormArray>this.ingressForm.get('ingresos')).removeAt((<FormArray>this.ingressForm.get('ingresos')).value.findIndex(dep => dep === data))
              }
          });
        }
      })
    }else{
      (<FormArray>this.ingressForm.get('ingresos')).removeAt((<FormArray>this.ingressForm.get('ingresos')).value.findIndex(dep => dep === data))
    }
  }

}
