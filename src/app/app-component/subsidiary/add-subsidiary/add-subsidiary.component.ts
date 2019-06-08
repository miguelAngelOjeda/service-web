import { Component, OnInit } from '@angular/core';
import { Subsidiary, Departments, Business, Location } from '../../../core/models';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../core/services';
import { MapsAPILoader, MouseEvent } from '@agm/core';
declare var google: any;

@Component({
  selector: 'app-add-subsidiary',
  templateUrl: './add-subsidiary.component.html',
  styleUrls: ['./add-subsidiary.component.css']
})
export class AddSubsidiaryComponent implements OnInit {
  private model = new Subsidiary();
  subsidiaryForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.initFormBuilder();
  }

  onSubmit() {
    this.apiService.post('/sucursales', this.subsidiaryForm.value)
    .subscribe(res => {
      if(res.status == 200){
        const departments = this.subsidiaryForm.get('departamentos') as FormArray;

        if(res.model.departamentos == null
            || res.model.departamentos.length == 0){
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
