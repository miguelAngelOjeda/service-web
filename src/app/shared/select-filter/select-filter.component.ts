import { Component, OnInit, ViewChild, EventEmitter, Output, Input, ElementRef, AfterViewInit  } from '@angular/core';
import {merge, fromEvent,ReplaySubject, Subject, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap, filter, take, takeUntil, delay} from 'rxjs/operators';
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
export class SelectFilterComponent implements AfterViewInit, OnInit {
  modelControl = new FormControl('', [Validators.required, RequireMatch]);
  @Output() value = new EventEmitter<any>();
  public models: Array<any> = [];
  public idModel: any;
  public sortActiveModel = "nombre";
  public optionName = "option.nombre";
  public inputType = "legacy";
  //public sortDirectionModel = "desc";

  @ViewChild('filterInputModel', { static: true }) filterInputModel: ElementRef;
  @Input() set disabled (condition : boolean){
    if(condition){
      this.modelControl.disable();
    }else{
      this.modelControl.enable();
    }
  }
  @Input() set appearance (appearance : any){
    this.inputType = appearance;
  }
  @Input() set sortActive (sortActive : any){
    console.log(sortActive);
    if(sortActive){
      this.sortActiveModel = sortActive;
    }
  }
  @Input() sortDirection : string = "desc";
  @Input() model;
  @Input() placeholder;
  @Input() urlFilter;
  @Input() columnsFilter: any[];
  @Input()
  set fkFilterModel(model: any) {
    if(model){
      this.idModel = model.id;
      this.modelControl.setValue(null);
      this.modelControl.enable();
      this.filter();
    }
  }

  @Input()
  set required(model: any) {
    if(!model){
      this.modelControl.setValidators([]); // or clearValidators()
      this.modelControl.updateValueAndValidity();
    }
  }

  @Input()
  set modelValue(model: any) {
    if(model != null){
      this.modelControl.setValue(model);
    }
  }

  //Filter
  isfilter = false;
  view = 'nombre';
  constructor(
    private apiService: ApiService,
    private fb: FormBuilder
    ) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
      this.filter();
  }

  protected filter() {
    setTimeout(() => {
      merge(fromEvent(this.filterInputModel.nativeElement, 'keyup').pipe(
              map((e: KeyboardEvent) => {
                return e.code;
              }),
              filter(value => {
                return (!value.includes('Arrow') && !value.includes('Enter'));
              }))
          )
          .pipe(
            startWith({}),
            //delay(0),
            switchMap(() => {
              if(this.modelControl.status !== 'DISABLED'){
                //Inicializar el valor
                this.isfilter = false;
                if(this.filterInputModel.nativeElement.value.length  > 0){
                  this.isfilter = true;
                }

                return this.apiService.getPageList('/' + this.urlFilter,this.isfilter,this.filterInputModel.nativeElement.value,
                 this.columnsFilter, this.sortDirection, this.sortActiveModel,0,50, false,this.idModel);

              }else{
                return null;
              }
            }),
            map(data => {
              if(data && data.status == 200){
                return data.rows as any [];
              }else{
                return [];
              }
            }),
            catchError(() => {
              return observableOf([]);
            })
          ).subscribe(data => this.models = data);
    });

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
