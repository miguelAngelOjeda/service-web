import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray , FormControl, FormBuilder,
   Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DeleteDialogComponent } from '../../../../shared';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Message } from '../../../../core/models';
import { ApiService } from '@core/service';

@Component({
  selector: 'app-edit-tryst-status',
  templateUrl: './edit-tryst-status.component.html',
  styleUrls: ['./edit-tryst-status.component.scss']
})
export class EditTrystStatusComponent implements OnInit {

  myForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initFormBuilder();
    this.apiService.get('/estado-citas/' + this.route.snapshot.params.id)
    .subscribe(res => {
      if(res.status == 200){
        this.myForm.patchValue(res.model);
      }
    });

  }

  onSubmit() {
    this.apiService.put('/estado-citas/' + this.route.snapshot.params.id, this.myForm.value)
    .subscribe(res => {
        //this.snackBarService.openSnackBar('res');
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
          this.apiService.delete('/estado-citas/' + data.id)
          .subscribe(res => {
              if(res.status == 200){

              }
          });
        }
      })
    }
  }

}
