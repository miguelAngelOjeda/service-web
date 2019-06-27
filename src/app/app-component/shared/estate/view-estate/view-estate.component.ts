import { Component, OnInit, EventEmitter, Output, Input, ElementRef } from '@angular/core';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators, ControlContainer, FormGroupDirective} from '@angular/forms';
import { MatDialog, PageEvent, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';
import { UserService, ApiService, FormsService} from '../../../../core/services';

@Component({
  selector: 'app-view-estate',
  templateUrl: './view-estate.component.html',
  styleUrls: ['./view-estate.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class ViewEstateComponent implements OnInit {
  estateForm: FormGroup;
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
    this.estateForm.addControl(this.formArrayName, this.formBuilder.array([]));
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

  onChangesFkModel(id:any){
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
  }
}
