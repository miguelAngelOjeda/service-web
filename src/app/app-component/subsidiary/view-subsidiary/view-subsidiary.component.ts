import { Component, OnInit } from '@angular/core';
import { Subsidiary, Message } from '../../../core/models';
import {FormControl, Validators} from '@angular/forms';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../core/services';
import { DeleteDialogComponent } from '../../../shared';
import { MatDialog, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-view-subsidiary',
  templateUrl: './view-subsidiary.component.html',
  styleUrls: ['./view-subsidiary.component.css']
})
export class ViewSubsidiaryComponent implements OnInit {
  public model = new Subsidiary;
  latitude: number;
  longitude: number;
  zoom: number;

  constructor(
    public dialog: MatDialog,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.apiService.get('/sucursales/' + this.route.snapshot.params.id)
    .subscribe(res => {
       this.model = res.model as Subsidiary;
    });
  }

  delete(data: any){
    if(data.id){
      const message = new Message;
      message.titulo = "Eliminar Registro"
      message.texto = "Esta seguro que desea eliminar el registro " + data.nombre;

      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = message;

      let dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.apiService.delete('/sucursales/' + data.id)
          .subscribe(res => {
              if(res.status == 200){

              }
          });
        }
      })
    }
  }


}
