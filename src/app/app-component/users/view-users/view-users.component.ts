import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Users, People, Message} from '../../../core/models';
import { ApiService } from '../../../core/services';
import { PasswordProfileComponent } from '../../profile/password-profile';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';
import { environment } from '../../../../environments/environment';
import { DeleteDialogComponent } from '../../../shared';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {
  public model = new Users;
  urlImage = environment.api_url;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {}

   ngOnInit() {
     this.apiService.get('/usuarios/' + this.route.snapshot.params.id)
     .subscribe(res => {
       if(res.status == 200){
         this.model = res.model;
       }
     });
   }

   changePassword() {
     const dialogConfig = new MatDialogConfig();
     dialogConfig.data = this.model;
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
