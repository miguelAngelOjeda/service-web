import {Authorities} from "../models";
export class Role {
    id: number = null;
    nombre: string = null;
    authorities: Array<Authorities> = [];
}
