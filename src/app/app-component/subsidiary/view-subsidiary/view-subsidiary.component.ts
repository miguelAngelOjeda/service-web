import { Component, OnInit } from '@angular/core';
import { Subsidiary } from '../../../core/models';
import {FormControl, Validators} from '@angular/forms';
import { MapsAPILoader, MouseEvent } from '@agm/core';
declare var google: any;
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../core/services';

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
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.apiService.get('/sucursales/' + this.route.snapshot.params.id)
    .subscribe(res => {
       this.model = res.model as Subsidiary;
    });
    this.setCurrentLocation();
  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = this.model.latitud == null ? position.coords.latitude : this.model.latitud;
        this.longitude = this.model.longitud == null ? position.coords.longitude : this.model.longitud;
        this.zoom = 15;
        //this.getAddress(this.latitude, this.longitude);
      });
    }
  }


}
