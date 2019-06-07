import { Component, OnInit, Inject, ElementRef, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ValidationService } from '../../../../core/services/validation.service';
import { Subsidiary, Departments, Message, Location } from '../../../../core/models';
import { ApiService } from '../../../../core/services';
import { DeleteDialogComponent } from '../../../../shared';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators} from '@angular/forms';
import { MatPaginator, MatTableDataSource, MatDialog, MatSort, PageEvent,
   Sort, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';
import { MapsAPILoader, MouseEvent } from '@agm/core';
declare var google: any;

@Component({
  selector: 'app-edit-dialogo-subsidiary',
  templateUrl: './edit-dialogo-subsidiary.component.html',
  styleUrls: ['./edit-dialogo-subsidiary.component.css']
})
export class EditDialogoSubsidiaryComponent implements OnInit{
  formControl = new FormControl('', [Validators.required]);
  subsidiaryForm: FormGroup;
  model: Subsidiary;
  department: Departments;
  private geoCoder;

  constructor(
            public dialog: MatDialog,
            private formBuilder: FormBuilder,
            public dialogRef: MatDialogRef<EditDialogoSubsidiaryComponent>,
            private apiService: ApiService,
            @Inject(MAT_DIALOG_DATA) public data: Subsidiary) {
              this.model = data;
  }

  ngOnInit() {
    this.initFormBuilder();
    setTimeout(() => {
      this.apiService.get('/sucursales/' + this.model.id)
      .subscribe(res => {
        if(res.status == 200){
          const departments = this.subsidiaryForm.get('departamentos') as FormArray;

          if(res.model.departamentos.length == 0){
            this.subsidiaryForm.patchValue(res.model);
          }else{
            // empty form array
            while (departments.length) {
              departments.removeAt(0);
            }
            // use patchValue instead of setValue
            this.subsidiaryForm.patchValue(res.model);
            // add form array values in a loop
            res.model.departamentos.forEach(staff => departments.push(this.formBuilder.group(staff)));
          }
        }
      });
    });
  }

  onSubmit() {
    this.apiService.put('/sucursales/' + this.model.id, this.subsidiaryForm.value)
    .subscribe(res => {
        //this.snackBarService.openSnackBar('res');
        if(res.status === 200){
          this.dialogRef.close(true);
        }
    });
  }

  initFormBuilder() {
    this.subsidiaryForm = this.formBuilder.group({
      id: [null],
      codigoSucursal: [{value: null, disabled: true}],
      descripcion: [null],
      telefonoMovil: [null],
      fax: [null],
      observacion: [null],
      activo: [null],
      latitud: [null],
      longitud: [null],
      empresa: [null],
      nombre: [null, [Validators.required, Validators.minLength(2)]],
      direccion: [null, [Validators.required, Validators.minLength(2)]],
      telefono: [null, [Validators.required]],
      email: [null, [Validators.required]],
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
