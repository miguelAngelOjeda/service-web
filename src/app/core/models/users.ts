import {Role, People} from "../models";
export class Users {
    id: number;
    alias: string;
    claveAcceso: string;
    persona: People = new People;
    rol: Role = new Role;
}
