import {Rol, People, Subsidiary} from "../models";
export class Users {
    id: number;
    alias: string;
    persona: People;
    rol: Rol;
    sucursal: Subsidiary;
}
