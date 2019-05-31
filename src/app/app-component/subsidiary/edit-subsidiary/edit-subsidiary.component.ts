import { Component, OnInit } from '@angular/core';
import { Subsidiary, Departments, Message  } from '../../../core/models';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../core/services';
import { DeleteDialogComponent } from '../../../shared';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators} from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';
import { MapsAPILoader, MouseEvent } from '@agm/core';
declare var google: any;

@Component({
  selector: 'app-edit-subsidiary',
  templateUrl: './edit-subsidiary.component.html',
  styleUrls: ['./edit-subsidiary.component.css']
})
export class EditSubsidiaryComponent implements OnInit {
  private model = new Subsidiary;
  subsidiaryForm: FormGroup;
  latitude: number;
  longitude: number;
  zoom: number;

  constructor(
    public dialog: MatDialog,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initFormBuilder();
    this.apiService.get('/sucursales/' + this.route.snapshot.params.id)
    .subscribe(res => {
       this.model = res.model as Subsidiary;
       this.addDinamicClick();
       this.onsetValueClick(this.model);
    });
    this.setCurrentLocation();
  }

  onSubmit() {
    this.model = this.subsidiaryForm.value;
    this.model.latitud = this.latitude;
    this.model.longitud = this.longitude;
    this.apiService.put('/sucursales/' + this.route.snapshot.params.id, this.model)
    .subscribe(res => {

    });
  }

  delete(data: Departments){
    if(data.id){

      const message = new Message;
      message.titulo = "Eliminar Registro"
      message.texto = "Esta seguro que desea eliminar el registro " + data.nombreArea;

      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = message;

      let dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);
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

  get departments(): FormArray {
    return (<FormArray>this.subsidiaryForm.get('departamentos'));
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
      nombre: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(35)]],
      direccion: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(35)]],
      telefono: [null, [Validators.required]],
      email: [null, [Validators.required]],
      pais: [null, [Validators.required]],
      departamento: [null, [Validators.required]],
      ciudad: [null, [Validators.required]],
      barrio: null,
      departamentos: this.formBuilder.array([this.addFormGroup()])
    });
  }

  addFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [''],
      alias: ['', Validators.required],
      nombreArea : ['', Validators.required],
      descripcionArea: [''],
      activo: ['']
    });
  }

  addDinamicClick(): void {
    for (let i = 0; i < this.model.departamentos.length - 1; i++) {
      this.addButtonClick();
    }
  }

  addButtonClick(): void {
    (<FormArray>this.subsidiaryForm.get('departamentos')).push(this.addFormGroup());
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
        this.latitude = this.model.latitud == null ? position.coords.latitude : this.model.latitud;
        this.longitude = this.model.longitud == null ? position.coords.longitude : this.model.longitud;
        this.zoom = 15;
        //this.getAddress(this.latitude, this.longitude);
      });
    }
  }

  markerDragEnd($event: MouseEvent) {
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
  }
}
