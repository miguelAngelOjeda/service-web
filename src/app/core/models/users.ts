import {Rol, People, Subsidiary, Business} from "../models";
export class Users {
    id: number;
    alias: string;
    persona: People;
    rol: Rol;
    sucursal: Subsidiary;

    constructor() {
      this.persona = new People;
      this.rol = new Rol;
      this.sucursal = new Subsidiary;
      this.sucursal.empresa = new Business;
    }
}
