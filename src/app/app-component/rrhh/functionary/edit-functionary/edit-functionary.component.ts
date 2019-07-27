import { Component, OnInit, Inject, ViewChild, ElementRef  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { FormControl, FormArray, Validators, FormBuilder, FormGroup} from '@angular/forms';
import { UserService, ApiService} from '../../../../core/services';
import { Router, ActivatedRoute } from '@angular/router';
import { Users, Departments, Message } from '../../../../core/models';
import { DeleteDialogComponent } from '../../../../shared';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-edit-functionary',
  templateUrl: './edit-functionary.component.html',
  styleUrls: ['./edit-functionary.component.scss']
})
export class EditFunctionaryComponent implements OnInit {
  myForm: FormGroup;
  params = new HttpParams({fromObject : {'included' : 'referencias,sucursal,estudios'}});
  hide = true;
  public departments: Array<Departments> = [];

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
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
    this.apiService.get('/funcionarios/' + this.route.snapshot.params.id, this.params)
    .subscribe(res => {
      if(res.status == 200){
        this.loadData(res.model);
      }
    });
  }

  submit() {
    this.apiService.put('/funcionarios/' + this.route.snapshot.params.id, this.myForm.value)
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
    if(response.persona.estudios != null && response.persona.estudios.length > 0){
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

  getValue(data: any, form : any): void {
    (<FormControl>this.myForm.get(form)).setValue(data);
  }

  protected filterDepartments() {
    if(this.myForm.get('sucursal').value.id != null){
      this.apiService.getPageList('/sucursales/' + this.myForm.get('sucursal').value.id +'/departamentos',false,null,null, 'desc', 'id',
      0,10)
      .subscribe(res => {
        if(res.status === 200) {
          this.departments = res.rows as Departments[];
        }
      });
    }
  }


  compareObjects(o1: any, o2: any): boolean {
    if(!o1
          || !o2){
      return false;
    }
    return  o1.id === Number(o2.id);
  }

  delete(data: any){
    if(data.id){
      const message = new Message;
      message.titulo = "Eliminar Registro"
      message.texto = "Esta seguro que desea eliminar el registro!! ";

      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = message;

      let dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.apiService.delete('/usuarios/' + data.id)
          .subscribe(res => {
              if(res.status == 200){
                this.router.navigateByUrl('service-web/users');
              }
          });
        }
      })
    }
  }


}
