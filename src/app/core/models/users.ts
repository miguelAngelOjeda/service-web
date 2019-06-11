import {Role, People, Departments, Subsidiary} from "../models";
export class Users {
    id: number;
    alias: string;
    claveAcceso: string;
    persona: People = new People;
    sucursal: Subsidiary = new Subsidiary;
    rol: Role = new Role;
    departamentos: Array<Departments> = [];
}
