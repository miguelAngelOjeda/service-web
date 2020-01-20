import { Component, OnInit, Inject, ViewChild, NgZone, ElementRef  } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog,
   MatDialogConfig, MatSort, PageEvent, Sort} from '@angular/material';
import { HttpParams } from '@angular/common/http';
import { FormGroup, FormArray , FormControl, FormBuilder,
   Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { UserService, ApiService, PeopleService} from '@core/service';
import { ErrorStateMatcher} from '@angular/material/core';
import {SelectionModel} from '@angular/cdk/collections';
import {merge, fromEvent, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap, filter} from 'rxjs/operators';

@Component({
  selector: 'app-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.scss']
})
export class AddRequestComponent implements OnInit {
    public myForm: FormGroup;
    public isMobile: Boolean;
    public rulesColumns  = ['documento'];
    public displayedColumns = ['select','documento', 'email', 'sucursal.nombre', 'opciones'];
    public dataSource = new MatTableDataSource<any>();
    public selection = new SelectionModel<any>(true, []);

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild('filter', { static: true }) filterInput: ElementRef;

    // MatPaginator Inputs
    isfilter = false;
    length = 0;
    pageSize = 10;
    pageSizeOptions: number[] = [10, 25, 100];
    // MatPaginator Output
    pageEvent: PageEvent;

    constructor(
      private formBuilder: FormBuilder,
      private peopleService: PeopleService,
      private apiService: ApiService
    ) {}

    ngOnInit() {
      this.initFormBuilder();
      this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
      this.sort.active = 'id';
      this.sort.direction = 'desc';
      this.paginator.pageSize = this.pageSizeOptions[0];
      merge(this.sort.sortChange, this.paginator.page, fromEvent(this.filterInput.nativeElement, 'keyup'))
          .pipe(
            startWith({}),
            switchMap(() => {
              this.isfilter = false;
              if(this.filterInput.nativeElement.value.length > 3){
                this.isfilter = true;
              }
              return this.apiService.getPageList('/registros_email',this.isfilter,this.filterInput.nativeElement.value, this.rulesColumns,
              this.sort.direction,this.sort.active,this.paginator.pageIndex,this.paginator.pageSize);
            }),
            map(data => {
              // Flip flag to show that loading has finished.
              this.length = data.records;
              return data.rows ;
            }),
            catchError(() => {
              return observableOf([]);
            })
          ).subscribe(data => this.dataSource.data = data);
    }

    onSubmit() {
      this.apiService.post('/registros_email', this.myForm.value)
      .subscribe(res => {
        if(res.status == 200){
          this.myForm.controls['documento'].setValue(null);
          this.myForm.controls['email'].setValue(null);
          this.paginator._changePageSize(this.paginator.pageSize);
        }
      });
    }

    send() {
      this.myForm.controls['registros'].setValue(this.selection.selected);

      this.apiService.put('/registros_email/enviar-email', this.myForm.value)
      .subscribe(res => {
        console.log(res);
          //this.snackBarService.openSnackBar('res');
      });

    }

    edit(row?: any) {
      this.myForm.patchValue(row);
      console.log(this.selection);
    }
    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
      this.isAllSelected() ?
          this.selection.clear() :
          this.dataSource.data.forEach(row => this.selection.select(row));
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: any): string {
      if (!row) {
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
    }

    protected initFormBuilder() {
      this.myForm = this.formBuilder.group({
        id: null ,
        documento: [null, Validators.required],
        email: [null, Validators.required],
        registros: null,
        activo: 'S'
      });
    }
  }
