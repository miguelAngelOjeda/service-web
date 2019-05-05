import {Business, Departments} from "../models";
export class Subsidiary {
    id: number = null;
    codigoSucursal: string = ' ';
    nombre: string = null;
    descripcion: string = null;
    direccion: string = null;
    telefono: string = null;
    fax: string = null;
    telefonoMovil: string = null;
    email: string = null;
    observacion: string = null;
    latitud: number = null;
    longitud: number = null;
    activo: string = null;
    departamentos: Array<Departments> = [];
    empresa: Business;
    constructor() {
      this.empresa = new Business;
    }
}
