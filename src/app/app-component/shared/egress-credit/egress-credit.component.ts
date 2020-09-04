import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators, ControlContainer, FormGroupDirective} from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DeleteDialogComponent } from '../../../shared';
import {ApiService} from '../../../core/services';

@Component({
  selector: 'app-egress-credit',
  templateUrl: './egress-credit.component.html',
  styleUrls: ['./egress-credit.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class EgressCreditComponent implements OnInit {
  egressCreditForm: FormGroup;
  peopleForm: FormGroup;

  formArrayName = 'egresoCreditos';
  @Input() minRow;
  @Input()
  set fkFilterModel(id: any) {
    if(id){
      //this.onChangesFkModel(id);
    }
  }

  constructor(
    private parentF: FormGroupDirective,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    public dialog: MatDialog

  ) { }

  ngOnInit() {

    this.egressCreditForm = this.parentF.form;
    this.peopleForm = (<FormGroup>this.egressCreditForm.get('persona'));
    this.peopleForm.addControl(this.formArrayName, this.formBuilder.array([]));
    this.addButton();
  }

  addButton(): void {
    (<FormArray>this.peopleForm.get(this.formArrayName)).push(this.addFormGroup());
  }

  //Egresos Creditos
  addFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [''],
      nombreFinanciera:['', [Validators.required]],
      cuota:['', [Validators.required]],
      promedioAtraso:['', [Validators.required]],
      maximoAtraso:['', [Validators.required]],
      monto: [0, [Validators.required]],
      observacion: [''],
      activo: ['S']
    });
  }//id,nombreFinanciera,cuota,promedioAtraso,monto

  getValue(data: any, form : FormControl): void {
    form.setValue(data);
  }

  onChangesPeople(){
    this.peopleForm.controls['id'].valueChanges
    .subscribe(id => {
        this.onChangesFkModel(id);
    });
  }

  onChangesFkModel(id:any){
    this.apiService.getPageList('/egresosCreditos',false,null,null, 'desc', 'id',0,50, false,id)
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

      const dialogConfig = new MatDialogConfig();
      dialogConfig.data.titulo = "Eliminar Registro";
      dialogConfig.data.texto = "Esta seguro que desea eliminar el registro ";

      let dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.apiService.delete('/egresosCreditos/' + data.id)
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



}
