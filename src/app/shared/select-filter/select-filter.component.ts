import { Component, OnInit, ViewChild, EventEmitter, Output, Input, ElementRef  } from '@angular/core';
import {merge, fromEvent,ReplaySubject, Subject, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap, filter, take, takeUntil} from 'rxjs/operators';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { ApiService, FormsService} from '../../core/services';
import { Rules, Filter } from '../../core/models';
import { AbstractControl } from '@angular/forms';

export function RequireMatch(control: AbstractControl) {
    const selection: any = control.value;
    if (typeof selection === 'string') {
        return { incorrect: true };
    }
    return null;
}

@Component({
  selector: 'app-select-filter',
  templateUrl: './select-filter.component.html',
  styleUrls: ['./select-filter.component.scss']
})
export class SelectFilterComponent implements OnInit {
  modelControl = new FormControl('', [Validators.required, RequireMatch]);
  @Output() value = new EventEmitter<any>();

  protected models: Array<any> = [];
  @ViewChild('filterInputModel') filterInputModel: ElementRef;
  @Input() model;
  @Input() placeholder;
  @Input() urlFilter;
  @Input() columnsFilter: any[];
  //Filter
  isfilter = false;
  view = 'nombre';
  constructor(
    private apiService: ApiService,
    private fb: FormBuilder
    ) { }

  ngOnInit() {
    this.filter();
  }


  protected filter() {
    merge(fromEvent(this.filterInputModel.nativeElement, 'keyup'))
        .pipe(
          startWith({}),
          switchMap(() => {
            this.isfilter = false;
            if(this.filterInputModel.nativeElement.value.length  > 0){
              this.isfilter = true;
            }
            return this.apiService.getPageList('/' + this.urlFilter,this.isfilter,this.filterInputModel.nativeElement.value, this.columnsFilter, 'desc', 'nombre',
            0,50);
          }),
          map(data => {
            return data.rows as any [];
          }),
          catchError(() => {
            return observableOf([]);
          })
        ).subscribe(data => this.models = data);
  }

  displayFn(data?: any): string | undefined {
    return data ? data.nombre : undefined;
  }

  setValue(value:any) {
    this.value.emit(value);
  }

  getErrorMessage() {
    return this.modelControl.hasError('required') ? 'Campo requerido' :
      this.modelControl.hasError('incorrect') ? 'Seleccione registro correcto' :
        '';
  }

}
