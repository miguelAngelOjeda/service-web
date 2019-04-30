import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subsidiary } from '../../../../core/models';
import { ApiService } from '../../../../core/services';
import { FormControl, Validators} from '@angular/forms';
import { MatPaginator, MatTableDataSource, MatDialog, MatSort, PageEvent,
   Sort, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MapsAPILoader, MouseEvent } from '@agm/core';
declare var google: any;

@Component({
  selector: 'app-edit-dialogo-subsidiary',
  templateUrl: './edit-dialogo-subsidiary.component.html',
  styleUrls: ['./edit-dialogo-subsidiary.component.css']
})
export class EditDialogoSubsidiaryComponent {
  model: Subsidiary;
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
  formControl = new FormControl('', [
    Validators.required
  ]);

  constructor(
            public dialogRef: MatDialogRef<EditDialogoSubsidiaryComponent>,
            private apiService: ApiService,
            @Inject(MAT_DIALOG_DATA) public data: Subsidiary) {
              this.model = data;
              this.setCurrentLocation();
  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Campo requerido' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
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

  markerDragEnd($event: MouseEvent) {
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
  }

  submit(form) {
    this.model.latitud = this.latitude;
    this.model.longitud = this.longitude;
    this.apiService.put('/sucursales/' + this.model.id, this.model)
    .subscribe(res => {
        //this.snackBarService.openSnackBar('res');

    });
  }
}
