import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Users } from '../../../core/models';
import { ApiService } from '../../../core/services';
import { PasswordProfileComponent } from '../password-profile';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  private model = new Users;
  constructor(
    public dialog: MatDialog,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {}

   ngOnInit() {
     this.apiService.get('/usuarios/' + this.route.snapshot.params.id)
     .subscribe(res => {
        this.model = res.model;
     });
   }

   changePassword() {
     const dialogConfig = new MatDialogConfig();
     dialogConfig.data = this.model;
     dialogConfig.maxWidth = "450px";
     dialogConfig.autoFocus = true;

     const dialogRef = this.dialog.open(PasswordProfileComponent,dialogConfig);

     dialogRef.afterClosed().subscribe(result => {
         if(result){

         }
     });
   }
}
