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
  egressCreditListDelete : EgressCredit[];
  totalEgressCredit : number;
  promedioEgress: number;
  idPersona: string;
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
    this.egressCreditListDelete = new Array();
    this.peopleForm = this.parentF.form; // form padre
    this.detalles = (<FormArray>this.peopleForm.get('detalles')); //obtiene el campo detalle
    if(this.detalles){
      for (let detalle of this.detalles.controls) {
        //total egreso credito
        this.totalEgressCredit = 0;
        this.promedioEgress = 0;
        this.idPersona = detalle.get('persona').value.id;
        this.egressCreditList = detalle.get('persona').value.egresoCreditos;
        this.egressCreditList.forEach( (egc) => {
          this.totalEgressCredit = this.totalEgressCredit + egc.monto;
          this.promedioEgress = this.promedioEgress + Number(egc.promedioAtraso);
        });

        
        this.propagar.emit(this.totalEgressCredit);
        
        //CALCULO PROMEDIO
        this.promedioEgress = this.promedioEgress / this.egressCreditList.length;
        
      }
    }

  }

  ngAfterViewInit() {
    
  }


  addRowEgressCredit(){
    this.egressCreditList.push(new EgressCredit());
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
    this.egressCreditList.forEach(function (value) {
      total = total + Number(value.monto);
    }); 
    this.totalEgressCredit = total;
    this.propagar.emit(this.totalEgressCredit);
  }

  calcularPromedioEC(){
    var total = 0;
    this.egressCreditList.forEach(function (value) {
      total = total + Number(value.promedioAtraso);
    });
    this.promedioEgress = total / this.egressCreditList.length;
  }

  guardarEgresosCreditos(){
    const jsonOutPut:JSON = <JSON><unknown>{
      "idPersona": this.idPersona,
      "egresosCreditos": this.egressCreditList,
      "egresosCreditosDel": this.egressCreditListDelete
    }

    this.apiService.post('/egresosCreditos', jsonOutPut)
      .subscribe(res => {
        if(res.status == 200){
          console.log('Respuesta exitosa - Server Api');
        }
      });

    //console.log(jsonOutPut);
  }

}
