import {Rol, People, Subsidiary, Business} from "./index";
export class Users {
    id: number;
    alias: string;
    persona: People;
    rol: Rol;
    sucursal: Subsidiary;
    empresa: Business;

    constructor() {
      this.persona = new People;
      this.rol = new Rol;
      this.sucursal = new Subsidiary;
      this.empresa = new Business;
    }
}
