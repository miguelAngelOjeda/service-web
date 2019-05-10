import {Role, People, Subsidiary, Business} from "./index";
export class Users {
    id: number;
    alias: string;
    claveAcceso: string;
    persona: People;
    rol: Role;
    sucursal: Subsidiary;
    empresa: Business;

    constructor() {
      this.persona = new People;
      this.rol = new Role;
      this.sucursal = new Subsidiary;
      this.empresa = new Business;
    }
}
