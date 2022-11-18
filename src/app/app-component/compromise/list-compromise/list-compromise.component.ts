import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog,
   MatDialogConfig, MatSort, PageEvent, Sort} from '@angular/material';
import { People, Message } from '../../../core/models';
import { ApiService, UserService } from '../../../core/services';
import {merge, fromEvent, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap, filter} from 'rxjs/operators';
import { DeleteDialogComponent } from '../../../shared';
import { FormGroup,FormControl, FormBuilder} from '@angular/forms';
import * as moment from 'moment';
import * as $ from 'jquery';
import { Canvas, Columns, Img, Line, Ol, PdfMakeWrapper, Stack, Table, Txt, Ul } from 'pdfmake-wrapper';


@Component({
  selector: 'app-list-compromise',
  templateUrl: './list-compromise.component.html',
  styleUrls: ['./list-compromise.component.scss']
})
export class ListCompromiseComponent implements OnInit {
  public isMobile: Boolean;
  public filterForm: FormGroup;
  public rulesColumns  = ['nroCredito'];
  public displayedColumns = ['persona.primerNombre','nroCredito','cuotas', 'monto', 'fechaPago', 'opciones'];
  public dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filterInput: ElementRef;
  @ViewChild("filterButton", { read: ElementRef, static: true}) filterButton: ElementRef;

  //Filter
  isfilter = false;
  // Advance Filter panel
  advanceFilterOpenState: boolean = false;
  filterValue = '';
  // MatPaginator Inputs
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 25, 100];
  // MatPaginator Output
  pageEvent: PageEvent;

  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private userService: UserService) {}

  ngOnInit() {
    this.initFormBuilder();
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.sort.active = 'id';
    this.sort.direction = 'desc';
    this.paginator.pageSize = this.pageSizeOptions[0];
    this.filters();
  }

  filters() {
    //Filtros Eventos
    let groupOp = "OR";

    const filterInp = fromEvent(this.filterInput.nativeElement, 'keyup').pipe(
            map((e: KeyboardEvent) => {
              return e.code;
            }),
            filter(val => {
              groupOp = "OR";
              this.filterValue = this.filterInput.nativeElement.value;
              return (!val.includes('Arrow') && !val.includes('Enter') && val.length > 3);
            }));

    const filterButton = fromEvent(this.filterButton.nativeElement, 'click').pipe(
            map((e: MouseEvent) => {
              return {
                x: e.clientX,
                y: e.clientY
              };
            }),
            filter(val => {
              groupOp = "AND";
              this.filterValue = JSON.stringify(this.filterForm.value);
              this.advanceFilterOpenState = false
              return true;
            }));

    merge(this.sort.sortChange, this.paginator.page, filterInp, filterButton)
        .pipe(
          startWith({}),
          switchMap((event: any) => {
            return this.apiService.getList('/compromisos', this.filterValue, this.rulesColumns,
            this.sort, this.paginator, false, groupOp);
          }),
          map(data => {
            // Flip flag to show that loading has finished.
            this.length = data.records;
            return data.rows;
          }),
          catchError(() => {
            return observableOf([]);
          })
        ).subscribe(data => this.dataSource.data = data);
  }

  public initFormBuilder(){
    this.filterForm = this.formBuilder.group({
      fechaInicio: null,
      fechaFin: null,
      id: null,
      persona: this.formBuilder.group({
        documento: null,
        ruc: null
      })
    });
  }

  print(){
    //datos de fecha
    let fechaActual = moment(Date.now());

    //usuario
    var usuario;
    this.userService.getUser().subscribe((data) => {
      usuario = data;
    });
    console.log(this.dataSource.data);
    //array de cuotas
    const arrayCuotas = this.dataSource.data;

    const pdf = new PdfMakeWrapper();
    pdf.pageSize('LEGAL');
    pdf.pageOrientation('landscape');
    pdf.pageMargins([40, 120, 40, 101]);
    pdf.info({
      title: 'Compromisos Pagos',
      author: 'service web',
      subject: 'Compromisos Pagos',

    });

    pdf.header(new Stack([
      new Txt('FINANCORP - COMPROMISOS DE PAGOS').alignment('center').bold().end,
      new Columns([ new Txt('Usuario: ' + usuario.username).alignment('center').bold().end, new Txt('Fecha: ' + fechaActual.format('DD/MM/YYYY')).alignment('center').bold().end, new Txt('Hora: ' + fechaActual.format('hh:mm:ss A')).alignment('center').bold().end ]).end,
      new Canvas([new Line(10, [400, 10]).end]).alignment('center').end
    ]).end);

    pdf.footer(
      (currentPage, pageCount) => {
        return new Txt('Pagina ' + currentPage.toString() + ' de ' + pageCount + ' ').alignment('right').end;
      }
    );

    //let tasaAnual = (this.myForm.get('tasaAnual').value == null || this.myForm.get('tasaAnual').value == '') ? this.myForm.get('modalidad').value.interes : this.myForm.get('tasaAnual').value;


    var filas = new Array();
    filas.push(['CLIENTE', 'NRO. DOCUMENTO', 'RUC', 'NRO. TELEFONO', 'NRO. CREDITO', 'CUOTAS', 'MONTO', 'FECHA PAGO']);
    arrayCuotas.forEach(element => filas.push([(element['cliente.persona.primerNombre'] == null ? '' : element['cliente.persona.primerNombre']) +' ' +(element['cliente.persona.segundoNombre'] == null ? '' : element['cliente.persona.segundoNombre'])
  +', ' +(element['cliente.persona.primerApellido'] == null ? '' : element['cliente.persona.primerApellido']) + ' ' +(element['cliente.persona.segundoApellido'] == null ? '' : element['cliente.persona.segundoApellido']),
      (element['cliente.persona.documento'] == null ? '' : element['cliente.persona.documento']),
      (element['cliente.persona.ruc'] == null ? '' : element['cliente.persona.ruc']),
      (element['cliente.persona.telefonoParticular'] == null ? '' : element['cliente.persona.telefonoParticular']),
      element.nroCredito,
      new Intl.NumberFormat().format(Number(element.cuotas)),
      new Intl.NumberFormat().format(Number(element.monto)),
      this.convert(element.fechaPago)]));

    //calcula total interes
    var totalInteres = 0;
    arrayCuotas.forEach(element => totalInteres = totalInteres + Number(10));

    pdf.add(
      pdf.ln(2)
    );
    pdf.add(new Txt('COMPROMISOS').alignment('center').bold().end);
    pdf.add(
      new Table(filas).end
    );
    pdf.add(new Canvas([new Line(10, [400, 10]).end]).alignment('center').end);
    pdf.add(
      pdf.ln(2)
    );

    pdf.create().download();
  }

  delete(data: any){
    if(data.id){
      const message = new Message;
      message.titulo = "Eliminar Registro"
      message.texto = "Esta seguro que desea eliminar el registro!! ";

      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = message;

      let dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.apiService.delete('/compromisos/' + data.id)
          .subscribe(res => {
              if(res.status == 200){
                this.paginator._changePageSize(this.paginator.pageSize);
              }
          });
        }
      })
    }
  }

  convert(str) {
    var date = new Date(str);
    var  mnth = ("0" + (date.getMonth() + 1)).slice(-2);
    var  day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  getValue(data: any, form : any): void {
    (<FormControl>this.filterForm.get(form)).setValue(data);
  }

  toggleAdvanceFilter() {
    this.advanceFilterOpenState = !this.advanceFilterOpenState
  }

  closeFilterAdvance() {
    this.advanceFilterOpenState = false
    //Inicializar valores del filtro
    this.filterValue = '';
    this.filterForm.reset({});
    this.paginator._changePageSize(this.paginator.pageSize);
  }

}
