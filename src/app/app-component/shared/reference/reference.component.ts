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
  formArrayName = 'referencias';
  @Input() minRow;
  @Input()
  set fkFilterModel(model: any) {
    if(model){

    }
  }
  @Input()
  set formControlNameArray(model: any) {
    if(model){
      this.formArrayName = model;
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
    this.referenceForm.addControl(this.formArrayName, this.formBuilder.array([]));
    this.addButton();
    this.onChangesPeopleId();
  }

  onChangesPeopleId(){
    (<FormGroup>this.referenceForm.get('persona')).controls['id'].valueChanges
    .subscribe(id => {
      this.apiService.getPageList('/referencias',false,null,null, 'desc', 'id',0,50, false,id)
      .subscribe(res => {
        if(res.status == 200){
          if(res.rows != null
              && res.rows.length > 0){
                const formArray = (<FormArray>this.referenceForm.get(this.formArrayName));
                while (formArray.length) {
                  formArray.removeAt(0);
                }
                res.rows.forEach(staff => formArray.push(this.formBuilder.group(staff)));
          }
        }
      });
    });
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
    (<FormArray>this.referenceForm.get(this.formArrayName)).push(this.addFormGroup());
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
          this.apiService.delete('/referencias/' + data.id)
          .subscribe(res => {
              if(res.status == 200){
                (<FormArray>this.referenceForm.get(this.formArrayName)).removeAt((<FormArray>this.referenceForm.get(this.formArrayName)).value.findIndex(dep => dep === data))
              }
          });
        }
      })
    }else{
      (<FormArray>this.referenceForm.get(this.formArrayName)).removeAt((<FormArray>this.referenceForm.get(this.formArrayName)).value.findIndex(dep => dep === data))
    }

    if(this.minRow > 0){
      if((<FormArray>this.referenceForm.get(this.formArrayName)).controls.length < this.minRow){
        this.addButton();
      }
    }
  }

  getValue(data: any, form : FormControl): void {
    form.setValue(data);
  }

}
