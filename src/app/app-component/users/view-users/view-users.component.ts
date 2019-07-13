import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Users, People, Message} from '../../../core/models';
import { ApiService } from '../../../core/services';
import { DeleteDialogComponent } from '../../../shared';
import { PasswordProfileComponent } from '../../profile/password-profile';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig, MatDialog } from '@angular/material';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {
  public model = new Users;
  urlImage = environment.api_url;

  constructor(
    public dialog: MatDialog,
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
           this.apiService.delete('/clientes/' + data.id)
           .subscribe(res => {
               if(res.status == 200){
                 //this.paginator._changePageSize(this.paginator.pageSize);
               }
           });
         }
       })
     }
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

}
