import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Users, People, Message} from '../../../../core/models';
import { FormGroup, FormArray , FormControl, FormBuilder,
   Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { ApiService, PeopleService } from '@core/service';
import { PasswordProfileComponent } from '../../../profile/password-profile';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';
import { environment } from '../../../../../environments/environment';
import { DeleteDialogComponent } from '../../../../shared';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-view-functionary',
  templateUrl: './view-functionary.component.html',
  styleUrls: ['./view-functionary.component.css']
})
export class ViewFunctionaryComponent implements OnInit {
  myForm: FormGroup;
  params = new HttpParams({fromObject : {'included' : 'referencias,estudios,sucursal'}});


  constructor(
    private router: Router,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private peopleService: PeopleService,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {}

   ngOnInit() {
     this.initFormBuilder();
     this.apiService.get('/funcionarios/' + this.route.snapshot.params.id, this.params)
     .subscribe(res => {
       if(res.status == 200){
         this.peopleService.loadData((<FormGroup>this.myForm.get('persona')),res.model.persona);
         res.fechaIngreso =  new Date(res.fechaIngreso);
         this.myForm.patchValue(res.model);
       }
     });
   }

   protected initFormBuilder() {
     this.myForm = this.formBuilder.group({
         id: null,
         alias: [null, [Validators.required]],
         nroLegajo: [null, [Validators.required]],
         fechaIngreso: [null, [Validators.required]],
         fechaEgreso: [null],
         tipoMotivoRetiro: [null],
         cargo: [null, [Validators.required]],
         expirationTimeTokens: [5, [Validators.required]],
         claveAcceso: [null, [Validators.required]],
         rol: [null, [Validators.required]],
         sucursal: [null, [Validators.required]],
         observacionRetiro: [null],
         departamentos: [null, [Validators.required]],
         tipoFuncionario: [null, [Validators.required]],
         activo: 'S'
     });
   }

   changePassword() {
     const dialogConfig = new MatDialogConfig();
     dialogConfig.data = this.myForm.value;
     dialogConfig.maxWidth = "400px";
     dialogConfig.autoFocus = true;

     const dialogRef = this.dialog.open(PasswordProfileComponent,dialogConfig);

     dialogRef.afterClosed().subscribe(result => {
         if(result){

         }
     });
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
           this.apiService.delete('/funcionarios/' + data.id)
           .subscribe(res => {
               if(res.status == 200){
                 this.router.navigateByUrl('service-web/functionary');
               }
           });
         }
       })
     }
   }

}
