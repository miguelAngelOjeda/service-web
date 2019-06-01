import { Component, OnInit, EventEmitter, Output, Input, ElementRef } from '@angular/core';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators, ControlContainer, FormGroupDirective} from '@angular/forms';
import { MatDialog, PageEvent, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';
import { DeleteDialogComponent } from '../../../shared';
import { Estate, Message } from '../../../core/models';
import { UserService, ApiService, FormsService} from '../../../core/services';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class DepartmentComponent implements OnInit {
  departmentForm: FormGroup;
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
    this.departmentForm = this.parentF.form;
    this.departmentForm.addControl('departamentos', this.formBuilder.array([]));
    this.departmentForm.get('departamentos').valueChanges.subscribe(
      uname => {
        uname.forEach(childObj=> {
            console.log(childObj);
         });


      }
    );

    this.addButton();
  }

  //bienes Vehiculo
  addFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: null,
      alias: ['', Validators.required],
      nombreArea : ['', Validators.required],
      descripcionArea: null,
      activo: ['S']
    });
  }

  addButton(): void {
    (<FormArray>this.departmentForm.get('departamentos')).push(this.addFormGroup());
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
          this.apiService.delete('/departamentos_sucursal/' + data.id)
          .subscribe(res => {
              if(res.status == 200){
                (<FormArray>this.departmentForm.get('departamentos')).removeAt((<FormArray>this.departmentForm.get('departamentos')).value.findIndex(dep => dep === data))
              }
          });
        }
      })
    }else{
      (<FormArray>this.departmentForm.get('departamentos')).removeAt((<FormArray>this.departmentForm.get('departamentos')).value.findIndex(dep => dep === data))
    }
  }

}
