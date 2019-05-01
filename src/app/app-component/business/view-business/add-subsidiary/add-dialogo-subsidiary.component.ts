import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subsidiary, Departments } from '../../../../core/models';
import { ApiService } from '../../../../core/services';
import { FormControl, Validators} from '@angular/forms';
import { MatPaginator, MatTableDataSource, MatDialog, MatSort, PageEvent,
   Sort, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MapsAPILoader, MouseEvent } from '@agm/core';
declare var google: any;

@Component({
  selector: 'app-add-dialogo-subsidiary',
  templateUrl: './add-dialogo-subsidiary.component.html',
  styleUrls: ['./add-dialogo-subsidiary.component.css']
})
export class AddDialogoSubsidiaryComponent {
  areas: Array<Departments> = [];
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;

  model: Subsidiary;
  area: Departments;
  formControl = new FormControl('', [
    Validators.required
  ]);

  constructor(
            private route: ActivatedRoute,
            public dialogRef: MatDialogRef<AddDialogoSubsidiaryComponent>,
            private apiService: ApiService,
            @Inject(MAT_DIALOG_DATA) public data: Subsidiary) {
              this.model = data;
              this.setCurrentLocation();
  }

  submit(form) {
    this.model.latitud = this.latitude;
    this.model.longitud = this.longitude;
    console.log(this.model);
    this.apiService.post('/empresas/'+ this.model.empresa.id +'/sucursales', this.model)
    .subscribe(res => {
        this.model = res.model as Subsidiary;
    });
  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = this.data.latitud == null ? position.coords.latitude : this.data.latitud;
        this.longitude = this.data.longitud == null ? position.coords.longitude : this.data.longitud;
        this.zoom = 15;
      });
    }
  }

  getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  addDepartment() {
    this.model.departamentos.push(new Departments);
  }

  deleteDepartment(area){
    this.model.departamentos.splice(this.areas.indexOf(area), 1);
  }

  markerDragEnd($event: MouseEvent) {
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
  }


  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Campo requerido' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }
}
