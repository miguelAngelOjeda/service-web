import { Component, OnInit, NgZone, ViewChild, EventEmitter, Output, Input} from '@angular/core';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { GoogleMapsAPIWrapper } from '@agm/core/services';
import { Location } from '../../core/models';
declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  circleRadius:number = 5000;
  geocoder:any;
  @Output() valueLocationChange = new EventEmitter<Location>();
  public location:Location = {
    lat: 51.678418,
    lng: 7.809007,
    isView: true,
    marker: {
      lat: 51.678418,
      lng: 7.809007,
      draggable: true
    },
    zoom: 5
  };
  @ViewChild(AgmMap) map: AgmMap;

  constructor(
    public mapsApiLoader: MapsAPILoader,
              private zone: NgZone,
              private wrapper: GoogleMapsAPIWrapper
            ) {
    this.mapsApiLoader = mapsApiLoader;
    this.zone = zone;
    this.wrapper = wrapper;
    this.mapsApiLoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
    });
 }

  ngOnInit() {
    this.location.marker.draggable = true;
    this.setCurrentLocation();
  }

  @Input()
  set latitude(latitude: any) {
    this.location.lat = latitude;
    this.location.marker.lat = latitude;
    this.location.isView = false;
  }

  @Input()
  set longitude(longitude: any) {
    this.location.lng = longitude;
    this.location.marker.lng = longitude;
    this.location.isView = false;
  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        if(this.location.isView){
          this.location.lat = position.coords.latitude;
          this.location.lng = position.coords.longitude;
          this.location.marker.lat = position.coords.latitude;
          this.location.marker.lng = position.coords.longitude;
        }
        this.location.marker.draggable = true;
        this.location.zoom = 15;
      });
    }
  }

  updateOnMap() {
    let full_address:string = this.location.address_level_1 || ""
    if (this.location.address_level_2) full_address = full_address + " " + this.location.address_level_2
    if (this.location.address_state) full_address = full_address + " " + this.location.address_state
    if (this.location.address_country) full_address = full_address + " " + this.location.address_country

    this.findLocation(full_address);
  }

  findLocation(address) {
    if (!this.geocoder) this.geocoder = new google.maps.Geocoder()
    this.geocoder.geocode({
      'address': address
    }, (results, status) => {
      console.log(results);
      if (status == google.maps.GeocoderStatus.OK) {
        for (var i = 0; i < results[0].address_components.length; i++) {
          let types = results[0].address_components[i].types

          if (types.indexOf('locality') != -1) {
            this.location.address_level_2 = results[0].address_components[i].long_name
          }
          if (types.indexOf('country') != -1) {
            this.location.address_country = results[0].address_components[i].long_name
          }
          if (types.indexOf('postal_code') != -1) {
            this.location.address_zip = results[0].address_components[i].long_name
          }
          if (types.indexOf('administrative_area_level_1') != -1) {
            this.location.address_state = results[0].address_components[i].long_name
          }
        }

        if (results[0].geometry.location) {
          this.location.lat = results[0].geometry.location.lat();
          this.location.lng = results[0].geometry.location.lng();
          this.location.marker.lat = results[0].geometry.location.lat();
          this.location.marker.lng = results[0].geometry.location.lng();
          this.location.marker.draggable = true;
          this.location.viewport = results[0].geometry.viewport;
        }
        this.map.triggerResize()
      } else {
        alert("Sorry, this search produced no results.");
      }
    })
  }

  markerDragEnd(m: any, $event: any) {
   this.location.marker.lat = m.coords.lat;
   this.location.marker.lng = m.coords.lng;
   this.findAddressByCoordinates();
  }

  findAddressByCoordinates() {
    this.geocoder.geocode({
      'location': {
        lat: this.location.marker.lat,
        lng: this.location.marker.lng
      }
    }, (results, status) => {
      this.decomposeAddressComponents(results);
    })
  }

  decomposeAddressComponents(addressArray) {
    if (addressArray.length == 0) return false;
    let address = addressArray[0].address_components;
    this.location.address_level_1 = '';
    this.location.address_level_2 = '';
    this.location.address_state = '';
    this.location.address_country = '';
    for(let element of address) {
      if (element.length == 0 && !element['types']) continue

      if (element['types'].indexOf('street_number') > -1) {
        this.location.address_level_1 = element['long_name'];
        continue;
      }
      if (element['types'].indexOf('route') > -1) {
        console.log(element['long_name']);
        this.location.address_level_1 += ', ' + element['long_name'];
        continue;
      }
      if (element['types'].indexOf('locality') > -1) {
        this.location.address_level_2 = element['long_name'];
      }
      if (element['types'].indexOf('administrative_area_level_1') > -1) {
        this.location.address_state = element['long_name'];
        continue;
      }
      if (element['types'].indexOf('country') > -1) {
        this.location.address_country = element['long_name'];
        continue;
      }
      if (element['types'].indexOf('postal_code') > -1) {
        this.location.address_zip = element['long_name'];
        continue;
      }
    }

    if(this.location.address_country != null
                                       && this.location.address_country != ''){
        this.location.address =  this.location.address_country;
    }
    if(this.location.address_level_1 != null
                                       && this.location.address_level_1 != ''){
        this.location.address = this.location.address +'/' + this.location.address_level_1;
    }
    if(this.location.address_level_2 != null
                                       && this.location.address_level_2 != ''){
        this.location.address = this.location.address + '-' + this.location.address_level_2;
    }
    if(this.location.address_state != null
                                       && this.location.address_state != ''){
        this.location.address = this.location.address + ' '+ this.location.address_state;
    }
    this.valueLocationChange.emit(this.location);
  }

}
