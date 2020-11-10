import { AfterViewInit, Component, Input, OnInit, Output, ViewChild, EventEmitter  } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { MatDialog, MatSort } from '@angular/material';
import { ApiService } from 'src/app/core';
import { EgressCredit } from 'src/app/core/models/egressCredit';

@Component({
  selector: 'app-abm-egress-credit',
  templateUrl: './abm-egress-credit.component.html',
  styleUrls: ['./abm-egress-credit.component.scss']
})
export class AbmEgressCreditComponent implements AfterViewInit {

  egressCreditList : EgressCredit[];
  egressCreditList2 : EgressCredit[];
  egressCreditListDelete : EgressCredit[];
  totalEgressCredit : number;
  totalEgressCredit2 : number;
  promedioEgress: number;
  idPersona: string;
  idSolicitudCredito: number;
  output: JSON;

  peopleForm: FormGroup;
  detalles : FormArray;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @Output() propagar = new EventEmitter<number>();

  constructor(
    private parentF: FormGroupDirective,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    public dialog: MatDialog

  ) { }

  ngOnInit() {
    this.egressCreditList = new Array();
    this.egressCreditList2 = new Array();
    this.egressCreditListDelete = new Array();
    this.peopleForm = this.parentF.form; // form padre
    this.detalles = (<FormArray>this.peopleForm.get('detalles')); //obtiene el campo detalle propuestaSolicitud
    this.idSolicitudCredito = this.peopleForm.get('propuestaSolicitud').value.id;
    //console.log('id sol = ' + this.idSolicitudCredito);
    if(this.detalles){
      for (let detalle of this.detalles.controls) {
        //total egreso credito
        this.totalEgressCredit = 0;
        this.totalEgressCredit2 = 0;
        this.promedioEgress = 0;
        
        
        if(detalle.get('persona') != null){
          this.idPersona = detalle.get('persona').value.id;
          this.egressCreditList = detalle.get('persona').value.egresoCreditos;
          var count = 0;

          if(this.egressCreditList != null){
            this.egressCreditList.forEach( (egc) => {
            
              if(egc.egresoCreditoBand == 'S'){
                this.totalEgressCredit = this.totalEgressCredit + egc.monto;
                this.promedioEgress = this.promedioEgress + Number(egc.promedioAtraso);
                count = count + 1;
              } else {
                this.totalEgressCredit2 = this.totalEgressCredit2 + egc.monto;
              }
              
            });
          } 
          
        }
        

        this.propagar.emit(this.totalEgressCredit + this.totalEgressCredit2);
        
        //CALCULO PROMEDIO
        this.promedioEgress = this.promedioEgress / count;
        
      }
    }

  }

  ngAfterViewInit() {
    
  }


  addRowEgressCredit(egresoCredito:string){
    //console.log(egresoCredito);
    var object = new EgressCredit();
    object.egresoCreditoBand = egresoCredito;
    this.egressCreditList.push(object);
    
  }

  deleteRowEgressCredit( egc : EgressCredit){
    if(egc.id != null){
      this.egressCreditListDelete.push(egc); // se add todos los egresos que deban eliminarse
    }
    const index = this.egressCreditList.indexOf(egc, 0);
    if (index > -1) {
      this.egressCreditList.splice(index, 1);
      this.calcularTotalEC();
      this.calcularPromedioEC();
    }
    
  }

  calcularTotalEC(){
    
    var total = 0;
    var total2 = 0;
    this.egressCreditList.forEach(function (value) {
      if(value.egresoCreditoBand == 'S'){
        total = total + Number(value.monto);
      }else{
        total2 = total2 + Number(value.monto);
      }
      
    }); 
    
    this.totalEgressCredit = total;
    this.totalEgressCredit2 = total2;
    this.propagar.emit(this.totalEgressCredit + this.totalEgressCredit2);
  }

  calcularPromedioEC(){
    var total = 0;
    var count = 0;
    this.egressCreditList.forEach(function (value) {
      if(value.egresoCreditoBand == 'S'){
        total = total + Number(value.promedioAtraso);
        count = count + 1;
      }
      
    });
    this.promedioEgress = total / count;
  }

  guardarEgresosCreditos(){
    
    const jsonOutPut:JSON = <JSON><unknown>{
      "idPersona": this.idPersona,
      "egresosCreditos": this.egressCreditList,
      "egresosCreditosDel": this.egressCreditListDelete,
      "idSolicitudCredito": this.idSolicitudCredito
    }

    this.apiService.post('/egresosCreditos', jsonOutPut)
      .subscribe(res => {
        if(res.status == 200){
          console.log('Respuesta exitosa - Server Api');
        }
      });

  }

  onSubmit() {
  }

}
