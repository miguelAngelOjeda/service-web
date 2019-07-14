import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Role, Authorities, Message } from '../../../core/models';
import { ApiService } from '../../../core/services';
import { FormControl, Validators} from '@angular/forms';
import { MatSnackBar, MatDialog, MatDialogConfig} from '@angular/material';
import { DeleteDialogComponent } from '../../../shared';

@Component({
  selector: 'app-role-types',
  templateUrl: './view-role.component.html',
  styleUrls: ['./view-role.component.scss']
})
export class ViewRoleComponent implements OnInit {
    public model = new Role;
    public authorities: Array<Authorities> = [];

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
            item.authority = [];
             this.model.authorities.forEach(authModel=> {
               if(item.grupo === authModel.grupo){
                 item.authority.push(authModel);
               }
             });

          });
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
