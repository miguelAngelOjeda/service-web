import { Component, OnInit, Inject, ElementRef, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ValidationService } from '../../../../core/services/validation.service';
import { Subsidiary, Departments, Message } from '../../../../core/models';
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
  formControl = new FormControl('', [Validators.required]);
  subsidiaryForm: FormGroup;
  model: Subsidiary;
  department: Departments;
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;

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
      direccion: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(35)]],
      telefono: ['', [Validators.required]],
      email: ['', [Validators.required]],
      departamentos: this.formBuilder.array([this.addSkillFormGroup()])
    });
    this.addSkillDinamicClick();
    this.onsetValueClick(this.model);
  }

  onSubmit() {
    this.model = this.subsidiaryForm.value;
    this.model.latitud = this.latitude;
    this.model.longitud = this.longitude;
    this.apiService.put('/sucursales/' + this.model.id, this.model)
    .subscribe(res => {
        //this.snackBarService.openSnackBar('res');
        if(res.status === 200){
          this.dialogRef.close(true);
        }
    });
  }

  get departments(): FormArray {
    return (<FormArray>this.subsidiaryForm.get('departamentos'));
  }

  delete(data: Departments){
    if(data.id){

      const message = new Message;
      message.titulo = "Eliminar Registro"
      message.texto = "Esta seguro que desea eliminar el registro " + data.nombreArea;

      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = message;
      dialogConfig.maxWidth = "280px";
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;

      let dialogRef = this.dialog.open(DialogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.apiService.delete('/departamentos_sucursal/' + data.id)
          .subscribe(res => {
              if(res.status == 200){
                (<FormArray>this.subsidiaryForm.get('departamentos')).removeAt(this.departments.value.findIndex(image => image.id === data.id))
              }
          });
        }
      })
    }else{
      (<FormArray>this.subsidiaryForm.get('departamentos')).removeAt(this.departments.value.findIndex(image => image === data))
    }
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


  markerDragEnd($event: MouseEvent) {
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Campo requerido' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

}
