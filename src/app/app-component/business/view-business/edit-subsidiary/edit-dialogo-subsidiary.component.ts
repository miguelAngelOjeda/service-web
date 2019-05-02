import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subsidiary, Departments } from '../../../../core/models';
import { ApiService } from '../../../../core/services';
import { DialogComponent } from '../../../../shared';
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
  subsidiaryForm: FormGroup;
  model: Subsidiary;
  department: Departments;
  listDepartments: Array<Departments> = [];
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
  formControl = new FormControl('', [
    Validators.required
  ]);

  constructor(
            public dialog: MatDialog,
            private formBuilder: FormBuilder,
            public dialogRef: MatDialogRef<EditDialogoSubsidiaryComponent>,
            private apiService: ApiService,
            @Inject(MAT_DIALOG_DATA) public data: Subsidiary) {
              this.model = data;
              this.setCurrentLocation();
  }

  ngOnInit() {
    this.subsidiaryForm = this.formBuilder.group({
      id: [''],
      codigoSucursal: [''],
      descripcion: [''],
      telefonoMovil: [''],
      fax: [''],
      observacion: [''],
      activo: [''],
      fechaCreacion: [''],
      idUsuarioCreacion: [''],
      fechaModificacion: [''],
      idUsuarioModificacion: [''],
      fechaEliminacion: [''],
      idUsuarioEliminacion: [''],
      latitud: [''],
      longitud: [''],
      empresa: [''],
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(35)]],
      direccion: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(35)]],
      telefono: ['', [Validators.required]],
      email: ['', [Validators.required]],
      departamentos: this.formBuilder.array([ this.addSkillFormGroup()])
    });
    this.addSkillDinamicClick();
    this.onsetValueClick(this.model);
  }

  onSubmit() {
    console.log(this.subsidiaryForm.value);
    this.model = this.subsidiaryForm.value;
    this.model.latitud = this.latitude;
    this.model.longitud = this.longitude;
    this.apiService.put('/sucursales/' + this.model.id, this.model)
    .subscribe(res => {
        //this.snackBarService.openSnackBar('res');

    });
  }

  deleteDepartment(data: Departments){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = "eliminar  la Sucursal " +data.nombreArea;
    let dialogRef = this.dialog.open(DialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.apiService.delete('/departamentos_sucursal/' + data.id)
        .subscribe(res => {
          
        });
      }
    })
  }

  addSkillDinamicClick(): void {
    for (let i = 0; i < this.model.departamentos.length - 1; i++) {
      this.addSkillButtonClick();
    }
  }

  addSkillButtonClick(): void {
    (<FormArray>this.subsidiaryForm.get('departamentos')).push(this.addSkillFormGroup());
  }

  addSkillFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [''],
      alias: ['', Validators.required],
      nombreArea : ['', Validators.required],
      descripcionArea: [''],
      activo: ['']
    });
  }

  onsetValueClick(model : Subsidiary): void {
    if(model.departamentos.length == 0){
      model.departamentos.push({
        id: null,
        alias: '',
        nombreArea : '',
        descripcionArea: '',
        activo: ''
      });
    }else{
      this.listDepartments = [];
      model.departamentos.forEach(obj=> {
        this.department = new Departments;
        this.department.id = obj.id;
        this.department.alias = obj.alias;
        this.department.nombreArea = obj.nombreArea;
        this.department.descripcionArea = obj.descripcionArea;
        this.department.activo = obj.activo;
        this.listDepartments.push(this.department);
      });
      model.departamentos = [];
      model.departamentos = this.listDepartments;
    }
    this.subsidiaryForm.setValue(model);
  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = this.data.latitud == null ? position.coords.latitude : this.data.latitud;
        this.longitude = this.data.longitud == null ? position.coords.longitude : this.data.longitud;
        this.zoom = 15;
      });
    }
  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Campo requerido' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  markerDragEnd($event: MouseEvent) {
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
  }

}
