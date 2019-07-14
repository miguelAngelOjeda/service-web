import { Component, OnInit } from '@angular/core';
import { FormControl, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Role, Authorities, Message } from '../../../core/models';
import { ApiService } from '../../../core/services';
import { MatSnackBar, MatDialog, MatDialogConfig} from '@angular/material';
import { DeleteDialogComponent } from '../../../shared';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.scss']
})
export class EditRoleComponent implements OnInit {
  public model = new Role;
  public authorities: Array<Authorities> = [];

  formControl = new FormControl('', [Validators.required]);

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {

    this.apiService.get('/roles/' + this.route.snapshot.params.id)
    .subscribe(res => {
       this.model = res.model as Role;
    });

    this.apiService.getPageList('/roles/group',false)
    .subscribe(res => {
        this.authorities = res.rows;
        this.authorities.forEach(item => {
           item.authority.forEach(auth=> {
             this.model.authorities.forEach(authModel=> {
               if(auth.id === authModel.id){
                 auth.checked = true;
               }
             });
           });
        });
    });
  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Campo requerido' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit(form) {
    this.model.authorities = [];
    this.authorities.forEach(item => {
       item.authority.forEach(auth=> {
         if(auth.checked){
           this.model.authorities.push(auth);
         }
       });
    });
    this.apiService.put('/roles/' + this.route.snapshot.params.id, this.model)
    .subscribe(res => {
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
          this.apiService.delete('/roles/' + data.id)
          .subscribe(res => {
              if(res.status == 200){
                this.router.navigateByUrl('service-web/role');
              }
          });
        }
      })
    }
  }

}
