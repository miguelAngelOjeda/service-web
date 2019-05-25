import { Component, OnInit, Inject, ElementRef, ViewChild, Input  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subsidiary, Departments, Location } from '../../../../core/models';
import { ApiService } from '../../../../core/services';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators} from '@angular/forms';
import { MatPaginator, MatTableDataSource, MatDialog, MatSort, PageEvent,
   Sort, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig  } from '@angular/material';

@Component({
  selector: 'app-add-dialogo-subsidiary',
  templateUrl: './add-dialogo-subsidiary.component.html',
  styleUrls: ['./add-dialogo-subsidiary.component.css']
})
export class AddDialogoSubsidiaryComponent implements OnInit{
  formControl = new FormControl('', [Validators.required]);
  subsidiaryForm: FormGroup;
  model: Subsidiary;
  area: Departments;

  constructor(
            private route: ActivatedRoute,
            private formBuilder: FormBuilder,
            public dialogRef: MatDialogRef<AddDialogoSubsidiaryComponent>,
            private apiService: ApiService,
            @Inject(MAT_DIALOG_DATA) public data: Subsidiary) {
              this.model = data;
  }

  ngOnInit() {
    this.subsidiaryForm = this.formBuilder.group({
      id: [''],
      codigoSucursal: [{value: null, disabled: true}],
      descripcion: [''],
      telefonoMovil: [''],
      fax: [''],
      observacion: [''],
      activo: [''],
      latitud: [''],
      longitud: [''],
      empresa: [''],
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(35)]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      email: ['', [Validators.required]],
      departamentos: this.formBuilder.array([this.addSkillFormGroup()])
    });
    this.onsetValue(this.model);
  }

  onSubmit() {
    this.model = this.subsidiaryForm.value;
    this.apiService.post('/empresas/'+ this.model.empresa.id +'/sucursales', this.model)
    .subscribe(res => {
        if(res.status === 200){
          this.model = res.model as Subsidiary;
          this.dialogRef.close(true);
        }
    });
  }

  private addSkillFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [''],
      alias: ['', Validators.required],
      nombreArea : ['', Validators.required],
      descripcionArea: [''],
      activo: ['']
    });
  }

  addSkillButtonClick(): void {
    (<FormArray>this.subsidiaryForm.get('departamentos')).push(this.addSkillFormGroup());
  }

  onsetValue(model : Subsidiary): void {
    if(model.departamentos.length == 0){
      model.departamentos.push({
        id: null,
        alias: '',
        nombreArea : '',
        descripcionArea: '',
        activo: ''
      });
    }
    this.subsidiaryForm.setValue(model);
  }

  get departments(): FormArray {
    return (<FormArray>this.subsidiaryForm.get('departamentos'));
  }

  delete(data: Departments){
      (<FormArray>this.subsidiaryForm.get('departamentos')).removeAt(this.departments.value.findIndex(image => image === data))
  }


  // Get Current Location Coordinates
  getAddress(location: Location): void {
    this.subsidiaryForm.controls['latitud'].setValue(location.lat);
    this.subsidiaryForm.controls['longitud'].setValue(location.lng);
    this.subsidiaryForm.controls['direccion'].setValue(location.address);
  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Campo requerido' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

}
