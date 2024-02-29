import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog,
   MatDialogConfig, MatSort, PageEvent, Sort} from '@angular/material';
import { People, Message } from '../../../core/models';
import { ApiService } from '../../../core/services';
import {merge, fromEvent, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap, filter} from 'rxjs/operators';
import { DeleteDialogComponent } from '../../../shared';
import { FormGroup,FormControl, FormBuilder} from '@angular/forms';
import { PdfMakeWrapper, Table, Txt, Cell } from 'pdfmake-wrapper';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.scss']
})
export class ListClientComponent implements AfterViewInit {
  public isMobile: Boolean;
  public filterForm: FormGroup;
  public rulesColumns  = ['persona.documento', 'persona.ruc', 'persona.primerNombre', 'persona.segundoNombre', 'persona.primerApellido'];
  public displayedColumns = ['persona.tipoPersona','persona.documento', 'persona.ruc', 'persona.primerNombre' , 'persona.email', 'sucursal.nombre', 'opciones'];
  public dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filterInput: ElementRef;
  @ViewChild("filterButton", { read: ElementRef, static: true}) filterButton: ElementRef;

  // Advance Filter panel
  advanceFilterOpenState: boolean = false;
  filterValue = '';
  isfilter = false;
  groupOp = "OR";
  // MatPaginator Inputs
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 25, 100, 200, 500];
  // MatPaginator Output
  pageEvent: PageEvent;

  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private apiService: ApiService) {
      this.initFormBuilder();
    }

  ngAfterViewInit() {
    //Filtros Eventos
    
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    const filterInp = fromEvent(this.filterInput.nativeElement, 'keyup').pipe(
      map((e: KeyboardEvent) => {
        return e.code;
      }),
      filter(val => {
        this.groupOp = "OR";
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
          this.groupOp = "AND";
          this.filterValue = JSON.stringify(this.filterForm.value);
          this.advanceFilterOpenState = false
          return true;
        }));

        merge(this.sort.sortChange, this.paginator.page, filterInp, filterButton)
          .pipe(
            startWith({}),
            switchMap((event: any) => {
              return this.apiService.getList('/clientes', this.filterValue, this.rulesColumns,
              this.sort, this.paginator, false, this.groupOp);
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
      id: null,
      sucursal: [null],     
      persona: this.formBuilder.group({
        documento: null,
        ruc: null,
        tipoPersona: [null],
        profesion: null
      })
    });
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
          this.apiService.delete('/clientes/' + data.id)
          .subscribe(res => {
              if(res.status == 200){
                this.paginator._changePageSize(this.paginator.pageSize);
              }
          });
        }
      })
    }
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

  generarReporte(){
    // Crea un nuevo PdfMakeWrapper
    const pdf = new PdfMakeWrapper();
    // Configura las opciones de paginado
    pdf.pageSize('LEGAL');
    pdf.pageOrientation('landscape');
    pdf.pageMargins([ 10, 60, 10, 60 ]);
    pdf.header(new Txt('Clientes').alignment('center').bold().end); // Puedes personalizar el encabezado de la página 

    const body = new Array;
    const header = new Array;
    header.push(new Txt('TIPO PERSONA').alignment('center').bold().end);
    header.push(new Txt('DOCUMENTO').alignment('center').bold().end);
    header.push(new Txt('RUC').alignment('center').bold().end);
    header.push(new Txt('NOMBRE').alignment('center').bold().end);
    header.push(new Txt('SEXO').alignment('center').bold().end);
    header.push(new Txt('PROFESION').alignment('center').bold().end);
    header.push(new Txt('EMAIL').alignment('center').bold().end);
    header.push(new Txt('TELEFONO').alignment('center').bold().end);
    header.push(new Txt('FECHA NACIMIENTO').alignment('center').bold().end);
    header.push(new Txt('DIRECCION').alignment('center').bold().end);

    body.push(header);

    this.apiService.getList('/clientes', this.filterValue, this.rulesColumns,
              this.sort, this.paginator, false, this.groupOp)
              .subscribe(data => {
                
                  // Si hay 10 o menos elementos, se genera un único reporte sin paginación
                data.rows.forEach(row => {
                  const data = new Array;
                  data.push(row.persona.tipoPersona);
                  data.push(row.persona.documento);
                  data.push(row.persona.ruc);
                  data.push(row.persona.primerNombre + ' ' +
                      (row.persona.segundoNombre == null ? '' : row.persona.segundoNombre)+ ', ' +
                      (row.persona.primerApellido == null ? '' : row.persona.primerApellido));
                  data.push(row.persona.sexo);
                  data.push(row.persona['profesion.nombre']);
                  data.push(row.persona.email);
                  data.push(row.persona.telefonoParticular);
                  data.push(this.formatearFecha(new Date(row.persona.fechaNacimiento)));
                  data.push(row.persona.direccionParticular);

                  body.push(data);
                });
                pdf.add(
                  new Table(body).widths([ 80, 80, 80, '*', 70, 80, 80, 90, 75, '*' ]).end
                );

                pdf.footer(
                  (currentPage, pageCount) => {
                    return new Txt('Pagina ' + currentPage.toString() + ' de ' + pageCount + ' ').alignment('right').end;
                  }
                ); 

                pdf.create().download("cliente.pdf");
              });
  }

  formatearFecha(fecha: Date): string {
    // Obtenemos el día, mes y año
    const dia = fecha.getDate().toString().padStart(2, '0'); // Aseguramos que tenga dos dígitos y lo rellenamos con ceros si es necesario
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Los meses van de 0 a 11, por eso sumamos 1
    const año = fecha.getFullYear();

    // Concatenamos en el formato "dd/mm/aaaa"
    return `${dia}/${mes}/${año}`;
}

}
