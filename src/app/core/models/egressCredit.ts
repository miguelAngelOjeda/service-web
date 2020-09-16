export class EgressCredit {
    id: number;
    nombreFinanciera: string;
    cuota: string;
    promedioAtraso: string;
    maximoAtraso: string;
    observacion: string;
    monto: number;

    constructor(){
        this.id = null;
        this.nombreFinanciera = "";
        this.cuota = "";
        this.promedioAtraso = "";
        this.maximoAtraso = "";
        this.observacion = "";
        this.monto = 0;
    }
}