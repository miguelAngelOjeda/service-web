import { Component, OnInit, EventEmitter, Output, Input, ElementRef } from '@angular/core';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators, ControlContainer, FormGroupDirective} from '@angular/forms';
import { MatDialog, PageEvent, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';
import { DeleteDialogComponent } from '../../../shared';
import { Reference, Message } from '../../../core/models';
import { UserService, ApiService, FormsService} from '../../../core/services';

@Component({
  selector: 'app-reference',
  templateUrl: './reference.component.html',
  styleUrls: ['./reference.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class ReferenceComponent implements OnInit {
  referenceForm: FormGroup;
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
    this.referenceForm = this.parentF.form;
    this.referenceForm.addControl('referencias', this.formBuilder.array([]));
    this.addButton();
  }

  //Referencias
  addFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [''],
      nombreContacto: ['', Validators.required],
      telefonoCelular : ['', Validators.required],
      telefono: [''],
      tipoReferencia : ['', Validators.required],
      activo: ['S']
    });
  }

  addButton(): void {
    (<FormArray>this.referenceForm.get('referencias')).push(this.addFormGroup());
  }

  delete(data: Reference){
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
                (<FormArray>this.referenceForm.get('referencias')).removeAt((<FormArray>this.referenceForm.get('referencias')).value.findIndex(dep => dep === data))
              }
          });
        }
      })
    }else{
      (<FormArray>this.referenceForm.get('referencias')).removeAt((<FormArray>this.referenceForm.get('referencias')).value.findIndex(dep => dep === data))
    }
  }

  getValue(data: any, form : FormControl): void {
    form.setValue(data);
  }

}
