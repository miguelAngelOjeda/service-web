import {Authorities} from "../models";
export class UserSession {
    id: number;
    idEmpresa: number;
    idSusursal: number;
    nombre: string;
    apellido: string;
    username: string;
    imagePath: string;
    email: string;
    rol: string;
    authorities: Authorities[];
}
