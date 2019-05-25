import { Marker } from "../models";
export class Location {
  lat: number = null;
  lng: number = null;
  viewport?: Object = false;
  zoom: number;
  address_level_1?:string;
  address_level_2?: string;
  address_country?: string;
  address_zip?: string;
  address_state?: string;
  address?: string;
  marker?: Marker;
}
