import { Component, OnInit } from '@angular/core';
import { Subsidiary, Departments, Message, Location } from '../../../core/models';
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
  }

  onSubmit() {
    this.model = this.subsidiaryForm.value;
    this.model.latitud = this.latitude;
    this.model.longitud = this.longitude;
    this.apiService.put('/sucursales/' + this.route.snapshot.params.id, this.model)
    .subscribe(res => {

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
      nombre: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(35)]],
      direccion: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(35)]],
      telefono: [null, [Validators.required]],
      email: [null, [Validators.required]],
      pais: [null, [Validators.required]],
      departamento: [null, [Validators.required]],
      ciudad: [null, [Validators.required]],
      barrio: null
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
  getAddress(location: Location): void {
    this.subsidiaryForm.controls['latitud'].setValue(location.lat);
    this.subsidiaryForm.controls['longitud'].setValue(location.lng);
    this.subsidiaryForm.controls['direccion'].setValue(location.address);
  }

  getValue(data: any, form : FormControl): void {
    form.setValue(data);
  }

}
