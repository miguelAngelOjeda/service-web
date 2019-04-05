import {Enterprise} from "../models";
export class Subsidiary {
    id: number;
    codigoSucursal: string;
    nombre: string;
    descripcion: string;
    direccion: string;
    telefono: string;
    fax: string;
    telefonoMovil: string;
    email: string;
    observacion: string;
    activo: string;
    empresa: Enterprise;
}
