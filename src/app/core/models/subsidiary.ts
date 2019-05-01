import {Business, Departments} from "../models";
export class Subsidiary {
    id: number;
    codigoSucursal: string = ' ';
    nombre: string;
    descripcion: string;
    direccion: string;
    telefono: string;
    fax: string;
    telefonoMovil: string;
    email: string;
    observacion: string;
    latitud: number;
    longitud: number;
    activo: string;
    departamentos: Array<Departments> = [];
    empresa: Business;
}
