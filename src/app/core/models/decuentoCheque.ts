export class DescuentoChequeModel {
    id: number;
    cedula: string;
    nombre: string;
    tipoDocumento: string;
    fechaEmision: Date;
    fechaPago: Date;
    dias: number;
    moneda: string;
    valorDocumento: string;
    interes: string;
    gastosAdministrativos: string;
    capitalDescontado: string;

    constructor(){
        this.id = null;
        this.cedula = null;
        this.nombre = null;
        this.tipoDocumento = null;
        this.fechaEmision= null;
        this.fechaPago = null;
        this.dias = 0;
        this.moneda = null;
        this.valorDocumento = null;
        this.interes = '0';
        this.gastosAdministrativos = '0';
        this.capitalDescontado = '0';
    }
}