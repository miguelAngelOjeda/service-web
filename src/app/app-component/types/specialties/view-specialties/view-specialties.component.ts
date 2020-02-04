import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../../../../core/models';
import { ApiService } from '@core/service';
import { DeleteDialogComponent } from '../../../../shared';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { FormGroup, FormArray , FormControl, FormBuilder,
   Validators, NgForm, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-view-specialties',
  templateUrl: './view-specialties.component.html',
  styleUrls: ['./view-specialties.component.scss']
})
export class ViewSpecialtiesComponent implements OnInit {
    myForm: FormGroup;

    constructor(
      private formBuilder: FormBuilder,
      private apiService: ApiService,
      private dialog: MatDialog,
      private route: ActivatedRoute
    ) {}

    ngOnInit() {
      this.initFormBuilder();
      this.apiService.get('/especialidades/' + this.route.snapshot.params.id)
      .subscribe(res => {
        if(res.status == 200){
          this.myForm.patchValue(res.model);
        }
      });

    }

    protected initFormBuilder() {
      this.myForm = this.formBuilder.group({
        id: null ,
        nombre: [null, [Validators.required]],
        descripcion: [null],
        codigo: ' ',
        activo: 'S'
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
            this.apiService.delete('/especialidades/' + data.id)
            .subscribe(res => {
                if(res.status == 200){

                }
            });
          }
        })
      }
    }


}
