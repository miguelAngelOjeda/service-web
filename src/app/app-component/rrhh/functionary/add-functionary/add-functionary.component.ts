import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormArray, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UserService, ApiService } from '../../../../core/services';
import { Users, Departments } from '../../../../core/models';
import { HttpParams } from '@angular/common/http';

@Component({
    selector: 'app-add-functionary',
    templateUrl: './add-functionary.component.html',
    styleUrls: ['./add-functionary.component.scss']
})
export class AddFunctionaryComponent implements OnInit {
    myForm: FormGroup;
    hide = true;
    public departments: Array<Departments> = [];

    constructor(
        private formBuilder: FormBuilder,
        private apiService: ApiService,
    ) { }

    ngOnInit() {
        this.initFormBuilder();
        this.myForm.get('sucursal').valueChanges.subscribe(
            uname => {
                this.filterDepartments();
            }
        );
    }

    submit() {
        if (this.myForm.value.persona.tipoPersona !== 'FISICA') {
            this.myForm.value.persona.documento = ' ';
            this.myForm.value.persona.fechaNacimiento = new Date();
            this.myForm.value.persona.primerApellido = ' ';
            this.myForm.value.persona.sexo = 'N';
            this.myForm.value.persona.estadoCivil = 'N';
        }

        this.apiService.post('/funcionarios/', this.myForm.value)
            .subscribe(res => {
              if(res.status == 200){
                this.loadData(res.model);
              }
            });
    }

    protected initFormBuilder() {
        this.myForm = this.formBuilder.group({
            id: null,
            alias: [null, [Validators.required]],
            nroLegajo: [null, [Validators.required]],
            fechaIngreso: [null, [Validators.required]],
            cargo: [null, [Validators.required]],
            expirationTimeTokens: [5, [Validators.required]],
            claveAcceso: [null, [Validators.required]],
            rol: [null, [Validators.required]],
            sucursal: [null, [Validators.required]],
            departamentos: [null, [Validators.required]],
            tipoFuncionario: [null, [Validators.required]],
            activo: 'S'
        });
    }

    getValue(data: any, form: any): void {
        (<FormControl>this.myForm.get(form)).setValue(data);
    }

    protected filterDepartments() {
        if (this.myForm.get('sucursal').value.id != null) {
            this.apiService.getPageList('/sucursales/' + this.myForm.get('sucursal').value.id + '/departamentos', false, null, null, 'desc', 'id',
                0, 10)
                .subscribe(res => {
                    if (res.status == 200) {
                        this.departments = res.rows as Departments[];
                    }
                });
        }
    }


    compareObjects(o1: any, o2: any): boolean {
        if (!o1
            || !o2) {
            return false;
        }
        return o1.id === Number(o2.id);
    }

    protected loadData(response: any) {
      response.persona.fechaNacimiento =  new Date(response.persona.fechaNacimiento);
      response.fechaIngreso =  new Date(response.fechaIngreso);
      (<FormGroup>this.myForm).patchValue(response);

      //Cargar Referencias
      if(response.persona.referencias != null && response.persona.referencias.length > 0){
        const referencias = (<FormArray>this.myForm.get('referencias'));
        if(referencias != null){
          while (referencias.length) {
            referencias.removeAt(0);
          }
        }
        response.persona.referencias.forEach(staff => {
          referencias.push(this.formBuilder.group(staff));
        });
      }

      //Cargar Estudios
      if(response.persona.estudios != null &&  response.persona.estudios.length > 0){
        const estudios = (<FormArray>this.myForm.get('estudios'));
        if(estudios != null){
          while (estudios.length) {
            estudios.removeAt(0);
          }
        }
        response.persona.estudios.forEach(staff => {
          estudios.push(this.formBuilder.group(staff));
        });
      }
    }




}
