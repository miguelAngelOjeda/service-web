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
  subsidiaryForm: FormGroup;
  model: Subsidiary;

  constructor(
            private route: ActivatedRoute,
            private formBuilder: FormBuilder,
            public dialogRef: MatDialogRef<AddDialogoSubsidiaryComponent>,
            private apiService: ApiService,
            @Inject(MAT_DIALOG_DATA) public data: Subsidiary) {
              this.model = data;
  }

  ngOnInit() {
    this.initFormBuilder();
    this.subsidiaryForm.controls['empresa'].setValue(this.model.empresa);
  }

  onSubmit() {
    this.apiService.post('/empresas/'+ this.model.empresa.id +'/sucursales', this.subsidiaryForm.value)
    .subscribe(res => {
        if(res.status === 200){
          this.model = res.model as Subsidiary;
          this.dialogRef.close(true);
        }
    });
  }

  initFormBuilder() {
    this.subsidiaryForm = this.formBuilder.group({
      id: null,
      codigoSucursal: [{value: null, disabled: true}],
      descripcion: null,
      telefonoMovil: null,
      fax: null,
      observacion: null,
      activo: null,
      latitud: null,
      longitud: null,
      empresa: [{value: {'nombre':' ', 'ruc':' ', 'direccion':' '}, disabled: false}],
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(35)]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      email: ['', [Validators.required]],
      pais: [null, [Validators.required]],
      departamento: [null, [Validators.required]],
      ciudad: [null, [Validators.required]],
      barrio: null
    });
  }

  // Get Current Location Coordinates
  getAddress(location: Location): void {
    this.subsidiaryForm.controls['latitud'].setValue(location.lat);
    this.subsidiaryForm.controls['longitud'].setValue(location.lng);
    this.subsidiaryForm.controls['direccion'].setValue(location.address);
  }

  getValue(data: any, form : FormControl): void {
    form.setValue(data);
  }

}
