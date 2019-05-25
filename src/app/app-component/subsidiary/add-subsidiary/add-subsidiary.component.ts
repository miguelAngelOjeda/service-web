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

    });
  }

  delete(data: Departments){
      (<FormArray>this.subsidiaryForm.get('departamentos')).removeAt(this.departments.value.findIndex(dep => dep === data))
  }

  get departments(): FormArray {
    return (<FormArray>this.subsidiaryForm.get('departamentos'));
  }

  initFormBuilder() {
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
      empresa: [{value: {'nombre':' ', 'ruc':' ', 'direccion':' '}, disabled: false}],
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(35)]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      email: ['', [Validators.required]],
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
  getAddress(location: Location): void {
    this.subsidiaryForm.controls['latitud'].setValue(location.lat);
    this.subsidiaryForm.controls['longitud'].setValue(location.lng);
    this.subsidiaryForm.controls['direccion'].setValue(location.address);
  }

}
